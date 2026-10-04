/**
 * Member data utilities and transformation functions.
 *
 * These operate on the live `Member` shape (see src/lib/api/types.ts), whose
 * nested arrays (factions, committee_positions, faction_chairpersons,
 * govministries) may be empty or contain null entries. Every helper guards
 * against null.
 */

import type {
  Member,
  MemberFaction,
  CommitteePosition,
  Govministry,
} from '../api/types';

/** Drop null entries from one of the member's nested arrays. */
function compact<T>(items: Array<T | null> | undefined): T[] {
  return (items ?? []).filter((item): item is T => item != null);
}

/**
 * Get full name in natural order (FirstName LastName).
 */
export function getFullName(member: Member): string {
  return `${member.mk_individual_first_name} ${member.mk_individual_name}`.trim();
}

/**
 * Get full name in Hebrew display order (LastName FirstName).
 */
export function getFullNameHebrew(member: Member): string {
  return `${member.mk_individual_name} ${member.mk_individual_first_name}`.trim();
}

/**
 * Get all Knesset terms a member served in, across every kind of role.
 */
export function getKnessetTerms(member: Member): number[] {
  const terms = new Set<number>();
  const add = (items: Array<{ knesset: number } | null> | undefined) =>
    compact(items).forEach((item) => {
      if (item.knesset) terms.add(item.knesset);
    });

  add(member.factions);
  add(member.committee_positions);
  add(member.faction_chairpersons);
  add(member.govministries);

  return Array.from(terms).sort((a, b) => b - a); // Descending order
}

/**
 * Party affiliations for a member, newest term first, de-duplicated.
 */
export function getPartyAffiliations(member: Member): {
  factionId: number;
  factionName: string;
  knessetNum: number;
  startDate: string | null;
  finishDate: string | null;
}[] {
  const affiliations = compact<MemberFaction>(member.factions).map((faction) => ({
    factionId: faction.faction_id,
    factionName: faction.faction_name,
    knessetNum: faction.knesset,
    startDate: faction.start_date,
    finishDate: faction.finish_date,
  }));

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
 * Committee memberships for a member, newest term first.
 */
export function getCommitteeMemberships(member: Member): {
  committeeId: number;
  committeeName: string;
  positionName: string;
  knessetNum: number;
  startDate: string | null;
  finishDate: string | null;
}[] {
  const memberships = compact<CommitteePosition>(member.committee_positions).map(
    (pos) => ({
      committeeId: pos.committee_id,
      committeeName: pos.committee_name,
      positionName: pos.position_name,
      knessetNum: pos.knesset,
      startDate: pos.start_date,
      finishDate: pos.finish_date,
    })
  );

  return memberships.sort((a, b) => {
    if (a.knessetNum !== b.knessetNum) {
      return b.knessetNum - a.knessetNum;
    }
    return (a.startDate || '').localeCompare(b.startDate || '');
  });
}

/**
 * Government-ministry roles for a member, newest term first.
 */
export function getGovMinistries(member: Member): {
  govMinistryId: number;
  govMinistryName: string;
  positionName: string;
  knessetNum: number;
  startDate: string | null;
  finishDate: string | null;
}[] {
  return compact<Govministry>(member.govministries)
    .map((gov) => ({
      govMinistryId: gov.govministry_id,
      govMinistryName: gov.govministry_name,
      positionName: gov.position_name,
      knessetNum: gov.knesset,
      startDate: gov.start_date,
      finishDate: gov.finish_date,
    }))
    .sort((a, b) => b.knessetNum - a.knessetNum);
}

/** A role held by a member, normalized across committee/ministry/faction roles. */
export interface NormalizedRole {
  label: string;
  detail?: string;
  knessetNum: number;
  startDate: string | null;
  finishDate: string | null;
}

/**
 * All roles a member held in a specific Knesset term, normalized for display.
 */
export function getRolesForTerm(member: Member, knessetNum: number): NormalizedRole[] {
  const roles: NormalizedRole[] = [];

  compact<CommitteePosition>(member.committee_positions)
    .filter((pos) => pos.knesset === knessetNum)
    .forEach((pos) =>
      roles.push({
        label: pos.position_name,
        detail: pos.committee_name,
        knessetNum: pos.knesset,
        startDate: pos.start_date,
        finishDate: pos.finish_date,
      })
    );

  compact<Govministry>(member.govministries)
    .filter((gov) => gov.knesset === knessetNum)
    .forEach((gov) =>
      roles.push({
        label: gov.position_name,
        detail: gov.govministry_name,
        knessetNum: gov.knesset,
        startDate: gov.start_date,
        finishDate: gov.finish_date,
      })
    );

  compact<MemberFaction>(member.faction_chairpersons)
    .filter((fc) => fc.knesset === knessetNum)
    .forEach((fc) =>
      roles.push({
        label: 'יו״ר סיעה',
        detail: fc.faction_name,
        knessetNum: fc.knesset,
        startDate: fc.start_date,
        finishDate: fc.finish_date,
      })
    );

  return roles;
}

/**
 * Whether the member is currently serving.
 */
export function isCurrentlyServing(member: Member): boolean {
  return member.IsCurrent;
}

/**
 * Member's overall service period (earliest start to latest finish across all
 * roles). Returns ISO strings, or an empty object when no dated roles exist.
 */
export function getServicePeriod(member: Member): {
  startDate?: string;
  finishDate?: string;
} {
  const dated = [
    ...compact<MemberFaction>(member.factions),
    ...compact<CommitteePosition>(member.committee_positions),
    ...compact<MemberFaction>(member.faction_chairpersons),
    ...compact<Govministry>(member.govministries),
  ].map((item) => ({
    start: item.start_date ? new Date(item.start_date) : null,
    finish: item.finish_date ? new Date(item.finish_date) : null,
  }));

  const startDates = dated.map((d) => d.start).filter((d): d is Date => d != null);
  if (startDates.length === 0) {
    return {};
  }

  const finishDates = dated.map((d) => d.finish).filter((d): d is Date => d != null);

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
