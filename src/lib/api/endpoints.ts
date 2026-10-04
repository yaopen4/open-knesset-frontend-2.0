/**
 * API Endpoint definitions
 * Maps to backend.oknesset.org endpoints
 */

import { get } from './client';
import type {
  Member,
  MemberVote,
  MemberPresence,
  Faction,
  PersonToPosition,
  Bill,
  BillWithInitiators,
  BillInitiator,
  Committee,
  CommitteeWithMembers,
  PlenumVote,
  VoteWithResults,
  PlenumVoteResult,
  PlenumSession,
  CommitteeSession,
  Query,
  Agenda,
  ListQueryParams,
} from './types';

// Member Endpoints
// Keyed on `mk_individual_id`. The member object already embeds factions,
// committee_positions, faction_chairpersons and govministries, so there is no
// separate "positions" endpoint — derive those from the member via
// src/lib/data/member-utils.ts.
export const membersApi = {
  /**
   * List members. Optional query params: `is_current` (boolean) and
   * `knesset_term` (number). Returns a raw array.
   */
  list: (params?: ListQueryParams) =>
    get<Member[]>('/members', params),

  /**
   * Get a single member profile by mk_individual_id. Returns a single object.
   * NOTE: without a knesset_term the nested role arrays come back as [null];
   * use `getByTerm` (and the cross-term loader) to populate roles.
   */
  getById: (mkIndividualId: number, options?: RequestInit) =>
    get<Member>(`/members/${mkIndividualId}`, undefined, options),

  /**
   * Get a member scoped to a single Knesset term. The nested role arrays
   * (factions, committee_positions, …) are populated only for that term.
   */
  getByTerm: (mkIndividualId: number, knessetTerm: number, options?: RequestInit) =>
    get<Member>(`/members/${mkIndividualId}`, { knesset_term: knessetTerm }, options),

  /**
   * Get a member's plenum votes. Returns a raw array.
   */
  getVotes: (mkIndividualId: number, params?: ListQueryParams) =>
    get<MemberVote[]>(`/members/${mkIndividualId}/votes`, params),

  /**
   * Get a member's attendance records. Returns a raw array.
   */
  getPresence: (mkIndividualId: number, params?: ListQueryParams) =>
    get<MemberPresence[]>(`/members/${mkIndividualId}/presence`, params),
};

// Faction/Party Endpoints
export const factionsApi = {
  /**
   * List all parties/factions
   */
  list: (params?: ListQueryParams) =>
    get<Faction>('/factions', params),

  /**
   * Get faction details
   */
  getById: (factionId: number) =>
    get<Faction>(`/factions/${factionId}`),

  /**
   * Get members by faction
   */
  getMembers: (factionId: number, params?: ListQueryParams) =>
    get<PersonToPosition>(`/factions/${factionId}/members`, params),
};

// Bill Endpoints
export const billsApi = {
  /**
   * List bills
   */
  list: (params?: ListQueryParams) =>
    get<Bill>('/bills', params),

  /**
   * Get bill details
   */
  getById: (billId: number) =>
    get<BillWithInitiators>(`/bills/${billId}`),

  /**
   * Get bill proposers
   */
  getInitiators: (billId: number) =>
    get<BillInitiator>(`/bills/${billId}/initiators`),

  /**
   * Get bill name history
   */
  getHistory: (billId: number) =>
    get<Bill>(`/bills/${billId}/history`),

  /**
   * Get bill documents
   */
  getDocuments: (billId: number) =>
    get<unknown>(`/bills/${billId}/documents`),

  /**
   * Get vote history for bill
   */
  getVotes: (billId: number, params?: ListQueryParams) =>
    get<PlenumVote>(`/bills/${billId}/votes`, params),
};

// Committee Endpoints
export const committeesApi = {
  /**
   * List committees
   */
  list: (params?: ListQueryParams) =>
    get<Committee>('/committees', params),

  /**
   * Get committee details
   */
  getById: (committeeId: number) =>
    get<CommitteeWithMembers>(`/committees/${committeeId}`),

  /**
   * Get committee members
   */
  getMembers: (committeeId: number, params?: ListQueryParams) =>
    get<PersonToPosition>(`/committees/${committeeId}/members`, params),

  /**
   * Get committee sessions
   */
  getSessions: (committeeId: number, params?: ListQueryParams) =>
    get<CommitteeSession>(`/committees/${committeeId}/sessions`, params),

  /**
   * Get committee session details
   */
  getSession: (committeeId: number, sessionId: number) =>
    get<CommitteeSession>(`/committees/${committeeId}/sessions/${sessionId}`),
};

// Vote Endpoints
export const votesApi = {
  /**
   * List votes
   */
  list: (params?: ListQueryParams) =>
    get<PlenumVote>('/votes', params),

  /**
   * Get vote details with breakdown
   */
  getById: (voteId: number) =>
    get<VoteWithResults>(`/votes/${voteId}`),

  /**
   * Get individual vote results
   */
  getResults: (voteId: number, params?: ListQueryParams) =>
    get<PlenumVoteResult>(`/votes/${voteId}/results`, params),
};

// Plenum Session Endpoints
export const plenumSessionsApi = {
  /**
   * List plenum sessions
   */
  list: (params?: ListQueryParams) =>
    get<PlenumSession>('/plenum-sessions', params),

  /**
   * Get plenum session with items and votes
   */
  getById: (sessionId: number) =>
    get<PlenumSession>(`/plenum-sessions/${sessionId}`),
};

// Query Endpoints
export const queriesApi = {
  /**
   * List parliamentary queries
   */
  list: (params?: ListQueryParams) =>
    get<Query>('/queries', params),

  /**
   * Get query details with documents
   */
  getById: (queryId: number) =>
    get<Query>(`/queries/${queryId}`),
};

// Agenda Endpoints
export const agendaApi = {
  /**
   * List agenda items
   */
  list: (params?: ListQueryParams) =>
    get<Agenda>('/agenda-items', params),

  /**
   * Get agenda item details
   */
  getById: (agendaId: number) =>
    get<Agenda>(`/agenda-items/${agendaId}`),
};

// Search Endpoint
export const searchApi = {
  /**
   * Unified search across entities
   */
  search: (query: string, type?: 'member' | 'bill' | 'party' | 'committee' | 'vote', params?: ListQueryParams) =>
    get<unknown>('/search', {
      q: query,
      type,
      ...params,
    }),
};

