'use client';

import * as React from 'react';
import confetti from 'canvas-confetti';
import { BattleRewards, Enemy } from '@/types/game';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Trophy, Coins, Zap, Package, ArrowRight, RotateCcw, Swords } from 'lucide-react';
import { formatGold } from '@/lib/utils';
import Link from 'next/link';

interface RewardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isVictory: boolean;
  enemy: Enemy | null;
  rewards: BattleRewards | null;
  onPlayAgain: () => void;
}

export function RewardsModal({
  isOpen,
  onClose,
  isVictory,
  enemy,
  rewards,
  onPlayAgain,
}: RewardsModalProps) {
  React.useEffect(() => {
    if (isOpen && isVictory) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore in environments without canvas support
      }
    }
  }, [isOpen, isVictory]);

  if (!isOpen || !enemy) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="text-center space-y-5 p-2">
        {/* Banner Icon */}
        <div className="flex justify-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-3xl text-4xl shadow-xl border-2 ${
              isVictory
                ? 'bg-gradient-to-tr from-amber-400 to-yellow-200 border-amber-300 animate-bounce-subtle'
                : 'bg-gradient-to-tr from-slate-700 to-slate-900 border-slate-600 text-slate-400'
            }`}
          >
            {isVictory ? '🏆' : '💀'}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-2xl font-black text-edu-textLight dark:text-edu-textDark">
            {isVictory ? 'Kemenangan Gemilang!' : 'Pertempuran Terhenti'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isVictory
              ? `Kamu berhasil menaklukkan ${enemy.name} dengan kecerdasanmu!`
              : `HP karaktermu habis. Pelajari kembali materi soal dan bangkitlah lebih kuat!`}
          </p>
        </div>

        {/* Level Up Banner */}
        {isVictory && rewards?.leveledUp && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-500/20 border-2 border-amber-500/40 text-amber-900 dark:text-amber-200 animate-pulse">
            <div className="flex items-center justify-center gap-2 font-black text-sm">
              <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>SELAMAT! NAIK KE LEVEL {rewards.newLevel}! 🎉</span>
            </div>
            <p className="text-xs mt-0.5 opacity-90">
              Dapatkan +3 Poin Atribut untuk memperkuat karaktermu di menu Rapor!
            </p>
          </div>
        )}

        {/* Rewards Breakdown */}
        {isVictory && rewards && (
          <div className="rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-slate-50 dark:bg-edu-bgDark p-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Hadiah & Hasil Pertempuran
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {/* EXP */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white font-bold text-xs">
                  EXP
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Pengalaman</p>
                  <p className="text-sm font-black text-blue-600 dark:text-blue-400">
                    +{rewards.expGained} EXP
                  </p>
                </div>
              </div>

              {/* Gold */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-amber-950 font-bold text-xs">
                  <Coins className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Keping Emas</p>
                  <p className="text-sm font-black text-amber-600 dark:text-amber-400">
                    +{formatGold(rewards.goldGained)} Emas
                  </p>
                </div>
              </div>
            </div>

            {/* Dropped Items */}
            {rewards.droppedItems.length > 0 && (
              <div className="pt-2 border-t border-edu-borderLight dark:border-edu-borderDark">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-center gap-1">
                  <Package className="h-3.5 w-3.5" /> Item Rampasan (Loot Drop)
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {rewards.droppedItems.map((drop, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-700 dark:text-purple-300"
                    >
                      <span>🎁</span>
                      <span>{drop.item.name}</span>
                      <span className="text-[10px] opacity-75">x{drop.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Button
            size="md"
            variant="outline"
            onClick={onPlayAgain}
            className="w-full sm:w-auto font-bold"
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Tantang Lagi
          </Button>
          <Button
            size="md"
            variant="primary"
            onClick={onClose}
            className="w-full sm:w-auto font-bold"
          >
            Kembali ke Beranda
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
