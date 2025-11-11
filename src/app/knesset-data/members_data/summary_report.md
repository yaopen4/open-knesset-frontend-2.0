# Knesset Member Data Extraction Summary Report

This report summarizes the data extraction process for Knesset member information from the oknesset.org website for sessions 1 through 25.

## Extraction Statistics

The scraping process successfully extracted data for all 25 Knesset sessions. No pages failed to load.

| Knesset Session | Total Members Extracted | Total Parties Extracted | Source URL |
| :---: | :---: | :---: | :--- |
| 1 | 133 | 13 | https://oknesset.org/members/knesset-1.html |
| 2 | 147 | 18 | https://oknesset.org/members/knesset-2.html |
| 3 | 164 | 15 | https://oknesset.org/members/knesset-3.html |
| 4 | 146 | 15 | https://oknesset.org/members/knesset-4.html |
| 5 | 179 | 16 | https://oknesset.org/members/knesset-5.html |
| 6 | 265 | 22 | https://oknesset.org/members/knesset-6.html |
| 7 | 140 | 18 | https://oknesset.org/members/knesset-7.html |
| 8 | 175 | 25 | https://oknesset.org/members/knesset-8.html |
| 9 | 190 | 36 | https://oknesset.org/members/knesset-9.html |
| 10 | 137 | 15 | https://oknesset.org/members/knesset-10.html |
| 11 | 148 | 21 | https://oknesset.org/members/knesset-11.html |
| 12 | 191 | 24 | https://oknesset.org/members/knesset-12.html |
| 13 | 150 | 21 | https://oknesset.org/members/knesset-13.html |
| 14 | 210 | 31 | https://oknesset.org/members/knesset-14.html |
| 15 | 193 | 27 | https://oknesset.org/members/knesset-15.html |
| 16 | 256 | 34 | https://oknesset.org/members/knesset-16.html |
| 17 | 181 | 22 | https://oknesset.org/members/knesset-17.html |
| 18 | 158 | 18 | https://oknesset.org/members/knesset-18.html |
| 19 | 167 | 17 | https://oknesset.org/members/knesset-19.html |
| 20 | 184 | 17 | https://oknesset.org/members/knesset-20.html |
| 21 | 141 | 18 | https://oknesset.org/members/knesset-21.html |
| 22 | 148 | 17 | https://oknesset.org/members/knesset-22.html |
| 23 | 236 | 26 | https://oknesset.org/members/knesset-23.html |
| 24 | 181 | 27 | https://oknesset.org/members/knesset-24.html |
| 25 | 166 | 15 | https://oknesset.org/members/knesset-25.html |

## Failed Pages

No pages failed to load during the scraping process. The refined scraping logic successfully adapted to the varying HTML structures across the different Knesset session pages.

## Data Quality Notes

The extraction focused on the most consistently available data points on the Knesset summary pages:

*   **Full Name:** Successfully extracted for all members.
*   **Party Affiliation:** Successfully extracted and used to group members.
*   **Profile Image URL:** Extracted where available. Note that some older sessions may use placeholder images.
*   **Additional Info:** The `profile_url` for each member's individual page is included in the `additional_info` field, which can be used for deeper, secondary scraping if required.
*   **Missing Fields:** As anticipated, the fields for **Position/Role** and **Contact Information** are **null** for all entries. This information is not present on the Knesset session summary pages and would require a separate, more complex scraping process of each individual member's profile page. The script maintained data accuracy by not inferring or fabricating this missing information.

## Deliverables

The following 25 JSON files, along with this summary report, are the final deliverables:

*   `knesset_data/knesset_1.json`
*   `knesset_data/knesset_2.json`
*   ...
*   `knesset_data/knesset_25.json`
*   `knesset_data/scraping_summary.json` (Raw data for this report)
*   `knesset_data/summary_report.md` (This report)
