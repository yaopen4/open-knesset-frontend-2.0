/**
 * Static data loading utilities
 * Loads static member and knesset term data from JSON files
 */

import fs from 'fs';
import path from 'path';

const STATIC_MEMBERS_DIR = path.join(process.cwd(), 'src', 'data', 'static', 'members');
const STATIC_KNESSETS_DIR = path.join(process.cwd(), 'src', 'data', 'static', 'knessets');

/**
 * Static member data structure
 */
export interface StaticMemberData {
  personId: number;
  static: {
    name: {
      firstName: string;
      lastName: string;
      altNames: string[];
    };
    contact: {
      email: string | null;
    };
    image: string | null;
    dateOfBirth: string | null;
    historicalTerms: number[];
    pastCommittees: Array<{
      committeeId: number;
      committeeName: string;
      knessetNum: number;
      startDate: string | null;
      finishDate: string | null;
    }>;
    completedVotes: unknown[];
    passedBills: unknown[];
  };
  lastUpdated: string;
  knessets: number[];
}

/**
 * Static knesset term data structure
 */
export interface StaticKnessetData {
  knessetNum: number;
  startDate: string | null;
  finishDate: string | null;
  members: Array<{
    personId: number;
    name: {
      firstName: string;
      lastName: string;
    };
    image: string | null;
    factionName: string | null;
    positions: Array<{
      positionId: number;
      factionId: number | null;
      factionName: string | null;
      committeeId: number | null;
      committeeName: string | null;
      startDate: string | null;
      finishDate: string | null;
    }>;
  }>;
  totalMembers: number;
  totalParties: number;
  lastUpdated: string;
}

/**
 * Load static member data by PersonID
 */
export function loadStaticMember(personId: number): StaticMemberData | null {
  try {
    const filePath = path.join(STATIC_MEMBERS_DIR, `${personId}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as StaticMemberData;
  } catch (error) {
    console.error(`Error loading static member data for ${personId}:`, error);
    return null;
  }
}

/**
 * Load static knesset term data by Knesset number
 */
export function loadStaticKnesset(knessetNum: number): StaticKnessetData | null {
  try {
    const filePath = path.join(STATIC_KNESSETS_DIR, `knesset_${knessetNum}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent) as StaticKnessetData;
  } catch (error) {
    console.error(`Error loading static knesset data for ${knessetNum}:`, error);
    return null;
  }
}

/**
 * Check if member has static data
 */
export function hasStaticMemberData(personId: number): boolean {
  const filePath = path.join(STATIC_MEMBERS_DIR, `${personId}.json`);
  return fs.existsSync(filePath);
}

/**
 * Check if knesset has static data
 */
export function hasStaticKnessetData(knessetNum: number): boolean {
  const filePath = path.join(STATIC_KNESSETS_DIR, `knesset_${knessetNum}.json`);
  return fs.existsSync(filePath);
}

/**
 * Load member index
 */
export function loadMemberIndex(): { totalMembers: number; members: Array<{ personId: number; name: string; knessets: number[] }> } | null {
  try {
    const filePath = path.join(STATIC_MEMBERS_DIR, 'index.json');
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading member index:', error);
    return null;
  }
}

/**
 * Load knesset index
 */
export function loadKnessetIndex(): { totalKnessets: number; knessets: Array<{ knessetNum: number; totalMembers: number; totalParties: number }> } | null {
  try {
    const filePath = path.join(STATIC_KNESSETS_DIR, 'index.json');
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading knesset index:', error);
    return null;
  }
}



