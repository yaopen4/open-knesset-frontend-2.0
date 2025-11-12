/**
 * API Client for Open Knesset Backend
 * Base URL: https://backend.oknesset.org
 */

import type { ApiResponse, ListQueryParams } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.oknesset.org';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  params?: ListQueryParams;
}

/**
 * Build query string from params object
 */
function buildQueryString(params: ListQueryParams): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Fetch wrapper with error handling and type safety
 */
async function fetchApi<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}${params ? buildQueryString(params) : ''}`;
  
  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
  });
  
  if (!response.ok) {
    let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
    let errorData: unknown;
    
    try {
      errorData = await response.json();
      if (errorData && typeof errorData === 'object' && 'message' in errorData) {
        errorMessage = String(errorData.message);
      }
    } catch {
      // If response is not JSON, use default error message
    }
    
    throw new ApiError(errorMessage, response.status, errorData);
  }
  
  return response.json();
}

/**
 * GET request helper
 */
export async function get<T>(
  endpoint: string,
  params?: ListQueryParams,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'GET',
    params,
    ...options,
  });
}

/**
 * POST request helper
 */
export async function post<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
}

/**
 * PUT request helper
 */
export async function put<T>(
  endpoint: string,
  data?: unknown,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });
}

/**
 * DELETE request helper
 */
export async function del<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  return fetchApi<T>(endpoint, {
    method: 'DELETE',
    ...options,
  });
}

/**
 * Get API base URL
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}

