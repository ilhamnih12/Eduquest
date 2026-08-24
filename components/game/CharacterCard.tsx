import * as React from 'react';
import { Character, InventoryItem, ActiveBuff } from '@/types/game';
import { ProgressBar } from './ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { getItemById } from '@/lib/game/item-database';
import { calculateEffectiveStats } from '@/lib/game/level-calculator';
import { Shield, Swords, Heart, Sparkles, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CharacterCardProps {
  character: Character;
  currentHp: number;
  inventory?: InventoryItem[];
  onUseItem?: (itemId: string) => void;
  activeBattleBuffs?: {
    attackMultiplier: number;
    defenseMultiplier: number;
    turnsRemaining: number;
  };
  isHit?: boolean;
}

export function CharacterCard({
  character,
  currentHp,
  inventory = [],
  onUseItem,
  activeBattleBuffs,
  isHit,
}: CharacterCardProps) {
  const weapon = character.equippedWeaponId ? getItemById(character.equippedWeaponId) : null;
  const armor = character.equippedArmorId ? getItemById(character.equippedArmorId) : null;
  const effective = calculateEffectiveStats(character, weapon, armor);

  // Filter quick consumables available for battle
  const battleConsumables = inventory.filter((i) => {
    const it = getItemById(i.itemId);
    return it && (it.category === 'consumable' || it.category === 'booster' || it.id === 'scroll_hint') && i.quantity > 0;
  });

  return (
    <div
      className={`relative rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-5 shadow-lg transition-all duration-300 ${
        isHit ? 'animate-shake ring-2 ring-rose-500' : ''
      }`}
    >
      <div className="flex flex-col items-center text-center">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="gold" className="font-bold">
            Level {character.level}
          </Badge>
          <Badge variant="purple" className="font-bold">
            {character.title}
          </Badge>
        </div>

        {/* Character Avatar */}
        <div className="relative my-2">
          <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-edu-accentLight/20 to-sky-500/20 text-6xl sm:text-7xl shadow-xl border-2 border-edu-accentLight/40 hover:scale-105 transition-transform select-none">
            <span>{character.avatar}</span>
          </div>

          {/* Active Buffs Float Badge */}
          {activeBattleBuffs && activeBattleBuffs.turnsRemaining > 0 && (
            <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-amber-500 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-bounce-subtle">
              <Sparkles className="h-3 w-3" />
              Buff ({activeBattleBuffs.turnsRemaining}T)
            </div>
          )}
        </div>

        {/* Character Name */}
        <h3 className="mt-2 text-lg sm:text-xl font-black text-edu-textLight dark:text-edu-textDark">
          {character.name}
        </h3>

        {/* Equipment Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1 text-[11px]">
          {weapon && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-edu-borderDark/60 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
              🗡️ {weapon.name}
            </span>
          )}
          {armor && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-edu-borderDark/60 text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
              🛡️ {armor.name}
            </span>
          )}
        </div>

        {/* HP Bar */}
        <div className="w-full mt-4 space-y-1">
          <div className="flex justify-between items-center text-xs font-black">
            <span className="text-emerald-500 flex items-center gap-1">
              <Heart className="h-3.5 w-3.5 fill-emerald-500" /> HP Karakter
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              {Math.max(0, currentHp)} / {effective.maxHp}
            </span>
          </div>
          <ProgressBar current={currentHp} max={effective.maxHp} color="green" height="h-3.5" />
        </div>

        {/* Stats Grid */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark w-full text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1">
            <Swords className="h-3.5 w-3.5 text-blue-500" /> Atk: {effective.attack}
            {activeBattleBuffs && activeBattleBuffs.attackMultiplier > 1 && (
              <span className="text-amber-500 text-[10px]">(+35%)</span>
            )}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-emerald-500" /> Def: {effective.defense}
            {activeBattleBuffs && activeBattleBuffs.defenseMultiplier > 1 && (
              <span className="text-amber-500 text-[10px]">(+45%)</span>
            )}
          </span>
          <span className="text-purple-500">
            ⚡ Crit: {effective.critRate}%
          </span>
        </div>

        {/* Quick Item Pouch in Battle */}
        {onUseItem && battleConsumables.length > 0 && (
          <div className="mt-4 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark w-full">
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-center gap-1">
              🧪 Kantong Item Cepat
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {battleConsumables.map((inv) => {
                const it = getItemById(inv.itemId);
                if (!it) return null;
                return (
                  <button
                    key={inv.itemId}
                    onClick={() => onUseItem(inv.itemId)}
                    title={`Gunakan ${it.name} (${inv.quantity} tersisa): ${it.description}`}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-slate-100 dark:bg-edu-cardDark text-xs font-bold text-edu-textLight dark:text-edu-textDark hover:bg-edu-accentLight hover:text-white dark:hover:bg-edu-accentDark dark:hover:text-edu-bgDark transition-all active:scale-95 shadow-sm"
                  >
                    <span>{it.category === 'consumable' ? '🧪' : it.id === 'scroll_hint' ? '📜' : '⚡'}</span>
                    <span className="truncate max-w-[100px]">{it.name}</span>
                    <span className="text-[10px] px-1 rounded-full bg-slate-200 dark:bg-edu-borderDark text-slate-700 dark:text-slate-300">
                      x{inv.quantity}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
