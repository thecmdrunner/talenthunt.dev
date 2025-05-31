# Caching System Documentation

## Overview

The TalentHunt.dev platform uses Redis caching via Vercel KV to optimize performance and reduce credit consumption for AI-powered features.

## Features

### 🚀 **AI Response Caching**

- Caches natural language query results for 7 days
- Identical queries return cached results without deducting credits
- Significant cost savings for repeated searches

### 🔧 **Smart Cache Management**

- Automatic fallback when cache is unavailable
- SHA-256 query hashing for consistent cache keys
- TTL-based expiration for different data types

### ⚡ **Performance Benefits**

- Instant response for cached queries
- Reduced AI API calls
- Lower credit consumption
- Better user experience

## Configuration

### Environment Variables

Add these to your `.env.local` or deployment environment:

```bash
# Required for Vercel KV
KV_URL=redis://localhost:6379  # Local development
KV_REST_API_URL=https://your-kv-instance.upstash.io
KV_REST_API_TOKEN=your-token-here
```

### Vercel Setup

1. **Create KV Database**:

   ```bash
   vercel kv create
   ```

2. **Link to Project**:

   ```bash
   vercel link
   vercel env pull .env.local
   ```

3. **Environment Variables** are automatically configured

## How It Works

### 1. **Query Processing Flow**

```typescript
// Using the cache helper - much cleaner!
const result = await withCache(
  cacheKey,
  async () => {
    // This callback only runs on cache miss
    // Deduct credits and process with AI
    return await generateObject({...});
  },
  CACHE_CONFIG.AI_RESPONSE_TTL
);
```

### 2. **Cache Key Generation**

```typescript
// Query: "Find React developers in San Francisco"
// Becomes: "ai:job-attributes:a1b2c3d4e5f6..."
const key = `${CACHE_CONFIG.PREFIXES.AI_JOB_ATTRIBUTES}${hash}`;
```

### 3. **TTL Configuration**

```typescript
export const CACHE_CONFIG = {
  AI_RESPONSE_TTL: 7 * 24 * 60 * 60, // 7 days
  USER_PROFILE_TTL: 60 * 60, // 1 hour
  SEARCH_RESULTS_TTL: 30 * 60, // 30 minutes
};
```

## Cache Benefits

### 💰 **Credit Savings**

- **Original Cost**: 5 credits per AI query
- **Cached Cost**: 0 credits for repeated queries
- **Potential Savings**: Up to 80% for common searches

### 📊 **Performance Metrics**

- **Cache Hit**: ~50ms response time
- **Cache Miss**: ~2-5s response time (AI processing)
- **Cache Storage**: ~10ms overhead

## Monitoring

### Cache Statistics

```typescript
// Get cache status
const stats = await api.ai.getCacheStats.useQuery();

// Example response:
{
  cacheEnabled: true,
  message: "Cache is enabled and configured",
  kvConfigured: true
}
```

### Debugging

Enable debug logs in development:

```typescript
// Console logs show:
console.log("Cache HIT for query: Find React developers...");
console.log("Cache MISS for query: Find Python developers...");
console.log("Cached response for query: Find React developers...");
```

## Best Practices

### 1. **Query Normalization**

- Queries are automatically lowercased and trimmed
- Similar queries get cache hits
- "Find React Developers" = "find react developers"

### 2. **Cache Warming**

- Common searches can be pre-cached
- Reduces initial response times
- Improves user experience

### 3. **Error Handling**

- Cache failures don't break functionality
- Automatic fallback to AI processing
- Graceful degradation

## Development

### Local Testing

```bash
# Install Redis locally (optional)
brew install redis
redis-server

# Or use Vercel KV for development
vercel dev
```

### Cache Utilities

```typescript
import {
  withCache,
  getFromCache,
  setInCache,
  deleteFromCache,
  getCacheInfo,
  createStandardCacheKey,
} from "@/lib/cache";

// Easy caching with the helper function
const data = await withCache(
  "my-cache-key",
  async () => {
    // This expensive operation only runs on cache miss
    return await fetchDataFromAPI();
  },
  300, // 5 minutes TTL
);

// Check cache configuration
const info = await getCacheInfo();
console.log(info.configured); // true/false
```

## Production Considerations

### 1. **Memory Management**

- Monitor KV usage in Vercel dashboard
- Set appropriate TTL values
- Clean up old cache entries

### 2. **Cache Invalidation**

- Manual invalidation for outdated results
- Version-based cache keys for schema changes
- Pattern-based cleanup utilities

### 3. **Scaling**

- KV automatically scales with Vercel
- No manual sharding required
- Global edge locations

## Troubleshooting

### Common Issues

1. **Cache Not Working**

   ```bash
   # Check environment variables
   echo $KV_REST_API_URL
   echo $KV_REST_API_TOKEN
   ```

2. **High Memory Usage**

   ```typescript
   // Check cache size in Vercel dashboard
   // Reduce TTL values if needed
   ```

3. **Stale Data**
   ```typescript
   // Clear specific cache keys
   await deleteFromCache(cacheKey);
   ```

## Usage Examples

### Basic Cache Helper

```typescript
import { withCache, createStandardCacheKey } from "@/lib/cache";

// Example 1: User profile caching
const userProfile = await withCache(
  createStandardCacheKey("user:profile:", userId),
  async () => {
    return await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });
  },
  3600, // 1 hour
);

// Example 2: Search results caching
const searchResults = await withCache(
  createStandardCacheKey("search:candidates:", searchQuery),
  async () => {
    return await searchCandidates(searchQuery);
  },
  1800, // 30 minutes
);

// Example 3: API data caching
const apiData = await withCache(
  "external:api:data",
  async () => {
    const response = await fetch("https://api.example.com/data");
    return response.json();
  },
  600, // 10 minutes
);
```

### Advanced Patterns

```typescript
// Conditional caching based on user type
const getCachedData = (userId: string, userType: "recruiter" | "candidate") => {
  const ttl = userType === "recruiter" ? 300 : 600; // Recruiters get fresher data

  return withCache(
    createStandardCacheKey(`${userType}:data:`, userId),
    async () => {
      return await fetchUserData(userId, userType);
    },
    ttl,
  );
};

// Cache invalidation after updates
const updateUserProfile = async (userId: string, data: UserData) => {
  await db.update(users).set(data).where(eq(users.userId, userId));

  // Invalidate cache after update
  const cacheKey = createStandardCacheKey("user:profile:", userId);
  await deleteFromCache(cacheKey);
};
```

## Future Enhancements

- [ ] Cache compression for large responses
- [ ] Cache warming strategies
- [ ] Advanced cache analytics
- [ ] Distributed cache invalidation
- [ ] Cache partitioning by user/tenant
- [x] **Cache helper function for easy usage**
- [x] **Type-safe cache operations**

---

## Support

For cache-related issues:

1. Check Vercel KV dashboard
2. Monitor console logs
3. Verify environment variables
4. Test with `getCacheStats()` endpoint
