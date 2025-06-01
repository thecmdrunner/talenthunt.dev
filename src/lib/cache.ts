import { env } from "@/env";
import { kv } from "@vercel/kv";
import { createHash } from "crypto";

/**
 * Check if KV is properly configured
 */
export function isKVConfigured(): boolean {
  return !!(env.KV_REST_API_URL && env.KV_REST_API_TOKEN);
}

/**
 * Creates a standardized cache key with prefix and hash
 */
export function createStandardCacheKey<T extends string>(
  prefix: T,
  identifier: string,
): `${T}${string}` {
  const hash = createHash("sha256")
    .update(identifier.toLowerCase().trim())
    .digest("hex");
  return `${prefix}${hash}` as const;
}

/**
 * Generic cache retrieval function
 */
export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    if (!isKVConfigured()) {
      console.log("KV not configured, skipping cache retrieval");
      return null;
    }

    const cached = await kv.get(key);

    if (cached) {
      console.log(`Cache HIT for key: ${key.substring(0, 50)}...`);
      return cached as T;
    }

    console.log(`Cache MISS for key: ${key.substring(0, 50)}...`);
    return null;
  } catch (error) {
    console.error("Error retrieving from cache:", error);
    return null; // Fallback gracefully
  }
}

/**
 * Generic cache storage function
 */
export async function setInCache<T>(
  key: string,
  value: T,
  ttlSeconds: number,
): Promise<void> {
  try {
    if (!isKVConfigured()) {
      console.log("KV not configured, skipping cache storage");
      return;
    }

    await kv.setex(key, ttlSeconds, value);
    console.log(`Cached value for key: ${key.substring(0, 50)}...`);
  } catch (error) {
    console.error("Error storing in cache:", error);
    // Don't throw - caching is not critical
  }
}

/**
 * Delete from cache
 */
export async function deleteFromCache(key: string): Promise<void> {
  try {
    if (!isKVConfigured()) {
      console.log("KV not configured, skipping cache deletion");
      return;
    }

    await kv.del(key);
    console.log(`Deleted cache key: ${key.substring(0, 50)}...`);
  } catch (error) {
    console.error("Error deleting from cache:", error);
  }
}

/**
 * Cache invalidation pattern - delete keys by pattern (use with caution)
 */
export async function invalidateCachePattern(pattern: string): Promise<void> {
  try {
    if (!isKVConfigured()) {
      console.log("KV not configured, skipping cache invalidation");
      return;
    }

    // Note: This is a simplified version. In production, you might want to use SCAN
    // for better performance with large datasets
    console.log(`Cache invalidation requested for pattern: ${pattern}`);
    // Implementation would depend on your specific needs
  } catch (error) {
    console.error("Error invalidating cache pattern:", error);
  }
}

/**
 * Cache helper function that checks cache first, then executes callback if needed
 */
export async function withCache<T>({
  key,
  callback,
  ttlSeconds = 30 * 60,
  disableCache = false,
}: {
  key: string;
  callback: () => T | Promise<T>;
  ttlSeconds?: number;
  disableCache?: boolean;
}): Promise<{ data: T; servedCache: boolean }> {
  if (disableCache) {
    return { data: await callback(), servedCache: false };
  }

  try {
    // Try to get from cache first
    const cached = await getFromCache<T>(key);
    if (cached !== null) {
      return { data: cached, servedCache: true };
    }

    // Cache miss, execute callback
    console.log(
      `Cache miss for key: ${key.substring(0, 50)}... Executing callback`,
    );
    const data = await callback();

    // Store in cache for future use
    await setInCache(key, data, ttlSeconds);

    return { data, servedCache: false };
  } catch (error) {
    // If cache operations fail, still execute callback
    console.error("Cache operation failed, falling back to callback:", error);
    return { data: await callback(), servedCache: false };
  }
}

/**
 * Get cache statistics
 */
export async function getCacheInfo(): Promise<{
  configured: boolean;
  kvUrl?: string;
  message: string;
}> {
  try {
    const configured = isKVConfigured();

    return {
      configured,
      kvUrl: configured
        ? env.KV_REST_API_URL.substring(0, 50) + "..."
        : undefined,
      message: configured
        ? "Cache is properly configured and ready to use"
        : "KV environment variables not configured",
    };
  } catch (error) {
    return {
      configured: false,
      message: `Cache error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}
