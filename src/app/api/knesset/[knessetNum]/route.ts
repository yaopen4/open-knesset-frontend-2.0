import { NextRequest, NextResponse } from 'next/server';
import { loadStaticKnesset } from '@/lib/data/static-loader';
import { fetchUnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import fs from 'fs';
import path from 'path';
import { StaticKnessetData } from '@/lib/data/static-loader';
import type { MembersDataFile } from '@/lib/data/members-data-types';

/**
 * Extract the mk_individual_id from an oknesset.org profile URL
 * (e.g. "https://oknesset.org/members/214.html" -> 214).
 */
function parseMkIndividualId(profileUrl: string | undefined): number | null {
  const match = profileUrl?.match(/members\/(\d+)\.html$/);
  return match ? parseInt(match[1], 10) : null;
}

function transformMembersData(data: MembersDataFile): StaticKnessetData {
  // Transform members_data format to StaticKnessetData format
  const members: StaticKnessetData['members'] = [];
  
  data.parties.forEach((party) => {
    party.members.forEach((member) => {
      // Parse name (format: "LastName FirstName")
      const nameParts = member.name.split(' ');
      const lastName = nameParts[0] || '';
      const firstName = nameParts.slice(1).join(' ') || '';
      
      // Never fabricate an ID: skip members without a real mk_individual_id
      const personId = parseMkIndividualId(member.additional_info?.profile_url);
      if (personId === null) {
        console.warn(`Skipping member without mk_individual_id: ${member.name}`);
        return;
      }

      members.push({
        personId,
        name: {
          firstName,
          lastName,
        },
        image: member.image_url || null,
        factionName: party.party_name || null,
        positions: [], // No position data in members_data format
      });
    });
  });
  
  return {
    knessetNum: data.knesset_number,
    startDate: null,
    finishDate: null,
    members,
    totalMembers: members.length,
    totalParties: data.parties.length,
    lastUpdated: new Date().toISOString(),
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: { knessetNum: string } }
) {
  try {
    const knessetNum = parseInt(params.knessetNum, 10);
    
    if (isNaN(knessetNum) || knessetNum < 1) {
      return NextResponse.json(
        { error: 'Invalid Knesset number' },
        { status: 400 }
      );
    }

    const currentKnesset = getCurrentKnessetNum();
    
    // Try members_data folder first
    const membersDataDir = path.join(process.cwd(), 'src', 'app', 'knesset-data', '[knesset_number]', 'members_data');
    const membersDataPath = path.join(membersDataDir, `knesset_${knessetNum}.json`);
    
    try {
      const membersDataContent = await fs.promises.readFile(membersDataPath, 'utf-8');
      const membersData = JSON.parse(membersDataContent) as MembersDataFile;
      const transformedData = transformMembersData(membersData);
      return NextResponse.json(transformedData);
    } catch (membersDataError) {
      // Fallback to static loader
    }
    
    // Try static loader for historical Knessets
    if (knessetNum < currentKnesset) {
      const staticData = loadStaticKnesset(knessetNum);
      if (staticData) {
        return NextResponse.json(staticData);
      }
    }
    
    // Fallback to API fetch for current Knesset
    if (knessetNum === currentKnesset) {
      const unifiedData = await fetchUnifiedKnessetData(knessetNum);
      if (unifiedData) {
        return NextResponse.json({
          knessetNum: unifiedData.knessetNum,
          startDate: unifiedData.startDate,
          finishDate: unifiedData.finishDate,
          members: unifiedData.members,
          totalMembers: unifiedData.totalMembers,
          totalParties: unifiedData.totalParties,
          lastUpdated: unifiedData.lastUpdated,
        });
      }
    }
    
    return NextResponse.json(
      { error: 'Knesset data not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('Error fetching Knesset data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

