import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'purple';
  showNumeric?: boolean;
  className?: string;
  height?: string;
}

export function ProgressBar({
  current,
  max,
  label,
  color = 'green',
  showNumeric = true,
  className,
  height = 'h-3',
}: ProgressBarProps) {
  const safeCurrent = Math.max(0, current);
  const safeMax = Math.max(1, max);
  const percentage = Math.min(100, Math.round((safeCurrent / safeMax) * 100));

  const colorVariants = {
    green: 'bg-gradient-to-r from-emerald-500 to-green-400 shadow-emerald-500/30',
    red: 'bg-gradient-to-r from-rose-600 to-red-400 shadow-rose-500/30',
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-400 shadow-blue-500/30',
    yellow: 'bg-gradient-to-r from-amber-500 to-yellow-300 shadow-amber-500/30',
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-400 shadow-purple-500/30',
  };

  return (
    <div className={cn('w-full space-y-1', className)}>
      {(label || showNumeric) && (
        <div className="flex items-center justify-between text-xs font-bold">
          {label && <span className="text-slate-600 dark:text-slate-300">{label}</span>}
          {showNumeric && (
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">
              {safeCurrent} / {safeMax} ({percentage}%)
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-slate-200 dark:bg-edu-borderDark/60 p-0.5 overflow-hidden shadow-inner', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out shadow-sm', colorVariants[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
