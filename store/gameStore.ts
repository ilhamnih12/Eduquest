import { create } from 'zustand';
import {
  GameState,
  Character,
  InventoryItem,
  GameStatistics,
  BattleState,
  Subject,
  GradeLevel,
  CombatLogEntry,
  CharacterAttributes,
  Item,
} from '@/types/game';
import { ITEM_DATABASE, getItemById } from '@/lib/game/item-database';
import { getRandomEnemy } from '@/lib/game/enemies-database';
import { INITIAL_ACHIEVEMENTS, checkAchievements } from '@/lib/game/achievements-database';
import {
  calculateRequiredExp,
  getPlayerTitle,
  evaluateLevelUp,
  calculateEffectiveStats,
} from '@/lib/game/level-calculator';
import {
  calculatePlayerDamage,
  calculateEnemyDamage,
  generateBattleRewards,
} from '@/lib/game/battle-logic';
import { saveLocalGameState, loadLocalGameState } from '@/lib/db/dexie';
import { soundManager } from '@/lib/utils';

/**
 * Batas waktu aman untuk operasi IndexedDB/Dexie.
 * Di sebagian peramban (mode privat / iframe dengan storage terpartisi),
 * IndexedDB bisa terblokir dan promise-nya tidak pernah selesai —
 * tanpa pengaman ini tombol login akan nyangkut di "Memproses...".
 */
const STORAGE_TIMEOUT_MS = 3500;

function withTimeout<T>(promise: Promise<T>, fallback: T, ms = STORAGE_TIMEOUT_MS): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

interface GameStoreState {
  isInitialized: boolean;
  isInitializing: boolean;
  gameState: GameState;
  battleState: BattleState;
  isAiLoading: boolean;

  // Actions
  initGame: (userId?: string, username?: string) => Promise<void>;
  startBattle: (subject: Subject, grade?: GradeLevel) => Promise<void>;
  fetchNextQuestion: () => Promise<void>;
  selectAnswer: (optionIndex: number) => void;
  submitAnswer: () => Promise<void>;
  useItemInBattle: (itemId: string) => boolean;
  useItemFromInventory: (itemId: string) => boolean;
  equipItem: (itemId: string) => boolean;
  unequipItem: (slot: 'weapon' | 'armor') => void;
  buyItem: (itemId: string, quantity?: number) => { success: boolean; message: string };
  sellItem: (itemId: string, quantity?: number) => { success: boolean; message: string };
  allocateAttributePoint: (attribute: keyof CharacterAttributes) => void;
  healCharacterAtClinic: () => { success: boolean; message: string };
  closeBattleModal: () => void;
  syncDataToServer: () => Promise<void>;
  resetAllProgress: () => Promise<void>;
}

const DEFAULT_STATS: GameStatistics = {
  totalBattles: 0,
  victories: 0,
  defeats: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  bestStreak: 0,
  currentStreak: 0,
  goldEarnedTotal: 100,
  subjectPerformance: {
    matematika: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
    ipa: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
    ips: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
    indonesia: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
    inggris: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
  },
};

const DEFAULT_CHARACTER: Character = {
  name: 'Petualang Cendekia',
  avatar: '🎓',
  title: 'Murid Pemula SMP',
  level: 1,
  exp: 0,
  maxExp: 100,
  hp: 100,
  maxHp: 100,
  baseAttack: 15,
  baseDefense: 10,
  gold: 120,
  unassignedPoints: 3,
  attributes: {
    strength: 5,
    vitality: 5,
    intelligence: 5,
    agility: 5,
  },
  equippedWeaponId: 'weapon_wooden_ruler',
  equippedArmorId: 'armor_school_vest',
  activeBuffs: [],
};

const DEFAULT_STARTER_INVENTORY: InventoryItem[] = [
  { itemId: 'potion_hp_small', quantity: 3 },
  { itemId: 'scroll_hint', quantity: 2 },
  { itemId: 'weapon_wooden_ruler', quantity: 1, equipped: true },
  { itemId: 'armor_school_vest', quantity: 1, equipped: true },
];

const INITIAL_BATTLE_STATE: BattleState = {
  isActive: false,
  subject: 'matematika',
  grade: 7,
  enemy: null,
  currentTurn: 1,
  playerCurrentHp: 100,
  enemyCurrentHp: 100,
  currentQuestion: null,
  selectedOption: null,
  isAnswerSubmitted: false,
  isCorrect: null,
  streakCount: 0,
  combatLogs: [],
  isVictory: null,
  rewards: null,
  eliminatedOptions: [],
  activeBattleBuffs: {
    attackMultiplier: 1.0,
    defenseMultiplier: 1.0,
    turnsRemaining: 0,
  },
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  isInitialized: false,
  isInitializing: false,
  gameState: {
    userId: 'guest-default',
    character: DEFAULT_CHARACTER,
    inventory: DEFAULT_STARTER_INVENTORY,
    statistics: DEFAULT_STATS,
    achievements: INITIAL_ACHIEVEMENTS,
    lastSaved: new Date().toISOString(),
  },
  battleState: INITIAL_BATTLE_STATE,
  isAiLoading: false,

  initGame: async (userId = 'guest-default', username) => {
    // Cegah inisialisasi ganda yang berjalan bersamaan (race antar halaman)
    if (get().isInitializing) return;
    // Lewati bila sudah ter-init untuk userId yang sama
    if (get().isInitialized && get().gameState.userId === userId) return;

    set({ isInitializing: true });
    try {
      // Selalu beri batas waktu agar tidak pernah menggantung
      const savedState = await withTimeout(loadLocalGameState(userId), null);
      if (savedState) {
        // Ensure character stats and equipment are calculated
        if (username && savedState.character) {
          savedState.character.name = username;
        }
        set({
          gameState: savedState,
          isInitialized: true,
        });
      } else {
        const newState: GameState = {
          userId,
          character: {
            ...DEFAULT_CHARACTER,
            name: username || 'Petualang Cendekia',
          },
          inventory: [...DEFAULT_STARTER_INVENTORY],
          statistics: { ...DEFAULT_STATS },
          achievements: [...INITIAL_ACHIEVEMENTS],
          lastSaved: new Date().toISOString(),
        };
        await withTimeout(saveLocalGameState(newState), undefined);
        set({
          gameState: newState,
          isInitialized: true,
        });
      }
    } catch (error) {
      console.error('Failed to initialize game state:', error);
      set({ isInitialized: true });
    } finally {
      set({ isInitializing: false });
    }
  },

  startBattle: async (subject: Subject, grade: GradeLevel = 7) => {
    const { gameState } = get();
    const enemy = getRandomEnemy(subject, grade);

    // Calculate effective player HP based on level and equipment
    const weapon = gameState.character.equippedWeaponId ? getItemById(gameState.character.equippedWeaponId) : null;
    const armor = gameState.character.equippedArmorId ? getItemById(gameState.character.equippedArmorId) : null;
    const effective = calculateEffectiveStats(gameState.character, weapon, armor);

    const initialPlayerHp = Math.min(gameState.character.hp || effective.maxHp, effective.maxHp);

    set({
      battleState: {
        isActive: true,
        subject,
        grade,
        enemy,
        currentTurn: 1,
        playerCurrentHp: initialPlayerHp > 0 ? initialPlayerHp : Math.floor(effective.maxHp * 0.5),
        enemyCurrentHp: enemy.maxHp,
        currentQuestion: null,
        selectedOption: null,
        isAnswerSubmitted: false,
        isCorrect: null,
        streakCount: 0,
        combatLogs: [
          {
            id: `log-${Date.now()}-0`,
            turn: 1,
            message: `Pertarungan dimulai! ${enemy.name} (${enemy.title}) muncul di hadapanmu!`,
            type: 'system',
          },
        ],
        isVictory: null,
        rewards: null,
        eliminatedOptions: [],
        activeBattleBuffs: {
          attackMultiplier: 1.0,
          defenseMultiplier: 1.0,
          turnsRemaining: 0,
        },
      },
    });

    soundManager.playAttack();
    await get().fetchNextQuestion();
  },

  fetchNextQuestion: async () => {
    const { battleState } = get();
    if (!battleState.isActive || !battleState.enemy) return;

    set({ isAiLoading: true });

    try {
      // Call our Next.js API route with Gemini AI & fallback support
      const res = await fetch('/api/ai/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: battleState.subject,
          grade: battleState.grade,
          difficulty: battleState.currentTurn > 3 ? 'hard' : battleState.currentTurn > 1 ? 'medium' : 'easy',
        }),
      });

      if (!res.ok) throw new Error('API failed');

      const question = await res.json();

      set((state) => ({
        isAiLoading: false,
        battleState: {
          ...state.battleState,
          currentQuestion: question,
          selectedOption: null,
          isAnswerSubmitted: false,
          isCorrect: null,
          eliminatedOptions: [],
        },
      }));
    } catch (err) {
      console.warn('Falling back to local question:', err);
      // Fallback to local questions immediately
      const { getRandomLocalQuestion } = await import('@/lib/game/question-bank');
      const fallbackQ = getRandomLocalQuestion(battleState.subject, battleState.grade);

      set((state) => ({
        isAiLoading: false,
        battleState: {
          ...state.battleState,
          currentQuestion: fallbackQ,
          selectedOption: null,
          isAnswerSubmitted: false,
          isCorrect: null,
          eliminatedOptions: [],
        },
      }));
    }
  },

  selectAnswer: (optionIndex: number) => {
    const { battleState } = get();
    if (battleState.isAnswerSubmitted) return;
    soundManager.playClick();
    set((state) => ({
      battleState: {
        ...state.battleState,
        selectedOption: optionIndex,
      },
    }));
  },

  submitAnswer: async () => {
    const { battleState, gameState } = get();
    if (
      !battleState.isActive ||
      !battleState.currentQuestion ||
      battleState.selectedOption === null ||
      battleState.isAnswerSubmitted ||
      !battleState.enemy
    ) {
      return;
    }

    const isCorrect = battleState.selectedOption === battleState.currentQuestion.correctAnswer;
    const enemy = battleState.enemy;
    const weapon = gameState.character.equippedWeaponId ? getItemById(gameState.character.equippedWeaponId) : null;
    const armor = gameState.character.equippedArmorId ? getItemById(gameState.character.equippedArmorId) : null;
    const effective = calculateEffectiveStats(gameState.character, weapon, armor);

    const logs: CombatLogEntry[] = [...battleState.combatLogs];
    let newStreak = isCorrect ? battleState.streakCount + 1 : 0;
    let nextEnemyHp = battleState.enemyCurrentHp;
    let nextPlayerHp = battleState.playerCurrentHp;
    let victory: boolean | null = null;
    let rewards = null;

    // Update buff turns
    let currentBuffs = { ...battleState.activeBattleBuffs };
    if (currentBuffs.turnsRemaining > 0) {
      currentBuffs.turnsRemaining -= 1;
      if (currentBuffs.turnsRemaining === 0) {
        currentBuffs.attackMultiplier = 1.0;
        currentBuffs.defenseMultiplier = 1.0;
      }
    }

    if (isCorrect) {
      soundManager.playCorrect();
      // Calculate damage dealt to enemy
      const dmg = calculatePlayerDamage(
        effective.attack,
        gameState.character.level,
        newStreak,
        effective.critRate,
        currentBuffs.attackMultiplier,
        enemy.defense
      );

      nextEnemyHp = Math.max(0, nextEnemyHp - dmg.damage);

      logs.push({
        id: `log-${Date.now()}-atk`,
        turn: battleState.currentTurn,
        message: `${dmg.isCritical ? '⚡ SERANGAN KRITIS! ' : '⚔️ '}Jawabanmu BENAR! Kamu melancarkan serangan sebesar ${dmg.damage} damage ke ${enemy.name}!`,
        type: dmg.isCritical ? 'critical' : 'player_attack',
        value: dmg.damage,
      });

      if (newStreak >= 2) {
        logs.push({
          id: `log-${Date.now()}-streak`,
          turn: battleState.currentTurn,
          message: `🔥 KOMBO BERUNTUN x${newStreak}! Seranganmu semakin bertenaga!`,
          type: 'system',
        });
      }

      if (nextEnemyHp <= 0) {
        // ENEMY DEFEATED -> VICTORY!
        victory = true;
        soundManager.playVictory();
        rewards = generateBattleRewards(enemy);

        logs.push({
          id: `log-${Date.now()}-vic`,
          turn: battleState.currentTurn,
          message: `🏆 KEMENANGAN! ${enemy.name} berhasil kamu taklukkan! "${enemy.defeatQuote}"`,
          type: 'system',
        });
      }
    } else {
      soundManager.playWrong();
      // Calculate damage taken from enemy
      const enemyDmg = calculateEnemyDamage(
        enemy.attack,
        effective.defense,
        currentBuffs.defenseMultiplier
      );

      nextPlayerHp = Math.max(0, nextPlayerHp - enemyDmg.damage);

      logs.push({
        id: `log-${Date.now()}-miss`,
        turn: battleState.currentTurn,
        message: `❌ Jawaban KURANG TEPAT. ${enemy.name} melancarkan serangan balasan sebesar ${enemyDmg.damage} damage!`,
        type: 'enemy_attack',
        value: enemyDmg.damage,
      });

      if (nextPlayerHp <= 0) {
        // Check for Revival Stone
        const revivalItemIndex = gameState.inventory.findIndex((i) => i.itemId === 'stone_revival' && i.quantity > 0);
        if (revivalItemIndex >= 0) {
          // Consume revival stone
          const updatedInv = [...gameState.inventory];
          updatedInv[revivalItemIndex].quantity -= 1;
          if (updatedInv[revivalItemIndex].quantity <= 0) {
            updatedInv.splice(revivalItemIndex, 1);
          }
          nextPlayerHp = Math.floor(effective.maxHp * 0.5);

          logs.push({
            id: `log-${Date.now()}-revive`,
            turn: battleState.currentTurn,
            message: `✨ Batu Kebangkitan bersinar terang! Karaktermu bangkit kembali dengan ${nextPlayerHp} HP!`,
            type: 'system',
          });

          set((state) => ({
            gameState: {
              ...state.gameState,
              inventory: updatedInv,
            },
          }));
        } else {
          // PLAYER DEFEATED
          victory = false;
          logs.push({
            id: `log-${Date.now()}-def`,
            turn: battleState.currentTurn,
            message: `💀 Karaktermu kehabisan tenaga... Evaluasi jawaban dan coba lagi!`,
            type: 'system',
          });
        }
      }
    }

    // Update Statistics
    const updatedStats = { ...gameState.statistics };
    updatedStats.questionsAnswered += 1;
    if (isCorrect) updatedStats.correctAnswers += 1;
    if (newStreak > updatedStats.bestStreak) updatedStats.bestStreak = newStreak;
    updatedStats.currentStreak = newStreak;

    const subj = battleState.subject;
    const currentSubjStat = updatedStats.subjectPerformance[subj] || {
      correct: 0,
      total: 0,
      streak: 0,
      bestStreak: 0,
    };
    currentSubjStat.total += 1;
    if (isCorrect) {
      currentSubjStat.correct += 1;
      currentSubjStat.streak += 1;
      if (currentSubjStat.streak > currentSubjStat.bestStreak) {
        currentSubjStat.bestStreak = currentSubjStat.streak;
      }
    } else {
      currentSubjStat.streak = 0;
    }
    updatedStats.subjectPerformance[subj] = currentSubjStat;

    // Handle Victory Progression
    let updatedCharacter = { ...gameState.character };
    let updatedInventory = [...gameState.inventory];

    if (victory === true && rewards) {
      updatedStats.totalBattles += 1;
      updatedStats.victories += 1;
      updatedStats.goldEarnedTotal += rewards.goldGained;

      // Add EXP & Gold
      const newTotalExp = updatedCharacter.exp + rewards.expGained;
      const levelUpResult = evaluateLevelUp(updatedCharacter.level, newTotalExp);

      if (levelUpResult.levelsGained > 0) {
        soundManager.playLevelUp();
        rewards.leveledUp = true;
        rewards.newLevel = levelUpResult.newLevel;

        updatedCharacter.level = levelUpResult.newLevel;
        updatedCharacter.exp = levelUpResult.newExp;
        updatedCharacter.maxExp = levelUpResult.newMaxExp;
        updatedCharacter.unassignedPoints += levelUpResult.statPointsGained;
        updatedCharacter.title = getPlayerTitle(levelUpResult.newLevel);

        // Fully heal on level up
        const newEffective = calculateEffectiveStats(updatedCharacter, weapon, armor);
        updatedCharacter.hp = newEffective.maxHp;
        updatedCharacter.maxHp = newEffective.maxHp;

        logs.push({
          id: `log-${Date.now()}-lvl`,
          turn: battleState.currentTurn,
          message: `🎉 NAIK LEVEL! Karaktermu kini mencapai Level ${levelUpResult.newLevel}! (+${levelUpResult.statPointsGained} Poin Atribut)`,
          type: 'system',
        });
      } else {
        updatedCharacter.exp = levelUpResult.newExp;
        updatedCharacter.maxExp = levelUpResult.newMaxExp;
        updatedCharacter.hp = nextPlayerHp;
      }

      updatedCharacter.gold += rewards.goldGained;

      // Add Loot drops to Inventory
      for (const drop of rewards.droppedItems) {
        const existIdx = updatedInventory.findIndex((i) => i.itemId === drop.item.id);
        if (existIdx >= 0) {
          updatedInventory[existIdx].quantity += drop.quantity;
        } else if (updatedInventory.length < 20) {
          updatedInventory.push({ itemId: drop.item.id, quantity: drop.quantity });
        }
      }
    } else if (victory === false) {
      updatedStats.totalBattles += 1;
      updatedStats.defeats += 1;
      updatedCharacter.hp = Math.max(1, Math.floor(effective.maxHp * 0.2)); // Restores to 20% HP after defeat
    } else {
      updatedCharacter.hp = nextPlayerHp;
    }

    // Check & update achievements
    const achCheck = checkAchievements(gameState.achievements, updatedStats, updatedCharacter);
    if (achCheck.newlyUnlocked.length > 0) {
      updatedCharacter.gold += achCheck.totalRewardGold;
      updatedCharacter.exp += achCheck.totalRewardExp;
      achCheck.newlyUnlocked.forEach((ach) => {
        logs.push({
          id: `log-${Date.now()}-ach-${ach.id}`,
          turn: battleState.currentTurn,
          message: `🎖️ ACHIEVEMENT TERBUKA: "${ach.title}"! (+${ach.rewardGold} Emas, +${ach.rewardExp} EXP)`,
          type: 'system',
        });
      });
    }

    const newGameState: GameState = {
      ...gameState,
      character: updatedCharacter,
      inventory: updatedInventory,
      statistics: updatedStats,
      achievements: achCheck.updatedAchievements,
      lastSaved: new Date().toISOString(),
    };

    // Save to IndexedDB
    await saveLocalGameState(newGameState);

    set({
      gameState: newGameState,
      battleState: {
        ...battleState,
        playerCurrentHp: nextPlayerHp,
        enemyCurrentHp: nextEnemyHp,
        currentTurn: battleState.currentTurn + 1,
        isAnswerSubmitted: true,
        isCorrect,
        streakCount: newStreak,
        combatLogs: logs,
        isVictory: victory,
        rewards,
        activeBattleBuffs: currentBuffs,
      },
    });
  },

  useItemInBattle: (itemId: string) => {
    const { gameState, battleState } = get();
    if (!battleState.isActive || battleState.isVictory !== null) return false;

    const item = getItemById(itemId);
    const invIdx = gameState.inventory.findIndex((i) => i.itemId === itemId && i.quantity > 0);
    if (!item || invIdx < 0) return false;

    const logs: CombatLogEntry[] = [...battleState.combatLogs];
    let nextPlayerHp = battleState.playerCurrentHp;
    let nextBuffs = { ...battleState.activeBattleBuffs };
    let nextEliminated = [...battleState.eliminatedOptions];

    const weapon = gameState.character.equippedWeaponId ? getItemById(gameState.character.equippedWeaponId) : null;
    const armor = gameState.character.equippedArmorId ? getItemById(gameState.character.equippedArmorId) : null;
    const effective = calculateEffectiveStats(gameState.character, weapon, armor);

    if (item.category === 'consumable' && item.stats?.healAmount) {
      soundManager.playHeal();
      const healed = Math.min(effective.maxHp - nextPlayerHp, item.stats.healAmount);
      nextPlayerHp = Math.min(effective.maxHp, nextPlayerHp + item.stats.healAmount);
      logs.push({
        id: `log-${Date.now()}-heal`,
        turn: battleState.currentTurn,
        message: `🧪 Menggunakan ${item.name}! Memulihkan ${healed} HP karakter.`,
        type: 'player_heal',
        value: healed,
      });
    } else if (itemId === 'buff_attack') {
      soundManager.playClick();
      nextBuffs.attackMultiplier = 1.35;
      nextBuffs.turnsRemaining = 3;
      logs.push({
        id: `log-${Date.now()}-buff-atk`,
        turn: battleState.currentTurn,
        message: `⚡ Menggunakan Serbuk Fokus! Serangan meningkat +35% selama 3 ronde!`,
        type: 'item_use',
      });
    } else if (itemId === 'buff_defense') {
      soundManager.playClick();
      nextBuffs.defenseMultiplier = 1.45;
      nextBuffs.turnsRemaining = 3;
      logs.push({
        id: `log-${Date.now()}-buff-def`,
        turn: battleState.currentTurn,
        message: `🛡️ Menggunakan Perisai Konsentrasi! Pertahanan meningkat +45% selama 3 ronde!`,
        type: 'item_use',
      });
    } else if (itemId === 'scroll_hint') {
      if (!battleState.currentQuestion || nextEliminated.length >= 2) return false;
      soundManager.playClick();
      const correct = battleState.currentQuestion.correctAnswer;
      const wrongIndices = [0, 1, 2, 3].filter((idx) => idx !== correct && !nextEliminated.includes(idx));
      // Shuffle & pick 2
      const toEliminate = wrongIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
      nextEliminated.push(...toEliminate);

      logs.push({
        id: `log-${Date.now()}-hint`,
        turn: battleState.currentTurn,
        message: `📜 Gulungan Petunjuk AI berhasil mengeliminasi opsi salah! Pilihan yang tersisa semakin mengerucut.`,
        type: 'item_use',
      });
    } else {
      return false;
    }

    // Decrement inventory
    const updatedInv = [...gameState.inventory];
    updatedInv[invIdx].quantity -= 1;
    if (updatedInv[invIdx].quantity <= 0) {
      updatedInv.splice(invIdx, 1);
    }

    const updatedGameState: GameState = {
      ...gameState,
      inventory: updatedInv,
      character: {
        ...gameState.character,
        hp: nextPlayerHp,
      },
    };

    saveLocalGameState(updatedGameState);

    set({
      gameState: updatedGameState,
      battleState: {
        ...battleState,
        playerCurrentHp: nextPlayerHp,
        activeBattleBuffs: nextBuffs,
        eliminatedOptions: nextEliminated,
        combatLogs: logs,
      },
    });

    return true;
  },

  useItemFromInventory: (itemId: string) => {
    const { gameState } = get();
    const item = getItemById(itemId);
    const invIdx = gameState.inventory.findIndex((i) => i.itemId === itemId && i.quantity > 0);
    if (!item || invIdx < 0) return false;

    const weapon = gameState.character.equippedWeaponId ? getItemById(gameState.character.equippedWeaponId) : null;
    const armor = gameState.character.equippedArmorId ? getItemById(gameState.character.equippedArmorId) : null;
    const effective = calculateEffectiveStats(gameState.character, weapon, armor);

    if (item.category === 'consumable' && item.stats?.healAmount) {
      if (gameState.character.hp >= effective.maxHp) {
        return false; // HP is already full
      }
      soundManager.playHeal();
      const updatedHp = Math.min(effective.maxHp, gameState.character.hp + item.stats.healAmount);

      const updatedInv = [...gameState.inventory];
      updatedInv[invIdx].quantity -= 1;
      if (updatedInv[invIdx].quantity <= 0) {
        updatedInv.splice(invIdx, 1);
      }

      const updatedState: GameState = {
        ...gameState,
        character: {
          ...gameState.character,
          hp: updatedHp,
        },
        inventory: updatedInv,
      };

      saveLocalGameState(updatedState);
      set({ gameState: updatedState });
      return true;
    }

    return false;
  },

  equipItem: (itemId: string) => {
    const { gameState } = get();
    const item = getItemById(itemId);
    if (!item) return false;

    soundManager.playClick();
    let updatedWeapon = gameState.character.equippedWeaponId;
    let updatedArmor = gameState.character.equippedArmorId;

    const updatedInv = gameState.inventory.map((inv) => {
      if (item.category === 'weapon') {
        const isThis = inv.itemId === itemId;
        if (isThis) updatedWeapon = itemId;
        const invItem = getItemById(inv.itemId);
        return invItem?.category === 'weapon' ? { ...inv, equipped: isThis } : inv;
      } else if (item.category === 'armor') {
        const isThis = inv.itemId === itemId;
        if (isThis) updatedArmor = itemId;
        const invItem = getItemById(inv.itemId);
        return invItem?.category === 'armor' ? { ...inv, equipped: isThis } : inv;
      }
      return inv;
    });

    const updatedState: GameState = {
      ...gameState,
      character: {
        ...gameState.character,
        equippedWeaponId: updatedWeapon,
        equippedArmorId: updatedArmor,
      },
      inventory: updatedInv,
    };

    saveLocalGameState(updatedState);
    set({ gameState: updatedState });
    return true;
  },

  unequipItem: (slot: 'weapon' | 'armor') => {
    const { gameState } = get();
    soundManager.playClick();

    const updatedInv = gameState.inventory.map((inv) => {
      const item = getItemById(inv.itemId);
      if (slot === 'weapon' && item?.category === 'weapon') {
        return { ...inv, equipped: false };
      }
      if (slot === 'armor' && item?.category === 'armor') {
        return { ...inv, equipped: false };
      }
      return inv;
    });

    const updatedState: GameState = {
      ...gameState,
      character: {
        ...gameState.character,
        equippedWeaponId: slot === 'weapon' ? null : gameState.character.equippedWeaponId,
        equippedArmorId: slot === 'armor' ? null : gameState.character.equippedArmorId,
      },
      inventory: updatedInv,
    };

    saveLocalGameState(updatedState);
    set({ gameState: updatedState });
  },

  buyItem: (itemId: string, quantity: number = 1) => {
    const { gameState } = get();
    const item = getItemById(itemId);
    if (!item) return { success: false, message: 'Barang tidak ditemukan di toko.' };

    const totalCost = item.price * quantity;
    if (gameState.character.gold < totalCost) {
      return { success: false, message: `Emas tidak mencukupi! Butuh ${totalCost} Emas.` };
    }

    const updatedInv = [...gameState.inventory];
    const existIdx = updatedInv.findIndex((i) => i.itemId === itemId);

    if (existIdx >= 0) {
      updatedInv[existIdx].quantity += quantity;
    } else {
      if (updatedInv.length >= 20) {
        return { success: false, message: 'Tas penyimpanan penuh (Maksimal 20 jenis barang).' };
      }
      updatedInv.push({ itemId, quantity, equipped: false });
    }

    soundManager.playClick();
    const updatedState: GameState = {
      ...gameState,
      character: {
        ...gameState.character,
        gold: gameState.character.gold - totalCost,
      },
      inventory: updatedInv,
    };

    saveLocalGameState(updatedState);
    set({ gameState: updatedState });
    return { success: true, message: `Berhasil membeli ${quantity}x ${item.name}!` };
  },

  sellItem: (itemId: string, quantity: number = 1) => {
    const { gameState } = get();
    const item = getItemById(itemId);
    const invIdx = gameState.inventory.findIndex((i) => i.itemId === itemId && i.quantity >= quantity);
    if (!item || invIdx < 0) {
      return { success: false, message: 'Jumlah barang di tas tidak mencukupi.' };
    }

    const totalGoldEarned = item.sellPrice * quantity;
    const updatedInv = [...gameState.inventory];

    // Unequip if selling equipped item
    let updatedWeapon = gameState.character.equippedWeaponId;
    let updatedArmor = gameState.character.equippedArmorId;

    if (updatedInv[invIdx].equipped) {
      if (item.category === 'weapon') updatedWeapon = null;
      if (item.category === 'armor') updatedArmor = null;
    }

    updatedInv[invIdx].quantity -= quantity;
    if (updatedInv[invIdx].quantity <= 0) {
      updatedInv.splice(invIdx, 1);
    }

    soundManager.playClick();
    const updatedState: GameState = {
      ...gameState,
      character: {
        ...gameState.character,
        gold: gameState.character.gold + totalGoldEarned,
        equippedWeaponId: updatedWeapon,
        equippedArmorId: updatedArmor,
      },
      inventory: updatedInv,
    };

    saveLocalGameState(updatedState);
    set({ gameState: updatedState });
    return { success: true, message: `Berhasil menjual ${quantity}x ${item.name} seharga ${totalGoldEarned} Emas!` };
  },

  allocateAttributePoint: (attribute: keyof CharacterAttributes) => {
    const { gameState } = get();
    if (gameState.character.unassignedPoints <= 0) return;

    soundManager.playLevelUp();
    const currentVal = gameState.character.attributes[attribute] || 5;

    const updatedState: GameState = {
      ...gameState,
      character: {
        ...gameState.character,
        unassignedPoints: gameState.character.unassignedPoints - 1,
        attributes: {
          ...gameState.character.attributes,
          [attribute]: currentVal + 1,
        },
      },
    };

    saveLocalGameState(updatedState);
    set({ gameState: updatedState });
  },

  healCharacterAtClinic: () => {
    const { gameState } = get();
    const weapon = gameState.character.equippedWeaponId ? getItemById(gameState.character.equippedWeaponId) : null;
    const armor = gameState.character.equippedArmorId ? getItemById(gameState.character.equippedArmorId) : null;
    const effective = calculateEffectiveStats(gameState.character, weapon, armor);

    if (gameState.character.hp >= effective.maxHp) {
      return { success: false, message: 'Kesehatan karaktermu sudah penuh 100%!' };
    }

    const cost = 15;
    if (gameState.character.gold < cost) {
      return { success: false, message: 'Emas tidak mencukupi untuk biaya pemulihan di UKS (15 Emas).' };
    }

    soundManager.playHeal();
    const updatedState: GameState = {
      ...gameState,
      character: {
        ...gameState.character,
        hp: effective.maxHp,
        gold: gameState.character.gold - cost,
      },
    };

    saveLocalGameState(updatedState);
    set({ gameState: updatedState });
    return { success: true, message: 'Karaktermu telah beristirahat di UKS dan HP pulih sepenuhnya!' };
  },

  closeBattleModal: () => {
    soundManager.playClick();
    set({
      battleState: INITIAL_BATTLE_STATE,
    });
  },

  syncDataToServer: async () => {
    const { gameState } = get();
    try {
      set((state) => ({ gameState: { ...state.gameState, isSyncing: true } }));
      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameState),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.syncedState) {
          set({ gameState: { ...data.syncedState, isSyncing: false } });
          await saveLocalGameState(data.syncedState);
        }
      }
    } catch (e) {
      console.warn('Sync failed (running in offline mode):', e);
    } finally {
      set((state) => ({ gameState: { ...state.gameState, isSyncing: false } }));
    }
  },

  resetAllProgress: async () => {
    const defaultState: GameState = {
      userId: 'guest-default',
      character: DEFAULT_CHARACTER,
      inventory: [...DEFAULT_STARTER_INVENTORY],
      statistics: { ...DEFAULT_STATS },
      achievements: [...INITIAL_ACHIEVEMENTS],
      lastSaved: new Date().toISOString(),
    };
    await saveLocalGameState(defaultState);
    set({
      gameState: defaultState,
      battleState: INITIAL_BATTLE_STATE,
    });
  },
}));
