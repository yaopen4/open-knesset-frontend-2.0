/**
 * Cross-term member profile loader.
 *
 * The backend's member endpoint is term-scoped: `/members/{id}?knesset_term=N`
 * populates the nested role arrays (factions, committee_positions,
 * faction_chairpersons, govministries) only for term N, and omitting the term
 * returns them as [null]. There is no single call for a member's full history.
 *
 * To build the canonical cross-term profile that the site map describes, we
 * query every term 1..currentKnesset in parallel and merge the populated role
 * entries into one Member. Per-term caching (historical = indefinite, current =
 * hourly) keeps the fan-out cheap after the first load.
 */

import { membersApi } from '../api/endpoints';
import { getCurrentKnessetNum, getFetchCacheOptions } from './cache';
import type { Member } from '../api/types';

/**
 * Load a member's full cross-term profile by mk_individual_id.
 * Returns null if the member does not exist.
 */
export async function loadMemberProfile(mkIndividualId: number): Promise<Member | null> {
  const currentKnesset = getCurrentKnessetNum();
  const terms = Array.from({ length: currentKnesset }, (_, i) => i + 1);

  const perTerm = await Promise.all(
    terms.map(async (term) => {
      try {
        return await membersApi.getByTerm(mkIndividualId, term, getFetchCacheOptions(term));
      } catch {
        // A term the member didn't serve may error or return empty; ignore it.
        return null;
      }
    })
  );

  const valid = perTerm.filter(
    (m): m is Member => m != null && typeof m.mk_individual_id === 'number'
  );

  if (valid.length === 0) {
    return null;
  }

  // Scalar fields are identical across terms; use the first valid response as
  // the base and merge the term-scoped role arrays. Null entries (from terms
  // the member didn't serve) are filtered downstream in member-utils.
  const base = valid[0];

  return {
    ...base,
    committee_positions: valid.flatMap((m) => m.committee_positions ?? []),
    factions: valid.flatMap((m) => m.factions ?? []),
    faction_chairpersons: valid.flatMap((m) => m.faction_chairpersons ?? []),
    govministries: valid.flatMap((m) => m.govministries ?? []),
  };
}
