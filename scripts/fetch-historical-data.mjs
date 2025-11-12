/**
 * Script to fetch historical data from API and save as static files
 * Run with: node scripts/fetch-historical-data.mjs
 */

import { membersApi } from '../src/lib/api/endpoints.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'src', 'app', 'knesset-data', 'members_data');

async function fetchAndSaveKnessetMembers(knessetNum) {
  try {
    console.log(`Fetching members for Knesset ${knessetNum}...`);
    
    const response = await membersApi.list({
      knesset: knessetNum,
      pageSize: 1000,
    });

    const members = Array.isArray(response.data) ? response.data : [response.data];
    
    const knessetData = {
      knesset_number: knessetNum,
      members: members.map((member) => ({
        PersonID: member.PersonID,
        FirstName: member.FirstName,
        LastName: member.LastName,
        Email: member.Email,
        IsCurrent: member.IsCurrent,
      })),
      fetchedAt: new Date().toISOString(),
    };

    const filePath = path.join(DATA_DIR, `knesset_${knessetNum}_api.json`);
    await fs.writeFile(filePath, JSON.stringify(knessetData, null, 2), 'utf-8');
    
    console.log(`✓ Saved ${members.length} members for Knesset ${knessetNum}`);
  } catch (error) {
    console.error(`✗ Error fetching Knesset ${knessetNum}:`, error.message);
  }
}

async function main() {
  console.log('Starting historical data fetch...\n');
  
  // Ensure data directory exists
  await fs.mkdir(DATA_DIR, { recursive: true });
  
  const knessetNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  
  for (const knessetNum of knessetNumbers) {
    await fetchAndSaveKnessetMembers(knessetNum);
    // Add delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  
  console.log('\nHistorical data fetch completed!');
}

main().catch(console.error);

