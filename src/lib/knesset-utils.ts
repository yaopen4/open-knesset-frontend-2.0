import { StaticKnessetData } from '@/lib/data/static-loader';

export interface Officeholder {
  name: string;
  personId: number;
  committeeName?: string;
}

export interface Officeholders {
  primeMinister: Officeholder[];
  president: Officeholder[];
  speaker: Officeholder[];
  deputySpeakers: Officeholder[];
  oppositionLeader: Officeholder[];
  knessetCommitteeMembers: Officeholder[];
  committeeChairs: Officeholder[];
}

/**
 * Extract officeholders from Knesset data based on positions
 * This function attempts to identify key positions from committee names and position IDs
 */
export function extractOfficeholders(knesset: StaticKnessetData): Officeholders {
  const result: Officeholders = {
    primeMinister: [],
    president: [],
    speaker: [],
    deputySpeakers: [],
    oppositionLeader: [],
    knessetCommitteeMembers: [],
    committeeChairs: [],
  };

  // Hebrew keywords for position identification
  const keywords = {
    primeMinister: ['ראש ממשלה', 'רוה"מ', 'ראש הממשלה'],
    president: ['נשיא המדינה', 'נשיא'],
    speaker: ['יו"ר הכנסת', 'יושב ראש הכנסת'],
    deputySpeaker: ['סגן יו"ר הכנסת', 'סגן יושב ראש הכנסת', 'סגן יו"ר'],
    oppositionLeader: ['ראש אופוזיציה', 'ראש האופוזיציה'],
    knessetCommittee: ['ועדת הכנסת'],
    committeeChair: ['יו"ר ועדת', 'יושב ראש ועדת'],
  };

  knesset.members.forEach((member) => {
    const fullName = `${member.name.lastName} ${member.name.firstName}`;
    
    member.positions.forEach((position) => {
      const committeeName = position.committeeName || '';
      const positionId = position.positionId;

      // Check for Prime Minister (usually positionId-based or specific committee)
      if (
        keywords.primeMinister.some(kw => committeeName.includes(kw)) ||
        positionId === 1 // Common position ID for PM
      ) {
        if (!result.primeMinister.find(pm => pm.personId === member.personId)) {
          result.primeMinister.push({ name: fullName, personId: member.personId });
        }
      }

      // Check for President
      if (
        keywords.president.some(kw => committeeName.includes(kw)) ||
        positionId === 2 // Common position ID for President
      ) {
        if (!result.president.find(p => p.personId === member.personId)) {
          result.president.push({ name: fullName, personId: member.personId });
        }
      }

      // Check for Speaker (more specific to avoid false positives)
      if (
        keywords.speaker.some(kw => committeeName.includes(kw)) ||
        (positionId && (positionId === 3 || positionId === 100)) // Common position IDs for Speaker
      ) {
        // Make sure it's not a deputy speaker
        if (!keywords.deputySpeaker.some(kw => committeeName.includes(kw))) {
          if (!result.speaker.find(s => s.personId === member.personId)) {
            result.speaker.push({ name: fullName, personId: member.personId });
          }
        }
      }

      // Check for Deputy Speakers
      if (
        keywords.deputySpeaker.some(kw => committeeName.includes(kw)) ||
        (positionId && positionId >= 4 && positionId <= 10) // Common range for deputy positions
      ) {
        if (!result.deputySpeakers.find(ds => ds.personId === member.personId)) {
          result.deputySpeakers.push({ name: fullName, personId: member.personId });
        }
      }

      // Check for Opposition Leader
      if (
        keywords.oppositionLeader.some(kw => committeeName.includes(kw)) ||
        positionId === 11 // Common position ID for Opposition Leader
      ) {
        if (!result.oppositionLeader.find(ol => ol.personId === member.personId)) {
          result.oppositionLeader.push({ name: fullName, personId: member.personId });
        }
      }

      // Check for Knesset Committee members
      if (keywords.knessetCommittee.some(kw => committeeName.includes(kw))) {
        if (!result.knessetCommitteeMembers.find(kcm => kcm.personId === member.personId)) {
          result.knessetCommitteeMembers.push({ name: fullName, personId: member.personId });
        }
      }

      // Check for Committee Chairs (permanent committees)
      // Exclude Knesset Committee and main positions
      if (
        keywords.committeeChair.some(kw => committeeName.includes(kw)) &&
        position.committeeId !== null &&
        !keywords.knessetCommittee.some(kw => committeeName.includes(kw)) &&
        !keywords.speaker.some(kw => committeeName.includes(kw)) &&
        !keywords.deputySpeaker.some(kw => committeeName.includes(kw))
      ) {
        if (!result.committeeChairs.find(cc => cc.personId === member.personId && cc.committeeName === committeeName)) {
          result.committeeChairs.push({ 
            name: fullName, 
            personId: member.personId,
            committeeName: committeeName 
          });
        }
      }
    });
  });

  return result;
}

