/**
 * Generic API hook utilities
 */

import { use } from 'react';
import type { ApiResponse } from '../lib/api/types';

/**
 * Generic hook to unwrap API response (for server components)
 * Usage: const data = useApiResponse(apiCall())
 */
export function useApiResponse<T>(promise: Promise<ApiResponse<T>>): T | T[] {
  const response = use(promise);
  return response.data;
}

/**
 * Generic hook to get full API response (for server components)
 * Usage: const response = useApiResponseFull(apiCall())
 */
export function useApiResponseFull<T>(promise: Promise<ApiResponse<T>>): ApiResponse<T> {
  return use(promise);
}

