import { NextRequest, NextResponse } from 'next/server';
import { loadStaticKnesset } from '@/lib/data/static-loader';
import { fetchUnifiedKnessetData } from '@/lib/data/knesset-data-fetcher';
import { getCurrentKnessetNum } from '@/lib/data/cache';
import fs from 'fs';
import path from 'path';
import { StaticKnessetData } from '@/lib/data/static-loader';

function transformMembersData(data: any): StaticKnessetData {
  // Transform members_data format to StaticKnessetData format
  const members: StaticKnessetData['members'] = [];
  
  data.parties.forEach((party: any) => {
    party.members.forEach((member: any) => {
      // Parse name (format: "LastName FirstName")
      const nameParts = member.name.split(' ');
      const lastName = nameParts[0] || '';
      const firstName = nameParts.slice(1).join(' ') || '';
      
      // Extract personId from profile_url if available
      let personId = 0;
      if (member.additional_info?.profile_url) {
        const match = member.additional_info.profile_url.match(/\/(\d+)\.html/);
        if (match) {
          personId = parseInt(match[1], 10);
        }
      }
      
      // Generate a stable personId if not found (hash of name)
      if (!personId) {
        const nameHash = member.name.split('').reduce((acc: number, char: string) => {
          return ((acc << 5) - acc) + char.charCodeAt(0);
        }, 0);
        personId = Math.abs(nameHash);
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
      const membersData = JSON.parse(membersDataContent);
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

