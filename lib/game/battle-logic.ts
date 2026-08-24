import { Enemy, Item, BattleRewards } from '@/types/game';
import { getItemById } from './item-database';

export interface DamageResult {
  damage: number;
  isCritical: boolean;
  isBlocked: boolean;
}

/**
 * Calculate player damage dealt to enemy upon answering correctly
 * Takes into account player level, effective stats, equipped weapon, active buffs, and answer streak combo
 */
export function calculatePlayerDamage(
  effectiveAttack: number,
  playerLevel: number,
  streakCount: number = 0,
  critRatePercent: number = 5,
  buffMultiplier: number = 1.0,
  enemyDefense: number = 0
): DamageResult {
  // Base attack variance (±10%)
  const variance = 0.9 + Math.random() * 0.2;
  const baseDamage = effectiveAttack * (1 + playerLevel * 0.08) * variance;

  // Streak combo multiplier (up to 2.0x for 5+ streak)
  const streakBonus = Math.min(2.0, 1 + streakCount * 0.15);

  // Critical hit roll
  const isCritical = Math.random() * 100 < Math.min(75, critRatePercent);
  const critMultiplier = isCritical ? 1.75 : 1.0;

  // Raw damage before defense reduction
  const rawDamage = baseDamage * streakBonus * buffMultiplier * critMultiplier;

  // Enemy defense mitigation formula (diminishing returns)
  const defenseReduction = enemyDefense / (enemyDefense + 50);
  const finalDamage = Math.max(8, Math.floor(rawDamage * (1 - defenseReduction)));

  return {
    damage: finalDamage,
    isCritical,
    isBlocked: false,
  };
}

/**
 * Calculate damage taken by player upon answering incorrectly
 */
export function calculateEnemyDamage(
  enemyAttack: number,
  effectiveDefense: number,
  buffMultiplier: number = 1.0
): DamageResult {
  const variance = 0.9 + Math.random() * 0.2;
  const rawDamage = enemyAttack * variance;

  // Player defense mitigation
  const defenseReduction = Math.min(0.75, (effectiveDefense * buffMultiplier) / (effectiveDefense * buffMultiplier + 60));
  const finalDamage = Math.max(5, Math.floor(rawDamage * (1 - defenseReduction)));

  return {
    damage: finalDamage,
    isCritical: Math.random() < 0.1, // 10% enemy crit
    isBlocked: defenseReduction > 0.5,
  };
}

/**
 * Calculate EXP gained from defeating an enemy
 */
export function calculateExpGain(enemyLevel: number, expBonusPercent: number = 0): number {
  const baseExp = Math.floor(50 * Math.pow(1.18, Math.max(1, enemyLevel)));
  const bonus = 1 + expBonusPercent / 100;
  return Math.floor(baseExp * bonus);
}

/**
 * Calculate Gold dropped by defeated enemy
 */
export function calculateGoldDrop(enemyLevel: number): number {
  const variance = 0.85 + Math.random() * 0.3;
  return Math.floor(25 * Math.pow(1.15, Math.max(1, enemyLevel)) * variance);
}

/**
 * Roll item drops from defeated enemy's loot table
 */
export function calculateBattleDrops(enemy: Enemy): { item: Item; quantity: number }[] {
  const drops: { item: Item; quantity: number }[] = [];

  for (const drop of enemy.possibleDrops) {
    const roll = Math.random();
    if (roll <= drop.dropChance) {
      const item = getItemById(drop.itemId);
      if (item) {
        drops.push({
          item,
          quantity: 1,
        });
      }
    }
  }

  return drops;
}

/**
 * Generate full battle rewards
 */
export function generateBattleRewards(
  enemy: Enemy,
  expBonusPercent: number = 0
): BattleRewards {
  const expGained = calculateExpGain(enemy.level, expBonusPercent);
  const goldGained = calculateGoldDrop(enemy.level);
  const droppedItems = calculateBattleDrops(enemy);

  return {
    expGained,
    goldGained,
    leveledUp: false,
    droppedItems,
  };
}
