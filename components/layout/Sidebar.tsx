'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Swords,
  Backpack,
  Store,
  UserCheck,
  Shield,
  Award,
  Sparkles,
  Heart,
  Zap,
} from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { getItemById } from '@/lib/game/item-database';
import { calculateEffectiveStats } from '@/lib/game/level-calculator';
import { Progress } from '@/components/ui/Progress';
import { formatGold } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  const { gameState } = useGameStore();
  const character = gameState.character;

  const weapon = character.equippedWeaponId ? getItemById(character.equippedWeaponId) : null;
  const armor = character.equippedArmorId ? getItemById(character.equippedArmorId) : null;
  const effective = calculateEffectiveStats(character, weapon, armor);

  const navItems = [
    { href: '/battle', label: 'Arena Pertempuran', icon: Swords, badge: 'Soal SMP' },
    { href: '/inventory', label: 'Tas & Perlengkapan', icon: Backpack, badge: `${gameState.inventory.length}/20` },
    { href: '/shop', label: 'Toko Perlengkapan', icon: Store, badge: 'Item RPG' },
    { href: '/profile', label: 'Rapor & Prestasi', icon: UserCheck, badge: 'AI Guru' },
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
      {/* Character Hero Card */}
      <div className="rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-edu-accentLight/20 to-sky-500/20 text-3xl shadow-inner border border-edu-accentLight/30">
            <span>{character.avatar}</span>
            <div className="absolute -bottom-1 -right-1 flex h-5 px-1.5 items-center justify-center rounded-full bg-edu-accentLight dark:bg-edu-accentDark text-[10px] font-black text-white dark:text-edu-bgDark">
              Lv.{character.level}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-black truncate text-edu-textLight dark:text-edu-textDark">
              {character.name}
            </h2>
            <p className="text-xs font-semibold text-edu-accentLight dark:text-edu-accentDark truncate">
              {character.title}
            </p>
            <div className="flex items-center gap-1 mt-1 text-xs font-bold text-amber-500">
              <span>🪙 {formatGold(character.gold)} Emas</span>
            </div>
          </div>
        </div>

        {/* HP Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="flex items-center gap-1 text-rose-500">
              <Heart className="h-3 w-3 fill-rose-500" /> HP Karakter
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              {character.hp} / {effective.maxHp}
            </span>
          </div>
          <Progress value={character.hp} max={effective.maxHp} variant="hp" size="sm" />
        </div>

        {/* EXP Bar */}
        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="flex items-center gap-1 text-blue-500">
              <Zap className="h-3 w-3 fill-blue-500" /> Pengalaman (EXP)
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              {character.exp} / {character.maxExp}
            </span>
          </div>
          <Progress value={character.exp} max={character.maxExp} variant="exp" size="sm" />
        </div>

        {/* Compact Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark text-xs">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-edu-bgDark flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">⚔️ Serangan</span>
            <span className="font-bold text-edu-textLight dark:text-edu-textDark">{effective.attack}</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-edu-bgDark flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">🛡️ Pertahanan</span>
            <span className="font-bold text-edu-textLight dark:text-edu-textDark">{effective.defense}</span>
          </div>
        </div>

        {/* Free Attribute Points indicator */}
        {character.unassignedPoints > 0 && (
          <Link href="/profile" className="block mt-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold text-center animate-pulse">
              ✨ +{character.unassignedPoints} Poin Atribut Siap Dipasang!
            </div>
          </Link>
        )}
      </div>

      {/* Navigation list */}
      <nav className="rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-2 shadow-sm space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-edu-accentLight text-white dark:bg-edu-accentDark dark:text-edu-bgDark shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-edu-borderDark/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white dark:text-edu-bgDark'
                    : 'bg-slate-200 dark:bg-edu-borderDark text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.badge}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
