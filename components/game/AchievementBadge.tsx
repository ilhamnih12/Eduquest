'use client';

import * as React from 'react';
import { useGameStore } from '@/store/gameStore';
import { Achievement } from '@/types/game';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from './ProgressBar';
import { Tabs } from '@/components/ui/Tabs';
import { formatGold } from '@/lib/utils';
import {
  Trophy,
  Swords,
  Coins,
  Zap,
  Sparkles,
  Lock,
  CheckCircle2,
  Award,
  BookOpen,
} from 'lucide-react';

export function AchievementBadge() {
  const { gameState } = useGameStore();
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const achievements = gameState.achievements;

  const filtered = achievements.filter((ach) => {
    if (activeCategory === 'all') return true;
    return ach.category === activeCategory;
  });

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  const tabs = [
    { id: 'all', label: 'Semua Prestasi', icon: '🏆' },
    { id: 'battle', label: 'Pertempuran', icon: '⚔️' },
    { id: 'study', label: 'Akademik', icon: '📚' },
    { id: 'level', label: 'Level Karakter', icon: '🎖️' },
    { id: 'wealth', label: 'Tabungan Emas', icon: '🪙' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Overview Progress Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500 text-2xl shadow-inner">
            🏆
          </div>
          <div>
            <h1 className="text-xl font-black text-edu-textLight dark:text-edu-textDark">
              Daftar Prestasi & Gelar Petualang
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selesaikan misi edukasi untuk membuka hadiah Emas dan EXP tambahan.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-56 space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-400">Pencapaian Terbuka</span>
            <span className="text-amber-500 font-black">
              {unlockedCount} / {totalCount} ({percentage}%)
            </span>
          </div>
          <ProgressBar current={unlockedCount} max={totalCount} color="yellow" height="h-2.5" showNumeric={false} />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((ach) => {
          const isCompleted = ach.unlocked;

          return (
            <div
              key={ach.id}
              className={`flex flex-col justify-between p-5 rounded-3xl border transition-all duration-200 shadow-sm ${
                isCompleted
                  ? 'border-amber-400/60 bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 dark:from-amber-500/10 dark:via-edu-cardDark dark:to-amber-500/5 shadow-md'
                  : 'border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl border ${
                        isCompleted
                          ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 shadow-inner'
                          : 'bg-slate-100 dark:bg-edu-bgDark text-slate-400 border-edu-borderLight dark:border-edu-borderDark'
                      }`}
                    >
                      {isCompleted ? '🎖️' : '🔒'}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                        {ach.title}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-semibold capitalize">
                        Kategori: {ach.category}
                      </span>
                    </div>
                  </div>

                  {isCompleted ? (
                    <Badge variant="gold" className="text-[10px]">
                      TERBUKA
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">
                      TERKUNCI
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {ach.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-500">
                    <span>Progres:</span>
                    <span>
                      {ach.currentProgress} / {ach.requirement}
                    </span>
                  </div>
                  <ProgressBar
                    current={ach.currentProgress}
                    max={ach.requirement}
                    color={isCompleted ? 'yellow' : 'blue'}
                    height="h-2"
                    showNumeric={false}
                  />
                </div>
              </div>

              {/* Rewards footer */}
              <div className="mt-4 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark flex items-center justify-between text-xs font-black">
                <span className="text-amber-500 flex items-center gap-1">
                  🪙 +{formatGold(ach.rewardGold)} Emas
                </span>
                <span className="text-blue-500 flex items-center gap-1">
                  ⚡ +{ach.rewardExp} EXP
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
