/**
 * Custom hook for fetching member data
 */

import { use } from 'react';
import { membersApi } from '../lib/api/endpoints';
import type { Person, PersonWithPositions, PersonToPosition } from '../lib/api/types';

/**
 * Hook to fetch member by ID (for server components)
 * Usage: const member = useMember(membersApi.getById(personId))
 */
export function useMember(promise: Promise<{ data: PersonWithPositions }>) {
  const response = use(promise);
  return response.data;
}

/**
 * Hook to fetch member positions (for server components)
 * Usage: const positions = useMemberPositions(membersApi.getPositions(personId))
 */
export function useMemberPositions(promise: Promise<{ data: PersonToPosition[] }>) {
  const response = use(promise);
  return response.data;
}

/**
 * Client-side hook for member data (for client components)
 * Note: This is a placeholder. For full client-side support, integrate with React Query or SWR
 */
export function useMemberClient(personId: number) {
  // TODO: Integrate with React Query or SWR for client-side caching
  // For now, this is a server-side only implementation
  throw new Error(
    'useMemberClient is not implemented. Use useMember in server components instead.'
  );
}

