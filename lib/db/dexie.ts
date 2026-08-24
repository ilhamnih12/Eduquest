import Dexie, { type Table } from 'dexie';
import { GameState, Question } from '@/types/game';
import { User } from '@/types/user';

export class EduquestDatabase extends Dexie {
  users!: Table<User, string>;
  gameState!: Table<GameState, string>;
  cachedQuestions!: Table<Question, string>;
  offlineQueue!: Table<{ id?: number; action: string; payload: unknown; timestamp: number }, number>;

  constructor() {
    super('EduquestDatabase');
    this.version(1).stores({
      users: 'id, email, username',
      gameState: 'userId, lastSaved',
      cachedQuestions: 'id, subject, grade, difficulty',
      offlineQueue: '++id, action, timestamp',
    });
  }
}

export const db = new EduquestDatabase();

/**
 * Save game state to IndexedDB
 */
export async function saveLocalGameState(state: GameState): Promise<void> {
  try {
    state.lastSaved = new Date().toISOString();
    await db.gameState.put(state);
  } catch (error) {
    console.error('Dexie IndexedDB save error:', error);
  }
}

/**
 * Load game state from IndexedDB for a specific user or guest
 */
export async function loadLocalGameState(userId: string): Promise<GameState | undefined> {
  try {
    return await db.gameState.get(userId);
  } catch (error) {
    console.error('Dexie IndexedDB load error:', error);
    return undefined;
  }
}

/**
 * Store cached questions to Dexie for offline play
 */
export async function cacheQuestionsLocally(questions: Question[]): Promise<void> {
  try {
    await db.cachedQuestions.bulkPut(questions);
  } catch (error) {
    console.error('Dexie question caching error:', error);
  }
}

/**
 * Retrieve cached questions for subject & grade
 */
export async function getLocalCachedQuestions(subject: string, grade?: number): Promise<Question[]> {
  try {
    let collection = db.cachedQuestions.where('subject').equals(subject);
    if (grade) {
      collection = collection.filter((q) => q.grade === grade);
    }
    return await collection.toArray();
  } catch (error) {
    console.error('Dexie question fetch error:', error);
    return [];
  }
}
