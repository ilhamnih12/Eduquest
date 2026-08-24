import { Redis } from '@upstash/redis';
import { GameState } from '@/types/game';
import { User } from '@/types/user';

// Vercel KV sudah dipensiunkan; Redis dari Vercel Marketplace memakai Upstash.
// Dua nama env didukung agar deployment lama tetap bisa dipakai saat migrasi.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Fallback lokal saat environment Redis belum diisi.
const inMemoryCache = new Map<string, unknown>();

/** Simpan progres game ke Upstash Redis atau cache memory saat mode lokal. */
export async function saveServerGameState(userId: string, state: GameState): Promise<boolean> {
  const key = `user_gamestate:${userId}`;
  if (redis) {
    try {
      await redis.set(key, state);
      return true;
    } catch (error) {
      console.warn('Redis save error, falling back to memory:', error);
      inMemoryCache.set(key, state);
      return true;
    }
  }

  inMemoryCache.set(key, state);
  return true;
}

/** Ambil progres game dari Upstash Redis atau cache memory saat mode lokal. */
export async function loadServerGameState(userId: string): Promise<GameState | null> {
  const key = `user_gamestate:${userId}`;
  if (redis) {
    try {
      const data = await redis.get<GameState>(key);
      return data ?? null;
    } catch (error) {
      console.warn('Redis load error, falling back to memory:', error);
      return (inMemoryCache.get(key) as GameState) ?? null;
    }
  }

  return (inMemoryCache.get(key) as GameState) ?? null;
}

/** Simpan data akun ke Redis atau cache memory saat mode lokal. */
export async function saveServerUser(user: User): Promise<boolean> {
  const keyEmail = `user_email:${user.email.toLowerCase()}`;
  const keyId = `user_id:${user.id}`;
  if (redis) {
    try {
      await redis.set(keyEmail, user);
      await redis.set(keyId, user);
      return true;
    } catch (error) {
      console.warn('Redis save user error, falling back to memory:', error);
      inMemoryCache.set(keyEmail, user);
      inMemoryCache.set(keyId, user);
      return true;
    }
  }

  inMemoryCache.set(keyEmail, user);
  inMemoryCache.set(keyId, user);
  return true;
}

/** Ambil akun berdasarkan email. */
export async function getServerUserByEmail(email: string): Promise<User | null> {
  const keyEmail = `user_email:${email.toLowerCase()}`;
  if (redis) {
    try {
      const user = await redis.get<User>(keyEmail);
      return user ?? null;
    } catch (error) {
      console.warn('Redis get user error, falling back to memory:', error);
      return (inMemoryCache.get(keyEmail) as User) ?? null;
    }
  }

  return (inMemoryCache.get(keyEmail) as User) ?? null;
}
