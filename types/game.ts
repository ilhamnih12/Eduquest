export type Subject = 'matematika' | 'ipa' | 'ips' | 'indonesia' | 'inggris';

export type GradeLevel = 7 | 8 | 9;

export type ItemCategory = 'consumable' | 'weapon' | 'armor' | 'booster' | 'special';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Item {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  rarity: ItemRarity;
  icon: string;
  price: number;
  sellPrice: number;
  maxStack: number;
  stats?: {
    hpBonus?: number;
    maxHpBonus?: number;
    attackBonus?: number;
    defenseBonus?: number;
    expBoostPercent?: number;
    healAmount?: number;
    revivePercent?: number;
    critRateBonus?: number;
  };
  durationTurns?: number; // For in-battle temporary buffs
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
  equipped?: boolean;
}

export interface CharacterAttributes {
  strength: number;     // Meningkatkan serangan dasar
  vitality: number;     // Meningkatkan Max HP & pertahanan
  intelligence: number; // Meningkatkan bonus XP & efektivitas item
  agility: number;      // Meningkatkan peluang serangan kritis
}

export interface ActiveBuff {
  id: string;
  name: string;
  type: 'attack' | 'defense' | 'exp';
  multiplier: number;
  turnsRemaining: number;
}

export interface Character {
  name: string;
  avatar: string;
  title: string;
  level: number;
  exp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  baseAttack: number;
  baseDefense: number;
  gold: number;
  unassignedPoints: number;
  attributes: CharacterAttributes;
  equippedWeaponId: string | null;
  equippedArmorId: string | null;
  activeBuffs: ActiveBuff[];
}

export interface Enemy {
  id: string;
  name: string;
  title: string;
  subject: Subject;
  grade: GradeLevel;
  level: number;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  avatar: string;
  elementColor: string;
  description: string;
  defeatQuote: string;
  expReward: number;
  goldReward: number;
  possibleDrops: {
    itemId: string;
    dropChance: number; // 0 to 1
  }[];
}

export interface Question {
  id: string;
  subject: Subject;
  grade: GradeLevel;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  hint?: string;
  source?: 'gemini' | 'local_bank';
}

export interface CombatLogEntry {
  id: string;
  turn: number;
  message: string;
  type: 'player_attack' | 'enemy_attack' | 'player_heal' | 'item_use' | 'system' | 'critical';
  value?: number;
}

export interface SubjectStat {
  correct: number;
  total: number;
  streak: number;
  bestStreak: number;
}

export interface GameStatistics {
  totalBattles: number;
  victories: number;
  defeats: number;
  questionsAnswered: number;
  correctAnswers: number;
  bestStreak: number;
  currentStreak: number;
  goldEarnedTotal: number;
  subjectPerformance: Record<Subject, SubjectStat>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'battle' | 'study' | 'wealth' | 'level';
  requirement: number;
  currentProgress: number;
  unlocked: boolean;
  unlockedAt: string | null;
  rewardGold: number;
  rewardExp: number;
}

export interface BattleRewards {
  expGained: number;
  goldGained: number;
  leveledUp: boolean;
  newLevel?: number;
  droppedItems: {
    item: Item;
    quantity: number;
  }[];
}

export interface BattleState {
  isActive: boolean;
  subject: Subject;
  grade: GradeLevel;
  enemy: Enemy | null;
  currentTurn: number;
  playerCurrentHp: number;
  enemyCurrentHp: number;
  currentQuestion: Question | null;
  selectedOption: number | null;
  isAnswerSubmitted: boolean;
  isCorrect: boolean | null;
  streakCount: number;
  combatLogs: CombatLogEntry[];
  isVictory: boolean | null;
  rewards: BattleRewards | null;
  eliminatedOptions: number[]; // From hint scrolls
  activeBattleBuffs: {
    attackMultiplier: number;
    defenseMultiplier: number;
    turnsRemaining: number;
  };
}

export interface GameState {
  userId: string;
  character: Character;
  inventory: InventoryItem[];
  statistics: GameStatistics;
  achievements: Achievement[];
  lastSaved: string;
  isSyncing?: boolean;
}
