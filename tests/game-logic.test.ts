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
import { ENEMY_DATABASE, getEnemyEscapeRoast, getRandomEnemy } from '@/lib/game/enemies-database';
import {
  INITIAL_ACHIEVEMENTS,
  checkAchievements,
  normalizeAchievements,
} from '@/lib/game/achievements-database';
import { getCurriculumTopics } from '@/lib/game/curriculum';
import {
  formatMathText,
  formatStructuredText,
  shuffleQuestionOptions,
} from '@/lib/game/question-format';
import {
  createDefaultStatistics,
  normalizeStatistics,
  SUBJECT_IDS,
} from '@/lib/game/subjects';
import {
  CALM_BGM_VARIATIONS,
  createShuffledTrackOrder,
} from '@/lib/audio/background-music';
import { Character, Question } from '@/types/game';

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
  it('has valid offline questions for all 10 SMP subjects and every grade', () => {
    const grades = [7, 8, 9] as const;
    SUBJECT_IDS.forEach((subject) => {
      grades.forEach((grade) => {
        const qList = getLocalQuestions(subject, grade);
        expect(qList.length).toBeGreaterThanOrEqual(5);
        qList.forEach((q) => {
          expect(q.options.length).toBe(4);
          expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(q.correctAnswer).toBeLessThanOrEqual(3);
          expect(q.explanation.length).toBeGreaterThan(5);
        });
      });
    });
  });

  it('covers every subchapter of the five newly added subjects offline', () => {
    const expandedSubjects = ['jawa', 'informatika', 'musik', 'pjok', 'pkn'] as const;
    const grades = [7, 8, 9] as const;

    expandedSubjects.forEach((subject) => {
      grades.forEach((grade) => {
        const questionTopics = new Set(
          getLocalQuestions(subject, grade).map((question) => question.topic)
        );
        getCurriculumTopics(subject, grade).forEach((topic) => {
          expect(questionTopics.has(topic.name), `${subject} kelas ${grade}: ${topic.name}`).toBe(true);
        });
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
    const stats = createDefaultStatistics();
    Object.assign(stats, {
      totalBattles: 1,
      victories: 1,
      questionsAnswered: 3,
      correctAnswers: 3,
      bestStreak: 3,
      currentStreak: 3,
    });
    stats.subjectPerformance.matematika = {
      correct: 3,
      total: 3,
      streak: 3,
      bestStreak: 3,
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

describe('Kompatibilitas Statistik, Roast, dan Musik', () => {
  it('menambahkan statistik mapel baru tanpa menghapus progres data lama', () => {
    const normalized = normalizeStatistics({
      victories: 4,
      subjectPerformance: {
        matematika: { correct: 8, total: 10, streak: 2, bestStreak: 5 },
      },
    });

    expect(normalized.victories).toBe(4);
    expect(normalized.subjectPerformance.matematika.correct).toBe(8);
    expect(Object.keys(normalized.subjectPerformance)).toEqual([...SUBJECT_IDS]);
    expect(normalized.subjectPerformance.informatika.total).toBe(0);
  });

  it('mempertahankan progres prestasi lama tetapi memakai katalog terbaru', () => {
    const previousMath = INITIAL_ACHIEVEMENTS.find((item) => item.id === 'math_master');
    expect(previousMath).toBeDefined();

    const normalized = normalizeAchievements([
      {
        ...previousMath!,
        title: 'Judul Lama',
        requirement: 999,
        currentProgress: 7,
      },
    ]);
    const math = normalized.find((item) => item.id === 'math_master');

    expect(math?.title).toBe(previousMath?.title);
    expect(math?.requirement).toBe(previousMath?.requirement);
    expect(math?.currentProgress).toBe(7);
    expect(normalized.some((item) => item.id === 'informatics_master')).toBe(true);
  });

  it('memberi roast khusus atau fallback yang aman saat pemain kabur', () => {
    const enemy = getRandomEnemy('informatika', 7);
    const roast = getEnemyEscapeRoast(enemy);

    expect(roast.length).toBeGreaterThan(20);
    expect(enemy.escapeRoasts).toContain(roast);
  });

  it('memiliki tiga variasi BGM dan shuffle tanpa pengulangan langsung', () => {
    expect(CALM_BGM_VARIATIONS).toHaveLength(3);
    expect(new Set(CALM_BGM_VARIATIONS.map((track) => track.id)).size).toBe(3);

    const order = createShuffledTrackOrder(CALM_BGM_VARIATIONS.length, 0, () => 0.999);
    expect(order).toHaveLength(3);
    expect(new Set(order)).toEqual(new Set([0, 1, 2]));
    expect(order[0]).not.toBe(0);
  });
});

describe('Format Soal dan Variasi Arena', () => {
  it('mengubah notasi matematika menjadi teks yang mudah dibaca', () => {
    const text = formatMathText('$x^{2} + y^2 = \\frac{18}{3}$ => 6');

    expect(text).toContain('x²');
    expect(text).toContain('y²');
    expect(text).toContain('18 ÷ 3');
    expect(text).toContain('→');
    expect(text).not.toContain('$');
    expect(text).not.toMatch(/\d\s*\/\s*\d/);
    expect(formatMathText('1 / (x + 1)')).toBe('1 ÷ (x + 1)');
  });

  it('memisahkan konteks, pertanyaan, dan langkah pembahasan agar mudah dipindai', () => {
    const formatted = formatStructuredText(
      'Konteks: Rani memiliki 12 nada. Pertanyaan: Berapa kelompok yang terbentuk?'
    );

    expect(formatted).toContain('Konteks:\nRani memiliki 12 nada.');
    expect(formatted).toContain('\n\nPertanyaan:\nBerapa kelompok yang terbentuk?');
  });

  it('menjaga kunci jawaban tidak berada di posisi sebelumnya', () => {
    const question: Question = {
      id: 'format-test',
      subject: 'matematika',
      grade: 7,
      topic: 'Aljabar',
      difficulty: 'easy',
      question: 'Berapa 1 + 1?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 1,
      explanation: '1 + 1 = 2.',
      source: 'local_bank',
    };

    const nextQuestion = shuffleQuestionOptions(question, 1);
    expect(nextQuestion.correctAnswer).not.toBe(1);
    expect(nextQuestion.options[nextQuestion.correctAnswer]).toBe('2');
  });

  it('menyediakan minimal lima subbab untuk setiap mapel dan kelas', () => {
    const grades = [7, 8, 9] as const;

    SUBJECT_IDS.forEach((subject) => {
      grades.forEach((grade) => {
        expect(getCurriculumTopics(subject, grade).length).toBeGreaterThanOrEqual(5);
      });
    });
  });

  it('menyediakan beberapa musuh berbeda di setiap mapel dan kelas', () => {
    const grades = [7, 8, 9] as const;

    SUBJECT_IDS.forEach((subject) => {
      grades.forEach((grade) => {
        const enemies = ENEMY_DATABASE.filter((enemy) => enemy.subject === subject && enemy.grade === grade);
        expect(enemies.length).toBeGreaterThanOrEqual(3);
        expect(new Set(enemies.map((enemy) => enemy.id)).size).toBe(enemies.length);
      });
    });
  });
});
