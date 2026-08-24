'use client';

import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export function ThemeToggle() {
  const { theme, toggleTheme, initTheme } = useThemeStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    initTheme();
    setMounted(true);
  }, [initTheme]);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-edu-borderDark animate-pulse" />;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle tema gelap/terang"
      className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-edu-borderLight dark:border-edu-borderDark bg-white dark:bg-edu-cardDark text-edu-textLight dark:text-edu-textDark shadow-sm hover:bg-slate-100 dark:hover:bg-edu-borderDark transition-all active:scale-95"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform rotate-0 hover:rotate-45 duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-edu-accentLight transition-transform -rotate-12 hover:rotate-0 duration-300" />
      )}
    </button>
  );
}
