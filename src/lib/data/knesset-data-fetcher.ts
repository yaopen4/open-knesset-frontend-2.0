/**
 * Unified knesset term data fetcher
 * Combines static and API data for knesset term pages
 */

import { loadStaticKnesset, hasStaticKnessetData, type StaticKnessetData } from './static-loader';
import { getCurrentKnessetNum } from './cache';

/**
 * Combined knesset term data structure
 */
export interface UnifiedKnessetData {
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
  isCurrent: boolean;
  lastUpdated: string;
}

/**
 * Fetch unified knesset term data (combines static + API)
 * For now, only uses static data. API integration can be added later.
 */
export async function fetchUnifiedKnessetData(knessetNum: number): Promise<UnifiedKnessetData | null> {
  try {
    const currentKnesset = getCurrentKnessetNum();
    const isCurrent = knessetNum === currentKnesset;

    // Try static data first (for both historical and current)
    if (hasStaticKnessetData(knessetNum)) {
      const staticData = loadStaticKnesset(knessetNum);
      if (staticData) {
        return {
          ...staticData,
          isCurrent,
        };
      }
    }

    // For current knesset, API integration can be added here later
    // For now, return null if no static data available
    return null;
  } catch (error) {
    console.error(`Error fetching unified knesset data for ${knessetNum}:`, error);
    return null;
  }
}



