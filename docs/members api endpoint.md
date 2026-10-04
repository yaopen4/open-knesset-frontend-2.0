API Endpoint Documentation: Get All Current Parliament Members
Overview
The /members endpoint returns a list of Knesset (Israeli Parliament) members. By default, it returns current members with details for the current Knesset term.
Endpoint Details
URL: GET /members
Base URL: Configure based on your environment:
Development: http://localhost:8000
Production: Use your deployed API URL
Full endpoint: {BASE_URL}/members
Request Parameters
All parameters are optional query parameters:
Parameter	Type	Default	Description
is_current	boolean	true	true for current members, false for past members
knesset_term	integer	null	Filter by a specific Knesset term number (e.g., 25)
Usage Examples
Get all current members (default)
// JavaScript/TypeScript exampleconst response = await fetch('http://localhost:8000/members');const members = await response.json();
# cURL examplecurl http://localhost:8000/members
Get current members for a specific Knesset term
const response = await fetch('http://localhost:8000/members?knesset_term=25&is_current=true');const members = await response.json();
Get all past members
const response = await fetch('http://localhost:8000/members?is_current=false');const members = await response.json();
Response Format
The endpoint returns a JSON array of Member objects.
HTTP Status Codes:
200 OK - Success
422 Unprocessable Entity - Invalid parameters or database error
Member Object Structure
interface Member {  mk_individual_id: number;              // Unique identifier for the member  mk_individual_first_name: string;        // First name (Hebrew)  mk_individual_name: string;              // Last name (Hebrew)  PersonID: number;                        // Person ID in the system  GenderID: number;                        // Gender ID code  GenderDesc: string;                      // Gender description (e.g., "זכר", "נקבה")  IsCurrent: boolean;                      // Whether member is currently serving  mk_individual_email: string | null;      // Email address (may be null)  altnames: string[];                      // Array of alternative name spellings  committee_positions: CommitteePosition[] | null[];  // Committee roles  factions: Faction[] | null[];            // Political factions/parties  faction_chairpersons: FactionChairperson[] | null[]; // Faction leadership roles  govministries: Govministry[] | null[];   // Government ministry positions}
Nested Object Structures
CommitteePosition
interface CommitteePosition {  mk_individual_id: number;  committee_id: number;  committee_name: string;                  // Hebrew name  position_id: number;  position_name: string;                    // Hebrew name (e.g., "חבר ועדה")  start_date: string | null;                // ISO date format: "YYYY-MM-DD"  finish_date: string | null;               // ISO date format: "YYYY-MM-DD"  knesset: number;                          // Knesset term number}
Faction
interface Faction {  mk_individual_id: number;  faction_id: number;  faction_name: string;                     // Hebrew name (e.g., "הליכוד")  start_date: string | null;                // ISO date format: "YYYY-MM-DD"  finish_date: string | null;               // ISO date format: "YYYY-MM-DD"  knesset: number;                          // Knesset term number}
FactionChairperson
interface FactionChairperson {  mk_individual_id: number;  faction_id: number;  faction_name: string;                     // Hebrew name  start_date: string | null;                // ISO date format: "YYYY-MM-DD"  finish_date: string | null;               // ISO date format: "YYYY-MM-DD"  knesset: number;                          // Knesset term number}
Govministry
interface Govministry {  mk_individual_id: number;  govministry_id: number;  govministry_name: string;                 // Hebrew name (e.g., "משרד ראש הממשלה")  position_id: number;  position_name: string;                    // Hebrew name (e.g., "שר")  start_date: string | null;                // ISO date format: "YYYY-MM-DD"  finish_date: string | null;               // ISO date format: "YYYY-MM-DD"  knesset: number;                          // Knesset term number}
Example Response
[  {    "mk_individual_id": 14,    "mk_individual_first_name": "זאב בנימין",    "mk_individual_name": "בגין",    "PersonID": 2178,    "GenderID": 251,    "GenderDesc": "זכר",    "IsCurrent": false,    "mk_individual_email": null,    "altnames": ["זאב בנימין בגין", "בינימין בגין", "בנימין בגין"],    "committee_positions": [      {        "mk_individual_id": 14,        "committee_id": 932,        "committee_name": "ועדת החוקה, חוק ומשפט",        "position_id": 42,        "position_name": "חבר ועדה",        "start_date": "2015-06-01",        "finish_date": "2019-04-30",        "knesset": 20      }    ],    "factions": [      {        "mk_individual_id": 14,        "faction_id": 882,        "faction_name": "הליכוד",        "start_date": "2015-03-31",        "finish_date": "2019-04-30",        "knesset": 20      }    ],    "faction_chairpersons": [],    "govministries": [      {        "mk_individual_id": 14,        "govministry_id": 28,        "govministry_name": "משרד ראש הממשלה",        "position_id": 39,        "position_name": "שר",        "start_date": "2015-05-14",        "finish_date": "2015-06-01",        "knesset": 20      }    ]  }]
Important Notes
Hebrew text: Names, descriptions, and labels are in Hebrew (right-to-left).
Null arrays: If a member didn't serve during the specified term, arrays like factions may contain null or be empty.
Date format: Dates use ISO format (YYYY-MM-DD).
Empty arrays: Arrays can be [] or contain null values; handle both.
CORS: The API allows all origins, so cross-origin requests work.
Error Handling
The API may return a 422 status with an error object:
{  "detail": {    "error": "ErrorTypeName",    "msg": "Error message description"  }}
Example error handling:
try {  const response = await fetch('http://localhost:8000/members');    if (!response.ok) {    if (response.status === 422) {      const error = await response.json();      console.error('Validation error:', error.detail);    } else {      console.error('HTTP error:', response.status);    }    return;  }    const members = await response.json();  // Process members...} catch (error) {  console.error('Network error:', error);}
React/TypeScript Example
// types.tsinterface Member {  mk_individual_id: number;  mk_individual_first_name: string;  mk_individual_name: string;  PersonID: number;  GenderID: number;  GenderDesc: string;  IsCurrent: boolean;  mk_individual_email: string | null;  altnames: string[];  committee_positions: CommitteePosition[] | null[];  factions: Faction[] | null[];  faction_chairpersons: FactionChairperson[] | null[];  govministries: Govministry[] | null[];}// api.tsconst API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';export async function getMembers(  isCurrent: boolean = true,  knessetTerm?: number): Promise<Member[]> {  const params = new URLSearchParams();  params.append('is_current', String(isCurrent));  if (knessetTerm) {    params.append('knesset_term', String(knessetTerm));  }    const response = await fetch(`${API_BASE_URL}/members?${params}`);    if (!response.ok) {    throw new Error(`Failed to fetch members: ${response.status}`);  }    return response.json();}// Component.tsximport { useEffect, useState } from 'react';import { getMembers } from './api';import type { Member } from './types';function MembersList() {  const [members, setMembers] = useState<Member[]>([]);  const [loading, setLoading] = useState(true);  const [error, setError] = useState<string | null>(null);    useEffect(() => {    async function fetchMembers() {      try {        setLoading(true);        const data = await getMembers(true); // Get current members        setMembers(data);      } catch (err) {        setError(err instanceof Error ? err.message : 'Unknown error');      } finally {        setLoading(false);      }    }        fetchMembers();  }, []);    if (loading) return <div>Loading...</div>;  if (error) return <div>Error: {error}</div>;    return (    <div>      <h1>Current Knesset Members ({members.length})</h1>      {members.map(member => (        <div key={member.mk_individual_id}>          <h2>{member.mk_individual_first_name} {member.mk_individual_name}</h2>          <p>Email: {member.mk_individual_email || 'N/A'}</p>          <p>Factions: {member.factions.map(f => f?.faction_name).filter(Boolean).join(', ')}</p>        </div>      ))}    </div>  );}
Additional Resources
Interactive API docs: Visit {BASE_URL}/docs for Swagger UI
Alternative endpoint: GET /members/{mk_individual_id} for a single member
Related endpoints:
GET /members/{mk_individual_id}/presence - Member attendance
GET /members/{mk_individual_id}/votes - Member voting history
GET /members/{mk_individual_id}/bills - Bills associated with member
This endpoint is ready for frontend integration. Handle Hebrew text rendering and null/empty array cases appropriately.