import * as React from 'react';
import { cn } from '@/lib/utils';

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5', className)}
      {...props}
    >
      {children}
    </label>
  );
}
