import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'danger' | 'warning' | 'purple' | 'gold';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark border-edu-accentLight/30',
    secondary: 'bg-slate-200 dark:bg-edu-borderDark text-slate-700 dark:text-slate-300 border-transparent',
    outline: 'border border-edu-borderLight dark:border-edu-borderDark text-edu-textLight dark:text-edu-textDark',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    danger: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
    gold: 'bg-amber-400/20 text-amber-500 font-bold border-amber-400/40',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
