/**
 * API Endpoint definitions
 * Maps to backend.oknesset.org endpoints
 */

import { get } from './client';
import type {
  Person,
  PersonWithPositions,
  PersonToPosition,
  Faction,
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
export const membersApi = {
  /**
   * List all members
   */
  list: (params?: ListQueryParams) =>
    get<Person>('/members', params),

  /**
   * Get unified member profile by PersonID
   */
  getById: (personId: number) =>
    get<PersonWithPositions>(`/members/${personId}`),

  /**
   * Get all positions/roles across terms for a member
   */
  getPositions: (personId: number, params?: ListQueryParams) =>
    get<PersonToPosition>(`/members/${personId}/positions`, params),

  /**
   * Get all votes by member
   */
  getVotes: (personId: number, params?: ListQueryParams) =>
    get<PlenumVoteResult>(`/members/${personId}/votes`, params),

  /**
   * Get bills proposed/sponsored by member
   */
  getBills: (personId: number, params?: ListQueryParams) =>
    get<BillInitiator>(`/members/${personId}/bills`, params),

  /**
   * Get committee memberships for member
   */
  getCommittees: (personId: number, params?: ListQueryParams) =>
    get<PersonToPosition>(`/members/${personId}/committees`, params),

  /**
   * Get parliamentary queries submitted by member
   */
  getQueries: (personId: number, params?: ListQueryParams) =>
    get<Query>(`/members/${personId}/queries`, params),

  /**
   * Get agenda items submitted by member
   */
  getAgendaItems: (personId: number, params?: ListQueryParams) =>
    get<Agenda>(`/members/${personId}/agenda-items`, params),
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

