/**
 * Types for the scraped members data in
 * src/app/knesset-data/[knesset_number]/members_data/
 */

export interface MembersDataMember {
  name: string;
  position: string | null;
  contact: string | null;
  image_url: string | null;
  additional_info: {
    profile_url: string;
  };
}

export interface MembersDataParty {
  party_name: string;
  members: MembersDataMember[];
}

/** Shape of knesset_<n>.json */
export interface MembersDataFile {
  knesset_number: number;
  parties: MembersDataParty[];
}

/** Shape of scraping_summary.json */
export interface ScrapingSummary {
  extracted_data: Array<{
    knesset: number;
    url: string;
    total_members: number;
    total_parties: number;
    file: string;
  }>;
}
