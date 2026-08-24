'use client';

import * as React from 'react';
import { useGameStore } from '@/store/gameStore';
import { getAllShopItems } from '@/lib/game/item-database';
import { Item, ItemCategory } from '@/types/game';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { formatGold } from '@/lib/utils';
import {
  Store,
  Coins,
  Heart,
  Swords,
  Shield,
  Zap,
  Sparkles,
  Check,
  ShoppingCart,
  Plus,
  Minus,
} from 'lucide-react';

export function ShopItemCard() {
  const { gameState, buyItem } = useGameStore();
  const [activeCategory, setActiveCategory] = React.useState<string>('all');
  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [buyQuantity, setBuyQuantity] = React.useState<number>(1);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const character = gameState.character;
  const allItems = getAllShopItems();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredItems = allItems.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'consumable') return item.category === 'consumable';
    if (activeCategory === 'equipment') return item.category === 'weapon' || item.category === 'armor';
    if (activeCategory === 'booster') return item.category === 'booster' || item.category === 'special';
    return true;
  });

  const handleOpenBuy = (item: Item) => {
    setSelectedItem(item);
    setBuyQuantity(1);
    setIsModalOpen(true);
  };

  const handleConfirmBuy = () => {
    if (!selectedItem) return;
    const res = buyItem(selectedItem.id, buyQuantity);
    showToast(res.message);
    if (res.success) {
      setIsModalOpen(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'Semua Item', icon: '📦' },
    { id: 'consumable', label: 'Ramuan HP', icon: '🧪' },
    { id: 'equipment', label: 'Senjata & Zirah', icon: '🗡️' },
    { id: 'booster', label: 'Jimat & Petunjuk', icon: '📜' },
  ];

  const getRarityBadge = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return <Badge variant="gold">LEGENDARIS</Badge>;
      case 'epic':
        return <Badge variant="purple">EPIK</Badge>;
      case 'rare':
        return <Badge variant="default">LANGKA</Badge>;
      case 'uncommon':
        return <Badge variant="success">ISTIMEWA</Badge>;
      default:
        return <Badge variant="secondary">BIASA</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-edu-cardDark border border-edu-accentDark text-edu-textDark shadow-2xl text-xs font-bold animate-in slide-in-from-bottom-5">
          🛒 {toastMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500 text-2xl shadow-inner">
            🏪
          </div>
          <div>
            <h1 className="text-xl font-black text-edu-textLight dark:text-edu-textDark">
              Toko Perlengkapan Petualang
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tukarkan keping emas hasil kemenangan untuk ramuan, senjata, dan jimat sakti!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-black text-sm">
          <Coins className="h-4 w-4 fill-amber-500" />
          <span>Saldo Emas: {formatGold(character.gold)}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />

      {/* Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const canAfford = character.gold >= item.price;

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-5 shadow-sm hover:border-edu-accentLight/60 transition-all hover:scale-[1.01]"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-edu-bgDark text-2xl border border-edu-borderLight dark:border-edu-borderDark flex-shrink-0">
                      {item.category === 'weapon'
                        ? '🗡️'
                        : item.category === 'armor'
                        ? '🛡️'
                        : item.category === 'consumable'
                        ? '🧪'
                        : item.id === 'scroll_hint'
                        ? '📜'
                        : '✨'}
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                        {item.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  {getRarityBadge(item.rarity)}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Stat Pill */}
                {item.stats && (
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
                    {item.stats.healAmount && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        + {item.stats.healAmount} HP
                      </span>
                    )}
                    {item.stats.attackBonus && (
                      <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        + {item.stats.attackBonus} Serangan
                      </span>
                    )}
                    {item.stats.defenseBonus && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        + {item.stats.defenseBonus} Pertahanan
                      </span>
                    )}
                    {item.stats.maxHpBonus && (
                      <span className="px-2 py-0.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        + {item.stats.maxHpBonus} Max HP
                      </span>
                    )}
                    {item.stats.critRateBonus && (
                      <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        + {item.stats.critRateBonus}% Crit
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-edu-borderLight dark:border-edu-borderDark flex items-center justify-between">
                <div className="flex items-center gap-1 font-black text-amber-500 text-sm">
                  <Coins className="h-4 w-4 fill-amber-500" />
                  <span>{formatGold(item.price)} Emas</span>
                </div>

                <Button
                  size="sm"
                  variant={canAfford ? 'primary' : 'outline'}
                  disabled={!canAfford}
                  onClick={() => handleOpenBuy(item)}
                  className="text-xs font-bold"
                >
                  <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                  Beli
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Buy Confirmation Modal */}
      {selectedItem && (
        <Dialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Konfirmasi Pembelian: ${selectedItem.name}`}
          maxWidth="sm"
        >
          <div className="space-y-4 pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {selectedItem.description}
            </p>

            {/* Quantity Selector for stackable items */}
            {selectedItem.maxStack > 1 ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-edu-bgDark">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Jumlah Pembelian:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setBuyQuantity(Math.max(1, buyQuantity - 1))}
                    className="h-8 w-8 rounded-xl bg-white dark:bg-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark flex items-center justify-center font-bold text-sm"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-black text-sm w-6 text-center">{buyQuantity}</span>
                  <button
                    onClick={() =>
                      setBuyQuantity(
                        Math.min(
                          selectedItem.maxStack,
                          Math.floor(character.gold / selectedItem.price) || 1,
                          buyQuantity + 1
                        )
                      )
                    }
                    className="h-8 w-8 rounded-xl bg-white dark:bg-edu-cardDark border border-edu-borderLight dark:border-edu-borderDark flex items-center justify-center font-bold text-sm"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-edu-bgDark text-xs font-semibold text-slate-500">
                Item Perlengkapan (Unik / 1 Unit per pembelian)
              </div>
            )}

            {/* Price Calculation */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5 text-xs font-bold">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Harga Satuan:</span>
                <span>{formatGold(selectedItem.price)} Emas</span>
              </div>
              <div className="flex justify-between text-base font-black text-amber-600 dark:text-amber-400 pt-2 border-t border-amber-500/20">
                <span>Total Pembayaran:</span>
                <span>{formatGold(selectedItem.price * buyQuantity)} Emas</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <Button
                size="md"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="w-1/3 font-bold"
              >
                Batal
              </Button>
              <Button
                size="md"
                variant="gold"
                onClick={handleConfirmBuy}
                disabled={character.gold < selectedItem.price * buyQuantity}
                className="w-2/3 font-black"
              >
                <Check className="h-4 w-4 mr-1" />
                Bayar Sekarang
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
