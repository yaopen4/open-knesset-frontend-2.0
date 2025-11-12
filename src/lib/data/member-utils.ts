/**
 * Member data utilities and transformation functions
 */

import type { Person, PersonToPosition } from '../api/types';

/**
 * Get full name from Person object
 */
export function getFullName(person: Person): string {
  return `${person.FirstName} ${person.LastName}`.trim();
}

/**
 * Get full name in reverse order (Hebrew style: LastName FirstName)
 */
export function getFullNameHebrew(person: Person): string {
  return `${person.LastName} ${person.FirstName}`.trim();
}

/**
 * Get all Knesset terms a member served in
 */
export function getKnessetTerms(positions: PersonToPosition[]): number[] {
  const terms = new Set<number>();
  positions.forEach((position) => {
    if (position.KnessetNum) {
      terms.add(position.KnessetNum);
    }
  });
  return Array.from(terms).sort((a, b) => b - a); // Descending order
}

/**
 * Get positions for a specific Knesset term
 */
export function getPositionsForTerm(
  positions: PersonToPosition[],
  knessetNum: number
): PersonToPosition[] {
  return positions.filter((pos) => pos.KnessetNum === knessetNum);
}

/**
 * Get current positions (active)
 */
export function getCurrentPositions(positions: PersonToPosition[]): PersonToPosition[] {
  return positions.filter((pos) => pos.IsCurrent);
}

/**
 * Get party affiliations for a member
 */
export function getPartyAffiliations(positions: PersonToPosition[]): {
  factionId: number;
  factionName: string;
  knessetNum: number;
  startDate?: string;
  finishDate?: string;
}[] {
  const affiliations: {
    factionId: number;
    factionName: string;
    knessetNum: number;
    startDate?: string;
    finishDate?: string;
  }[] = [];

  positions.forEach((pos) => {
    if (pos.FactionID && pos.FactionName) {
      affiliations.push({
        factionId: pos.FactionID,
        factionName: pos.FactionName,
        knessetNum: pos.KnessetNum,
        startDate: pos.StartDate,
        finishDate: pos.FinishDate,
      });
    }
  });

  // Remove duplicates and sort by KnessetNum
  const unique = affiliations.filter(
    (aff, index, self) =>
      index ===
      self.findIndex(
        (a) =>
          a.factionId === aff.factionId &&
          a.knessetNum === aff.knessetNum &&
          a.startDate === aff.startDate
      )
  );

  return unique.sort((a, b) => b.knessetNum - a.knessetNum);
}

/**
 * Get committee memberships for a member
 */
export function getCommitteeMemberships(positions: PersonToPosition[]): {
  committeeId: number;
  committeeName: string;
  knessetNum: number;
  startDate?: string;
  finishDate?: string;
}[] {
  const memberships: {
    committeeId: number;
    committeeName: string;
    knessetNum: number;
    startDate?: string;
    finishDate?: string;
  }[] = [];

  positions.forEach((pos) => {
    if (pos.CommitteeID && pos.CommitteeName) {
      memberships.push({
        committeeId: pos.CommitteeID,
        committeeName: pos.CommitteeName,
        knessetNum: pos.KnessetNum,
        startDate: pos.StartDate,
        finishDate: pos.FinishDate,
      });
    }
  });

  return memberships.sort((a, b) => {
    if (a.knessetNum !== b.knessetNum) {
      return b.knessetNum - a.knessetNum;
    }
    return (a.startDate || '').localeCompare(b.startDate || '');
  });
}

/**
 * Check if member is currently serving
 */
export function isCurrentlyServing(person: Person, positions: PersonToPosition[]): boolean {
  return person.IsCurrent || positions.some((pos) => pos.IsCurrent);
}

/**
 * Get member's service period (earliest start to latest finish)
 */
export function getServicePeriod(positions: PersonToPosition[]): {
  startDate?: string;
  finishDate?: string;
} {
  if (positions.length === 0) {
    return {};
  }

  const dates = positions
    .map((pos) => ({
      start: pos.StartDate ? new Date(pos.StartDate) : null,
      finish: pos.FinishDate ? new Date(pos.FinishDate) : null,
    }))
    .filter((d) => d.start !== null);

  if (dates.length === 0) {
    return {};
  }

  const startDates = dates.map((d) => d.start!).filter(Boolean);
  const finishDates = dates.map((d) => d.finish).filter(Boolean) as Date[];

  const earliestStart = startDates.reduce((earliest, current) =>
    current < earliest ? current : earliest
  );

  const latestFinish =
    finishDates.length > 0
      ? finishDates.reduce((latest, current) => (current > latest ? current : latest))
      : null;

  return {
    startDate: earliestStart.toISOString(),
    finishDate: latestFinish?.toISOString(),
  };
}

