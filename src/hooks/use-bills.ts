/**
 * Custom hook for fetching bill data
 */

import { use } from 'react';
import { billsApi } from '../lib/api/endpoints';
import type { Bill, BillWithInitiators, BillInitiator } from '../lib/api/types';

/**
 * Hook to fetch bill by ID (for server components)
 * Usage: const bill = useBill(billsApi.getById(billId))
 */
export function useBill(promise: Promise<{ data: BillWithInitiators }>) {
  const response = use(promise);
  return response.data;
}

/**
 * Hook to fetch bill initiators (for server components)
 * Usage: const initiators = useBillInitiators(billsApi.getInitiators(billId))
 */
export function useBillInitiators(promise: Promise<{ data: BillInitiator[] }>) {
  const response = use(promise);
  return response.data;
}

/**
 * Client-side hook for bill data (for client components)
 * Note: This is a placeholder. For full client-side support, integrate with React Query or SWR
 */
export function useBillClient(billId: number) {
  // TODO: Integrate with React Query or SWR for client-side caching
  // For now, this is a server-side only implementation
  throw new Error(
    'useBillClient is not implemented. Use useBill in server components instead.'
  );
}

