// Simple in-memory cache with TTL (time to live).
const store = new Map();

export function setCache(key, value, ttlMs) {
  const expiresAt = Date.now() + ttlMs;
  store.set(key, { value, expiresAt });
}

export function getCache(key) {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    store.delete(key); 
    return null;
  }

  return entry.value
}
