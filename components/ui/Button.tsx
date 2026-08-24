import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-edu-accentLight dark:bg-edu-accentDark text-white dark:text-edu-bgDark hover:brightness-110 shadow-md hover:shadow-lg focus:ring-edu-accentLight dark:focus:ring-edu-accentDark',
      secondary:
        'bg-slate-200 dark:bg-edu-borderDark text-edu-textLight dark:text-edu-textDark hover:bg-slate-300 dark:hover:bg-slate-700 focus:ring-slate-400',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 shadow-md hover:shadow-lg focus:ring-rose-500',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg focus:ring-emerald-500',
      outline:
        'border-2 border-edu-borderLight dark:border-edu-borderDark text-edu-textLight dark:text-edu-textDark hover:bg-slate-100 dark:hover:bg-edu-cardDark/50 focus:ring-slate-300',
      ghost:
        'text-edu-textLight dark:text-edu-textDark hover:bg-slate-100 dark:hover:bg-edu-cardDark/50 focus:ring-slate-300',
      gold:
        'bg-amber-500 text-amber-950 font-bold hover:bg-amber-400 shadow-md hover:shadow-amber-500/25 focus:ring-amber-400',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 min-h-[36px] gap-1.5',
      md: 'text-sm px-4 py-2 min-h-[44px] gap-2',
      lg: 'text-base px-6 py-3 min-h-[48px] gap-2.5 font-semibold',
      icon: 'h-11 w-11 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Memproses...</span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
