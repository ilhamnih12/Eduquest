import { describe, it, expect } from 'vitest';
import {
  calculateRequiredExp,
  evaluateLevelUp,
  getPlayerTitle,
  calculateEffectiveStats,
} from '@/lib/game/level-calculator';
import {
  calculatePlayerDamage,
  calculateEnemyDamage,
  calculateExpGain,
  calculateGoldDrop,
  generateBattleRewards,
} from '@/lib/game/battle-logic';
import { QUESTION_BANK, getLocalQuestions, getRandomLocalQuestion } from '@/lib/game/question-bank';
import { ITEM_DATABASE, getAllShopItems, getItemById } from '@/lib/game/item-database';
import { ENEMY_DATABASE, getRandomEnemy } from '@/lib/game/enemies-database';
import { INITIAL_ACHIEVEMENTS, checkAchievements } from '@/lib/game/achievements-database';
import { Character, GameStatistics } from '@/types/game';

describe('Level Calculator & Progression', () => {
  it('calculates exponential EXP required per level correctly', () => {
    const expLvl1 = calculateRequiredExp(1);
    const expLvl2 = calculateRequiredExp(2);
    const expLvl5 = calculateRequiredExp(5);

    expect(expLvl1).toBe(100);
    expect(expLvl2).toBeGreaterThan(expLvl1);
    expect(expLvl5).toBeGreaterThan(expLvl2);
  });

  it('correctly evaluates level up and leftover exp', () => {
    // Current level 1, earned 250 EXP (level 1 requires 100)
    const result = evaluateLevelUp(1, 250);
    expect(result.newLevel).toBeGreaterThan(1);
    expect(result.levelsGained).toBeGreaterThanOrEqual(1);
    expect(result.statPointsGained).toBe(result.levelsGained * 3);
  });

  it('generates appropriate player titles based on level', () => {
    expect(getPlayerTitle(1)).toBe('Murid Pemula SMP');
    expect(getPlayerTitle(5)).toBe('Pelajar Berbakat');
    expect(getPlayerTitle(10)).toBe('Petualang Cerdas');
    expect(getPlayerTitle(30)).toBe('Mahaguru Nusantara');
  });

  it('computes effective player stats with equipped weapons and armor', () => {
    const dummyChar: Character = {
      name: 'Tester',
      avatar: '🎓',
      title: 'Pemula',
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 100,
      maxHp: 100,
      baseAttack: 15,
      baseDefense: 10,
      gold: 50,
      unassignedPoints: 0,
      attributes: { strength: 10, vitality: 10, intelligence: 10, agility: 10 },
      equippedWeaponId: 'weapon_pen_blade',
      equippedArmorId: 'armor_lab_coat',
      activeBuffs: [],
    };

    const weapon = getItemById('weapon_pen_blade');
    const armor = getItemById('armor_lab_coat');
    const effective = calculateEffectiveStats(dummyChar, weapon, armor);

    expect(effective.maxHp).toBeGreaterThan(100);
    expect(effective.attack).toBeGreaterThan(15);
    expect(effective.defense).toBeGreaterThan(10);
    expect(effective.critRate).toBeGreaterThanOrEqual(5);
  });
});

describe('Battle Combat & Damage Formulas', () => {
  it('calculates player damage correctly with streak combo and defense mitigation', () => {
    const result = calculatePlayerDamage(30, 2, 3, 10, 1.0, 5);
    expect(result.damage).toBeGreaterThanOrEqual(8);
    expect(typeof result.isCritical).toBe('boolean');
  });

  it('calculates enemy counterattack damage mitigating with player defense', () => {
    const enemyDmg = calculateEnemyDamage(25, 20, 1.0);
    expect(enemyDmg.damage).toBeGreaterThanOrEqual(5);
  });

  it('calculates battle rewards EXP and Gold properly', () => {
    const exp = calculateExpGain(3);
    const gold = calculateGoldDrop(3);
    expect(exp).toBeGreaterThan(50);
    expect(gold).toBeGreaterThan(20);
  });

  it('generates battle rewards with loot drop roll from enemy table', () => {
    const enemy = ENEMY_DATABASE[0];
    const rewards = generateBattleRewards(enemy);
    expect(rewards.expGained).toBeGreaterThan(0);
    expect(rewards.goldGained).toBeGreaterThan(0);
    expect(Array.isArray(rewards.droppedItems)).toBe(true);
  });
});

describe('Question Bank & Curriculum Coverage', () => {
  it('has questions for all 5 SMP subjects', () => {
    const subjects = ['matematika', 'ipa', 'ips', 'indonesia', 'inggris'] as const;
    subjects.forEach((subj) => {
      const qList = getLocalQuestions(subj);
      expect(qList.length).toBeGreaterThanOrEqual(4);
      qList.forEach((q) => {
        expect(q.options.length).toBe(4);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThanOrEqual(3);
        expect(q.explanation.length).toBeGreaterThan(5);
      });
    });
  });

  it('retrieves random questions without throwing', () => {
    const q = getRandomLocalQuestion('matematika', 7);
    expect(q).toBeDefined();
    expect(q.subject).toBe('matematika');
  });
});

describe('Shop & Item Database', () => {
  it('contains at least 10 items in the catalog', () => {
    const items = getAllShopItems();
    expect(items.length).toBeGreaterThanOrEqual(10);
  });

  it('ensures each item has valid prices, categories, and IDs', () => {
    getAllShopItems().forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.name.length).toBeGreaterThan(2);
      expect(item.price).toBeGreaterThan(0);
      expect(item.sellPrice).toBeGreaterThan(0);
    });
  });
});

describe('Achievement Unlock Logic', () => {
  it('unlocks first_victory achievement upon winning first battle', () => {
    const stats: GameStatistics = {
      totalBattles: 1,
      victories: 1,
      defeats: 0,
      questionsAnswered: 3,
      correctAnswers: 3,
      bestStreak: 3,
      currentStreak: 3,
      goldEarnedTotal: 100,
      subjectPerformance: {
        matematika: { correct: 3, total: 3, streak: 3, bestStreak: 3 },
        ipa: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
        ips: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
        indonesia: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
        inggris: { correct: 0, total: 0, streak: 0, bestStreak: 0 },
      },
    };

    const character: Character = {
      name: 'Hero',
      avatar: '🎓',
      title: 'Pemula',
      level: 2,
      exp: 50,
      maxExp: 150,
      hp: 100,
      maxHp: 100,
      baseAttack: 15,
      baseDefense: 10,
      gold: 150,
      unassignedPoints: 0,
      attributes: { strength: 5, vitality: 5, intelligence: 5, agility: 5 },
      equippedWeaponId: null,
      equippedArmorId: null,
      activeBuffs: [],
    };

    const result = checkAchievements(INITIAL_ACHIEVEMENTS, stats, character);
    const firstVic = result.updatedAchievements.find((a) => a.id === 'first_victory');
    expect(firstVic?.unlocked).toBe(true);
    expect(result.totalRewardGold).toBeGreaterThan(0);
  });
});
