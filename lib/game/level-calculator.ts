import { Character, Item } from '@/types/game';

/**
 * Calculate EXP required to reach the next level
 * Exponential progression formula for Indonesian SMP RPG
 */
export function calculateRequiredExp(level: number): number {
  if (level <= 1) return 100;
  // Formula: 100 * (1.25 ^ (level - 1)) + level * 20
  return Math.floor(100 * Math.pow(1.22, level - 1) + (level - 1) * 35);
}

/**
 * Calculate title based on player level
 */
export function getPlayerTitle(level: number): string {
  if (level >= 30) return 'Mahaguru Nusantara';
  if (level >= 25) return 'Pujangga Cendekiawan';
  if (level >= 20) return 'Kesatria Ilmuwan';
  if (level >= 15) return 'Peneliti Ulung';
  if (level >= 10) return 'Petualang Cerdas';
  if (level >= 5) return 'Pelajar Berbakat';
  return 'Murid Pemula SMP';
}

/**
 * Calculate cumulative EXP earned
 */
export function calculateTotalExpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += calculateRequiredExp(i);
  }
  return total;
}

/**
 * Check if player has leveled up and calculate leftovers
 */
export function evaluateLevelUp(
  currentLevel: number,
  currentExp: number
): {
  newLevel: number;
  newExp: number;
  newMaxExp: number;
  levelsGained: number;
  statPointsGained: number;
} {
  let level = currentLevel;
  let exp = currentExp;
  let req = calculateRequiredExp(level);
  let levelsGained = 0;

  while (exp >= req && level < 50) {
    exp -= req;
    level += 1;
    levelsGained += 1;
    req = calculateRequiredExp(level);
  }

  return {
    newLevel: level,
    newExp: exp,
    newMaxExp: req,
    levelsGained,
    statPointsGained: levelsGained * 3, // 3 points per level up
  };
}

/**
 * Calculate total player stats including base attributes and equipment
 */
export function calculateEffectiveStats(
  character: Character,
  equippedWeapon?: Item | null,
  equippedArmor?: Item | null
) {
  // Base scaling per level
  const baseHpPerLevel = (character.level - 1) * 15;
  const baseAtkPerLevel = (character.level - 1) * 4;
  const baseDefPerLevel = (character.level - 1) * 2;

  // Attribute contributions
  const strBonus = (character.attributes?.strength || 10) * 2.5;
  const vitBonusHp = (character.attributes?.vitality || 10) * 12;
  const vitBonusDef = (character.attributes?.vitality || 10) * 1.5;
  const intBonusCrit = (character.attributes?.intelligence || 10) * 0.4;
  const agiBonusCrit = (character.attributes?.agility || 10) * 0.6;

  // Equipment bonuses
  const weaponAtk = equippedWeapon?.stats?.attackBonus ?? 0;
  const weaponCrit = equippedWeapon?.stats?.critRateBonus ?? 0;
  const armorDef = equippedArmor?.stats?.defenseBonus ?? 0;
  const armorHp = equippedArmor?.stats?.maxHpBonus ?? 0;

  const totalMaxHp = Math.floor(100 + baseHpPerLevel + vitBonusHp + armorHp);
  const totalAttack = Math.floor(character.baseAttack + baseAtkPerLevel + strBonus + weaponAtk);
  const totalDefense = Math.floor(character.baseDefense + baseDefPerLevel + vitBonusDef + armorDef);
  const totalCritRate = Math.min(60, Math.floor(5 + intBonusCrit + agiBonusCrit + weaponCrit));

  return {
    maxHp: totalMaxHp,
    attack: totalAttack,
    defense: totalDefense,
    critRate: totalCritRate,
  };
}
