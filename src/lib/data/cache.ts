/**
 * Cache configuration and utilities
 */

/**
 * Cache configuration for different data types
 */
export const cacheConfig = {
  // Historical data - cache indefinitely (static)
  historical: {
    revalidate: false, // Next.js: never revalidate
    cacheControl: 'public, max-age=31536000, immutable', // 1 year
  },

  // Current term data - revalidate hourly
  current: {
    revalidate: 3600, // 1 hour in seconds
    cacheControl: 'public, max-age=3600, stale-while-revalidate=86400', // 1 hour, stale for 24h
  },

  // Dynamic data - revalidate every 5 minutes
  dynamic: {
    revalidate: 300, // 5 minutes
    cacheControl: 'public, max-age=300, stale-while-revalidate=3600', // 5 min, stale for 1h
  },
} as const;

/**
 * Get current Knesset number from environment variable
 */
export function getCurrentKnessetNum(): number {
  const envValue = process.env.NEXT_PUBLIC_CURRENT_KNESSET_NUM;
  return envValue ? parseInt(envValue, 10) : 25; // Default to 25
}

/**
 * Determine cache strategy based on data type and Knesset number
 */
export function getCacheStrategy(knessetNum?: number, currentKnessetNum?: number) {
  const currentKnesset = currentKnessetNum ?? getCurrentKnessetNum();
  
  // If no Knesset number provided or it's historical, use historical cache
  if (!knessetNum || knessetNum < currentKnesset) {
    return cacheConfig.historical;
  }

  // Current Knesset uses current cache strategy
  if (knessetNum === currentKnesset) {
    return cacheConfig.current;
  }

  // Default to dynamic for future/unknown
  return cacheConfig.dynamic;
}

/**
 * Get Next.js fetch cache options
 */
export function getFetchCacheOptions(knessetNum?: number, currentKnessetNum?: number) {
  const strategy = getCacheStrategy(knessetNum, currentKnessetNum);

  return {
    next: {
      revalidate: strategy.revalidate === false ? undefined : strategy.revalidate,
    },
  };
}

/**
 * Client-side cache keys
 */
export const cacheKeys = {
  members: {
    list: (params?: Record<string, unknown>) => ['members', 'list', params],
    byId: (personId: number) => ['members', personId],
    positions: (personId: number) => ['members', personId, 'positions'],
    votes: (personId: number) => ['members', personId, 'votes'],
    bills: (personId: number) => ['members', personId, 'bills'],
    committees: (personId: number) => ['members', personId, 'committees'],
  },
  factions: {
    list: (params?: Record<string, unknown>) => ['factions', 'list', params],
    byId: (factionId: number) => ['factions', factionId],
    members: (factionId: number, params?: Record<string, unknown>) => [
      'factions',
      factionId,
      'members',
      params,
    ],
  },
  bills: {
    list: (params?: Record<string, unknown>) => ['bills', 'list', params],
    byId: (billId: number) => ['bills', billId],
    initiators: (billId: number) => ['bills', billId, 'initiators'],
  },
  committees: {
    list: (params?: Record<string, unknown>) => ['committees', 'list', params],
    byId: (committeeId: number) => ['committees', committeeId],
    members: (committeeId: number) => ['committees', committeeId, 'members'],
  },
  votes: {
    list: (params?: Record<string, unknown>) => ['votes', 'list', params],
    byId: (voteId: number) => ['votes', voteId],
  },
} as const;

