/**
 * Static data loading utilities
 * Loads static knesset term data from JSON files.
 * Member data is API-only (fetched via src/lib/api/).
 */

import fs from 'fs';
import path from 'path';

const STATIC_KNESSETS_DIR = path.join(process.cwd(), 'src', 'data', 'static', 'knessets');

/**
 * Static knesset term data structure
 */
export interface StaticKnessetData {
  knessetNum: number;
  startDate: string | null;
  finishDate: string | null;
  members: Array<{
    /** The member's mk_individual_id (not the Knesset PersonID) */
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
 * Check if knesset has static data
 */
export function hasStaticKnessetData(knessetNum: number): boolean {
  const filePath = path.join(STATIC_KNESSETS_DIR, `knesset_${knessetNum}.json`);
  return fs.existsSync(filePath);
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



