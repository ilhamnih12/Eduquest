import { kv } from '@vercel/kv';
import { GameState } from '@/types/game';
import { User } from '@/types/user';

// In-memory fallback cache when Vercel KV environment variables are not present
const inMemoryCache = new Map<string, unknown>();

const isKvConfigured = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

/**
 * Save user game state to Redis/Vercel KV with graceful fallback
 */
export async function saveServerGameState(userId: string, state: GameState): Promise<boolean> {
  const key = `user_gamestate:${userId}`;
  if (isKvConfigured) {
    try {
      await kv.set(key, state);
      return true;
    } catch (error) {
      console.warn('Vercel KV save error, falling back to memory:', error);
      inMemoryCache.set(key, state);
      return true;
    }
  } else {
    inMemoryCache.set(key, state);
    return true;
  }
}

/**
 * Load user game state from Redis/Vercel KV
 */
export async function loadServerGameState(userId: string): Promise<GameState | null> {
  const key = `user_gamestate:${userId}`;
  if (isKvConfigured) {
    try {
      const data = await kv.get<GameState>(key);
      return data ?? null;
    } catch (error) {
      console.warn('Vercel KV load error, falling back to memory:', error);
      return (inMemoryCache.get(key) as GameState) ?? null;
    }
  } else {
    return (inMemoryCache.get(key) as GameState) ?? null;
  }
}

/**
 * Save user credential account
 */
export async function saveServerUser(user: User): Promise<boolean> {
  const keyEmail = `user_email:${user.email.toLowerCase()}`;
  const keyId = `user_id:${user.id}`;
  if (isKvConfigured) {
    try {
      await kv.set(keyEmail, user);
      await kv.set(keyId, user);
      return true;
    } catch (error) {
      console.warn('Vercel KV save user error, fallback to memory:', error);
      inMemoryCache.set(keyEmail, user);
      inMemoryCache.set(keyId, user);
      return true;
    }
  } else {
    inMemoryCache.set(keyEmail, user);
    inMemoryCache.set(keyId, user);
    return true;
  }
}

/**
 * Get user by email
 */
export async function getServerUserByEmail(email: string): Promise<User | null> {
  const keyEmail = `user_email:${email.toLowerCase()}`;
  if (isKvConfigured) {
    try {
      const user = await kv.get<User>(keyEmail);
      return user ?? null;
    } catch (error) {
      console.warn('Vercel KV get user error, fallback to memory:', error);
      return (inMemoryCache.get(keyEmail) as User) ?? null;
    }
  } else {
    return (inMemoryCache.get(keyEmail) as User) ?? null;
  }
}
