/**
 * Utility script for fetching historical data from API and saving as static files
 * This can be run as a build-time script or manually to update static data
 * 
 * Usage: This is a reference implementation. Run via Node.js script or Next.js API route
 */

import { membersApi, factionsApi, committeesApi } from '../api/endpoints';
import { getFetchCacheOptions } from './cache';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'app', 'knesset-data', 'members_data');

/**
 * Fetch all members for a specific Knesset term and save as JSON
 */
export async function fetchAndSaveKnessetMembers(knessetNum: number): Promise<void> {
  try {
    console.log(`Fetching members for Knesset ${knessetNum}...`);
    
    // Fetch members with positions filtered by Knesset number
    const response = await membersApi.list({
      knesset: knessetNum,
      pageSize: 1000, // Adjust based on API limits
    });

    const members = Array.isArray(response.data) ? response.data : [response.data];
    
    // Transform to match expected structure (if needed)
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

    // Save to file
    const filePath = path.join(DATA_DIR, `knesset_${knessetNum}_api.json`);
    await fs.writeFile(filePath, JSON.stringify(knessetData, null, 2), 'utf-8');
    
    console.log(`Saved ${members.length} members for Knesset ${knessetNum} to ${filePath}`);
  } catch (error) {
    console.error(`Error fetching Knesset ${knessetNum} members:`, error);
    throw error;
  }
}

/**
 * Fetch all historical Knesset data (terms 1-25)
 */
export async function fetchAllHistoricalData(): Promise<void> {
  const knessetNumbers = Array.from({ length: 25 }, (_, i) => i + 1);
  
  console.log('Starting historical data fetch...');
  
  for (const knessetNum of knessetNumbers) {
    try {
      await fetchAndSaveKnessetMembers(knessetNum);
      // Add delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to fetch Knesset ${knessetNum}:`, error);
      // Continue with next Knesset even if one fails
    }
  }
  
  console.log('Historical data fetch completed');
}

/**
 * Generate summary report of fetched data
 */
export async function generateSummaryReport(): Promise<void> {
  const files = await fs.readdir(DATA_DIR);
  const knessetFiles = files.filter((f) => f.startsWith('knesset_') && f.endsWith('_api.json'));
  
  const summary = {
    generatedAt: new Date().toISOString(),
    extracted_data: [] as Array<{
      knesset: number;
      total_members: number;
      file: string;
    }>,
  };

  for (const file of knessetFiles) {
    try {
      const filePath = path.join(DATA_DIR, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const data = JSON.parse(content);
      
      summary.extracted_data.push({
        knesset: data.knesset_number,
        total_members: data.members?.length || 0,
        file: file,
      });
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  }

  summary.extracted_data.sort((a, b) => b.knesset - a.knesset);

  const summaryPath = path.join(DATA_DIR, 'api_summary.json');
  await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');
  
  console.log(`Summary report generated: ${summaryPath}`);
}

// Note: This script should be run via a Node.js script or Next.js API route
// Example usage in a script file:
// import { fetchAllHistoricalData, generateSummaryReport } from './fetch-historical-data';
// fetchAllHistoricalData().then(() => generateSummaryReport());

