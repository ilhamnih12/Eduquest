'use client';

import * as React from 'react';
import { InventoryGrid } from '@/components/game/InventoryGrid';
import { Sidebar } from '@/components/layout/Sidebar';
import { useGameStore } from '@/store/gameStore';

export default function InventoryPage() {
  const { isInitialized, initGame } = useGameStore();

  React.useEffect(() => {
    if (!isInitialized) {
      initGame();
    }
  }, [isInitialized, initGame]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <Sidebar />
      <div className="flex-1 w-full min-w-0">
        <InventoryGrid />
      </div>
    </div>
  );
}
