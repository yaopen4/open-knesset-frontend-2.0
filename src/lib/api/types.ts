/**
 * TypeScript types for Open Knesset API
 * Based on Knesset OData v2 structure
 */

// Base API response structure.
// NOTE: the live backend (backend.oknesset.org) returns bare JSON — a single
// object or a raw array — NOT a { data } envelope. This wrapper is retained
// only for the unverified scaffold endpoints below; the member endpoints
// (see Member/membersApi) return the raw shapes directly.
export interface ApiResponse<T> {
  data: T | T[];
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    lastUpdated?: string;
  };
}

// ---------------------------------------------------------------------------
// Live /members contract (backend.oknesset.org) — verified against the API
// and documented in `docs/members api endpoint.md`. Members are keyed on
// `mk_individual_id`; `PersonID` is present as a stable cross-term field.
// ---------------------------------------------------------------------------

// A committee role held by a member in a given Knesset term.
export interface CommitteePosition {
  mk_individual_id: number;
  committee_id: number;
  committee_name: string;
  position_id: number;
  position_name: string;
  start_date: string | null;
  finish_date: string | null;
  knesset: number;
}

// A member's membership in a faction for a given term.
export interface MemberFaction {
  mk_individual_id: number;
  faction_id: number;
  faction_name: string;
  start_date: string | null;
  finish_date: string | null;
  knesset: number;
}

// A faction-chairperson role (same shape as MemberFaction).
export interface FactionChairperson {
  mk_individual_id: number;
  faction_id: number;
  faction_name: string;
  start_date: string | null;
  finish_date: string | null;
  knesset: number;
}

// A government-ministry role held by a member.
export interface Govministry {
  mk_individual_id: number;
  govministry_id: number;
  govministry_name: string;
  position_id: number;
  position_name: string;
  start_date: string | null;
  finish_date: string | null;
  knesset: number;
}

// A Knesset member as returned by GET /members and GET /members/{id}.
// The nested arrays may be empty or contain null entries (per the API docs),
// so consumers must guard against null — see src/lib/data/member-utils.ts.
export interface Member {
  mk_individual_id: number;
  mk_individual_first_name: string;
  mk_individual_name: string;
  PersonID: number;
  GenderID: number;
  GenderDesc: string;
  IsCurrent: boolean;
  mk_individual_email: string | null;
  altnames: string[];
  committee_positions: Array<CommitteePosition | null>;
  factions: Array<MemberFaction | null>;
  faction_chairpersons: Array<FactionChairperson | null>;
  govministries: Array<Govministry | null>;
}

// A single plenum vote cast by a member — GET /members/{id}/votes.
export interface MemberVote {
  knesset_num: number;
  session_id: number;
  sess_item_id: number;
  sess_item_dscr: string;
  vote_item_id: number;
  vote_item_dscr: string;
  vote_date: string;
  vote_time: string;
  is_elctrnc_vote: number;
  is_accepted: number;
  total_for: number;
  total_against: number;
  total_abstain: number;
  mk_vote: string;
}

// A daily attendance record — GET /members/{id}/presence.
export interface MemberPresence {
  mk_id: number;
  mk_name: string;
  date: string;
  year: number;
  month: number;
  day: number;
  year_week_number: number;
  total_attended_hours: number;
}

// ---------------------------------------------------------------------------
// OData KNS_* scaffold types (UNVERIFIED against the live wrapper). These back
// the bills/committees/votes endpoints that are not yet wired to real data.
// ---------------------------------------------------------------------------

// KNS_Person - Unified Member Entity
export interface Person {
  PersonID: number;
  FirstName: string;
  LastName: string;
  GenderID: number;
  GenderDesc: string;
  Email?: string;
  IsCurrent: boolean;
  LastUpdatedDate: string;
}

// KNS_PersonToPosition - Member Terms & Roles
export interface PersonToPosition {
  PersonToPositionID: number;
  PersonID: number;
  PositionID: number;
  KnessetNum: number;
  FactionID?: number;
  FactionName?: string;
  CommitteeID?: number;
  CommitteeName?: string;
  GovMinistryID?: number;
  GovMinistryName?: string;
  DutyDesc?: string;
  GovernmentNum?: number;
  StartDate?: string;
  FinishDate?: string;
  IsCurrent: boolean;
  LastUpdatedDate: string;
}

// KNS_Faction - Parties/Factions
export interface Faction {
  FactionID: number;
  Name: string;
  KnessetNum: number;
  StartDate?: string;
  FinishDate?: string;
  IsCurrent: boolean;
  LastUpdatedDate: string;
}

// KNS_Bill - Bills & Laws
export interface Bill {
  BillID: number;
  KnessetNum: number;
  Name: string;
  SubTypeID: number;
  SubTypeDesc: string;
  PrivateNumber?: number;
  Number?: number;
  CommitteeID?: number;
  StatusID: number;
  PostponementReasonID?: number;
  PostponementReasonDesc?: string;
  PublicationDate?: string;
  PublicationSeriesID?: number;
  PublicationSeriesDesc?: string;
  PublicationSeriesFirstCallID?: number;
  PublicationSeriesFirstCallDesc?: string;
  MagazineNumber?: number;
  PageNumber?: number;
  IsContinuationBill: boolean;
  SummaryLaw?: string;
  LastUpdatedDate: string;
}

// KNS_BillInitiator - Bill Proposers
export interface BillInitiator {
  BillInitiatorID: number;
  BillID: number;
  PersonID: number;
  IsInitiator: boolean;
  Ordinal: number;
  LastUpdatedDate: string;
}

// KNS_Committee - Committees
export interface Committee {
  CommitteeID: number;
  Name: string;
  CategoryID: number;
  CategoryDesc: string;
  KnessetNum: number;
  CommitteeTypeID: number;
  CommitteeTypeDesc: string;
  Email?: string;
  StartDate?: string;
  FinishDate?: string;
  AdditionalTypeID?: number;
  AdditionalTypeDesc?: string;
  ParentCommitteeID?: number;
  CommitteeParentName?: string;
  IsCurrent: boolean;
  LastUpdatedDate: string;
}

// KNS_PlenumVote - Plenum Votes
export interface PlenumVote {
  VoteID: number;
  VoteDateTime: string;
  SessionID: number;
  ItemID: number;
  Ordinal: number;
  VoteMethodID: number;
  VoteMethodDesc: string;
  VoteStatusCode: number;
  VoteStatusDesc: string;
  VoteTitle: string;
  VoteSubject?: string;
  IsNoConfidenceInGov: boolean;
  ForOptionID: number;
  ForOptionDesc: string;
  AgainstOptionID: number;
  AgainstOptionDesc: string;
  LastModified: string;
}

// KNS_PlenumVoteResult - Individual Vote Records
export interface PlenumVoteResult {
  Id: number;
  MKID: number;
  VoteID: number;
  VoteDate: string;
  ResultCode: number;
  ResultDesc: string;
  LastModified_DateTime: string;
}

// KNS_PlenumSession - Plenum Sessions
export interface PlenumSession {
  PlenumSessionID: number;
  Number: number;
  KnessetNum: number;
  Name: string;
  StartDate?: string;
  FinishDate?: string;
  IsSpecialMeeting: boolean;
  LastUpdatedDate: string;
}

// KNS_CommitteeSession - Committee Sessions
export interface CommitteeSession {
  CommitteeSessionID: number;
  Number: number;
  KnessetNum: number;
  CommitteeID: number;
  TypeID?: number;
  TypeDesc?: string;
  SessionSubTypeId?: number;
  SessionSubTypeDesc?: string;
  Location?: string;
  SessionUrl?: string;
  BroadcastUrl?: string;
  StartDate?: string;
  FinishDate?: string;
  Note?: string;
  LastUpdatedDate: string;
}

// KNS_Query - Parliamentary Queries
export interface Query {
  QueryID: number;
  Number: number;
  KnessetNum: number;
  Name: string;
  TypeID: number;
  TypeDesc: string;
  StatusID: number;
  PersonID: number;
  GovMinistryID?: number;
  SubmitDate?: string;
  ReplyDatePlanned?: string;
  ReplyMinisterDate?: string;
  LastUpdatedDate: string;
}

// KNS_Agenda - Agenda Items
export interface Agenda {
  AgendaID: number;
  Number: number;
  ClassificationID: number;
  ClassificationDesc: string;
  LeadingAgendaID?: number;
  KnessetNum: number;
  Name: string;
  SubTypeID: number;
  SubTypeDesc: string;
  StatusID: number;
  InitiatorPersonID: number;
  GovRecommendationID?: number;
  GovRecommendationDesc?: string;
  PresidentDecisionDate?: string;
  PostopenmentReasonID?: number;
  PostopenmentReasonDesc?: string;
  CommitteeID?: number;
  RecommendCommitteeID?: number;
  MinisterPersonID?: number;
  LastUpdatedDate: string;
}

// Extended types with relationships
export interface PersonWithPositions extends Person {
  positions?: PersonToPosition[];
}

export interface BillWithInitiators extends Bill {
  initiators?: BillInitiator[];
}

export interface CommitteeWithMembers extends Committee {
  members?: PersonToPosition[];
}

export interface VoteWithResults extends PlenumVote {
  results?: PlenumVoteResult[];
}

// Query parameters
export interface ListQueryParams {
  page?: number;
  pageSize?: number;
  knesset?: number;
  startDate?: string;
  endDate?: string;
  status?: number;
  [key: string]: unknown;
}

