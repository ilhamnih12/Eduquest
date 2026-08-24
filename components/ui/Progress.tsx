import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: 'primary' | 'hp' | 'exp' | 'enemyHp' | 'gold';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Progress({
  value,
  max = 100,
  variant = 'primary',
  showLabel = false,
  label,
  size = 'md',
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / (max || 1)) * 100));

  const variants = {
    primary: 'bg-edu-accentLight dark:bg-edu-accentDark',
    hp: 'bg-gradient-to-r from-emerald-500 to-green-400',
    enemyHp: 'bg-gradient-to-r from-rose-600 to-red-500',
    exp: 'bg-gradient-to-r from-blue-500 to-indigo-400',
    gold: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  };

  const sizes = {
    sm: 'h-2',
    md: 'h-3.5',
    lg: 'h-5',
  };

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-edu-textLight dark:text-edu-textDark">
          <span>{label || 'Progress'}</span>
          <span>
            {value} / {max} ({Math.round(percentage)}%)
          </span>
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-slate-200 dark:bg-edu-borderDark/60 p-0.5 shadow-inner',
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
