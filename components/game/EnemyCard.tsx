import * as React from 'react';
import { Enemy } from '@/types/game';
import { ProgressBar } from './ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { getSubjectMeta } from '@/lib/utils';
import { Shield, Swords } from 'lucide-react';

interface EnemyCardProps {
  enemy: Enemy;
  currentHp: number;
  isHit?: boolean;
}

export function EnemyCard({ enemy, currentHp, isHit }: EnemyCardProps) {
  const meta = getSubjectMeta(enemy.subject);

  return (
    <div
      className={`relative rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-5 shadow-lg overflow-hidden transition-all duration-300 ${
        isHit ? 'animate-shake ring-2 ring-rose-500' : ''
      }`}
    >
      {/* Background glow corresponding to element */}
      <div
        className="absolute -top-12 -right-12 h-36 w-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: enemy.elementColor }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top Badges */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className={meta.badgeClass}>
            {meta.name} (Kelas {enemy.grade})
          </Badge>
          <Badge variant="danger" className="font-bold">
            Monster Lv.{enemy.level}
          </Badge>
        </div>

        {/* Enemy Avatar with floating animation */}
        <div className="relative my-2">
          <div
            className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl text-6xl sm:text-7xl shadow-xl border-2 transition-transform duration-300 hover:scale-105 animate-float select-none"
            style={{
              borderColor: `${enemy.elementColor}60`,
              background: `radial-gradient(circle, ${enemy.elementColor}25 0%, transparent 80%)`,
            }}
          >
            <span>{enemy.avatar}</span>
          </div>

          {isHit && (
            <div className="absolute inset-0 flex items-center justify-center bg-rose-600/30 rounded-3xl animate-ping" />
          )}
        </div>

        {/* Enemy Name & Title */}
        <h3 className="mt-2 text-lg sm:text-xl font-black text-edu-textLight dark:text-edu-textDark">
          {enemy.name}
        </h3>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          &quot;{enemy.title}&quot;
        </p>

        {/* HP Bar */}
        <div className="w-full mt-4 space-y-1">
          <div className="flex justify-between items-center text-xs font-black">
            <span className="text-rose-500 flex items-center gap-1">
              ❤️ HP Musuh
            </span>
            <span className="text-slate-600 dark:text-slate-300">
              {Math.max(0, currentHp)} / {enemy.maxHp}
            </span>
          </div>
          <ProgressBar current={currentHp} max={enemy.maxHp} color="red" height="h-3.5" />
        </div>

        {/* Enemy Stats pill */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark w-full text-xs text-slate-600 dark:text-slate-300 font-bold">
          <span className="flex items-center gap-1">
            <Swords className="h-3.5 w-3.5 text-rose-500" /> Atk: {enemy.attack}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-blue-500" /> Def: {enemy.defense}
          </span>
          <span className="text-amber-500">
            🪙 +{enemy.goldReward} Emas
          </span>
        </div>
      </div>
    </div>
  );
}
