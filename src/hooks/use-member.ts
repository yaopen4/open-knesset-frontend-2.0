/**
 * Custom hook for fetching member data in server components.
 */

import { use } from 'react';
import type { Member } from '../lib/api/types';

/**
 * Hook to unwrap a member promise in a server component.
 * Usage: const member = useMember(membersApi.getById(mkIndividualId))
 */
export function useMember(promise: Promise<Member>): Member {
  return use(promise);
}
