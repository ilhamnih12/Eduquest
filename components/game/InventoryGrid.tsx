'use client';

import * as React from 'react';
import { useGameStore } from '@/store/gameStore';
import { getItemById } from '@/lib/game/item-database';
import { Item, InventoryItem } from '@/types/game';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatGold } from '@/lib/utils';
import {
  Backpack,
  Shield,
  Swords,
  Heart,
  Sparkles,
  Zap,
  Check,
  Trash2,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';

export function InventoryGrid() {
  const {
    gameState,
    equipItem,
    unequipItem,
    useItemFromInventory,
    sellItem,
    healCharacterAtClinic,
  } = useGameStore();

  const [selectedItem, setSelectedItem] = React.useState<Item | null>(null);
  const [selectedInvItem, setSelectedInvItem] = React.useState<InventoryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const character = gameState.character;
  const inventory = gameState.inventory;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSlotClick = (invItem: InventoryItem) => {
    const it = getItemById(invItem.itemId);
    if (!it) return;
    setSelectedItem(it);
    setSelectedInvItem(invItem);
    setIsModalOpen(true);
  };

  const handleEquip = (itemId: string) => {
    equipItem(itemId);
    setIsModalOpen(false);
    showToast('Perlengkapan berhasil dipasang!');
  };

  const handleUnequip = (slot: 'weapon' | 'armor') => {
    unequipItem(slot);
    setIsModalOpen(false);
    showToast('Perlengkapan berhasil dilepas.');
  };

  const handleUsePotion = (itemId: string) => {
    const ok = useItemFromInventory(itemId);
    if (ok) {
      showToast('Ramuan berhasil diminum, HP karakter pulih!');
      setIsModalOpen(false);
    } else {
      showToast('Kesehatan karaktermu sudah maksimal.');
    }
  };

  const handleSell = (itemId: string) => {
    const res = sellItem(itemId, 1);
    showToast(res.message);
    setIsModalOpen(false);
  };

  const handleHealClinic = () => {
    const res = healCharacterAtClinic();
    showToast(res.message);
  };

  // Find equipped items
  const equippedWeapon = character.equippedWeaponId ? getItemById(character.equippedWeaponId) : null;
  const equippedArmor = character.equippedArmorId ? getItemById(character.equippedArmorId) : null;

  // 20 slot array
  const totalSlots = 20;
  const slots = Array.from({ length: totalSlots }, (_, idx) => inventory[idx] || null);

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

  const getRarityBorder = (rarity?: Item['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return 'border-amber-400/80 ring-1 ring-amber-400/50 bg-amber-500/5';
      case 'epic':
        return 'border-purple-500/80 ring-1 ring-purple-500/50 bg-purple-500/5';
      case 'rare':
        return 'border-blue-500/80 ring-1 ring-blue-500/50 bg-blue-500/5';
      case 'uncommon':
        return 'border-emerald-500/80 ring-1 ring-emerald-500/50 bg-emerald-500/5';
      default:
        return 'border-edu-borderLight dark:border-edu-borderDark';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-edu-cardDark border border-edu-accentDark text-edu-textDark shadow-2xl text-xs font-bold animate-in slide-in-from-bottom-5">
          ✨ {toastMessage}
        </div>
      )}

      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-edu-accentLight/15 dark:bg-edu-accentDark/20 text-edu-accentLight dark:text-edu-accentDark text-2xl shadow-inner">
            🎒
          </div>
          <div>
            <h1 className="text-xl font-black text-edu-textLight dark:text-edu-textDark">
              Tas & Perlengkapan Karakter
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kelola senjata, jubah zirah, dan ramuan pendukung pertempuran.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Quick Clinic Heal */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleHealClinic}
            className="text-xs font-bold w-full sm:w-auto border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
          >
            <Heart className="h-4 w-4 mr-1 fill-emerald-500" />
            Istirahat di UKS (15 Emas)
          </Button>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-edu-bgDark border border-edu-borderLight dark:border-edu-borderDark text-xs font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
            Kapasitas: {inventory.length} / 20 Slot
          </div>
        </div>
      </div>

      {/* Equipped Gear Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weapon Slot */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 text-2xl border border-blue-500/20">
              🗡️
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Senjata Terpasang</p>
              <h4 className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                {equippedWeapon ? equippedWeapon.name : 'Tangan Kosong'}
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                {equippedWeapon ? `+${equippedWeapon.stats?.attackBonus} Serangan, +${equippedWeapon.stats?.critRateBonus}% Kritis` : 'Tidak ada bonus'}
              </p>
            </div>
          </div>
          {equippedWeapon && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUnequip('weapon')}
              className="text-xs font-bold"
            >
              Lepas
            </Button>
          )}
        </div>

        {/* Armor Slot */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 text-2xl border border-emerald-500/20">
              🛡️
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Zirah Pelindung Terpasang</p>
              <h4 className="text-sm font-black text-edu-textLight dark:text-edu-textDark">
                {equippedArmor ? equippedArmor.name : 'Pakaian Biasa'}
              </h4>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                {equippedArmor ? `+${equippedArmor.stats?.defenseBonus} Pertahanan, +${equippedArmor.stats?.maxHpBonus} Max HP` : 'Tidak ada bonus'}
              </p>
            </div>
          </div>
          {equippedArmor && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUnequip('armor')}
              className="text-xs font-bold"
            >
              Lepas
            </Button>
          )}
        </div>
      </div>

      {/* 20-Slot Inventory Grid */}
      <div className="rounded-3xl border border-edu-borderLight dark:border-edu-borderDark bg-edu-cardLight dark:bg-edu-cardDark p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Slot Barang Penyimpanan (20 Slot)
          </h3>
          <span className="text-xs text-slate-400">Klik barang untuk opsi aksi</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {slots.map((invItem, idx) => {
            if (!invItem) {
              return (
                <div
                  key={idx}
                  className="h-24 rounded-2xl border-2 border-dashed border-edu-borderLight dark:border-edu-borderDark/40 flex items-center justify-center text-slate-300 dark:text-slate-600 text-xs font-bold select-none"
                >
                  Kosong
                </div>
              );
            }

            const it = getItemById(invItem.itemId);
            if (!it) return null;

            return (
              <div
                key={idx}
                onClick={() => handleSlotClick(invItem)}
                className={`relative h-24 rounded-2xl border p-2.5 flex flex-col items-center justify-between cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md bg-white dark:bg-edu-bgDark ${getRarityBorder(
                  it.rarity
                )}`}
              >
                {/* Equipped marker */}
                {invItem.equipped && (
                  <div className="absolute -top-2 -right-2 flex h-5 px-1.5 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] font-black shadow-md">
                    TERPASANG
                  </div>
                )}

                {/* Stack count */}
                {invItem.quantity > 1 && (
                  <div className="absolute top-1.5 left-1.5 flex h-4 px-1 items-center justify-center rounded-md bg-slate-200 dark:bg-edu-borderDark text-slate-700 dark:text-slate-300 text-[10px] font-black">
                    x{invItem.quantity}
                  </div>
                )}

                <div className="text-2xl mt-1 select-none">
                  {it.category === 'weapon'
                    ? '🗡️'
                    : it.category === 'armor'
                    ? '🛡️'
                    : it.category === 'consumable'
                    ? '🧪'
                    : it.id === 'scroll_hint'
                    ? '📜'
                    : '✨'}
                </div>

                <div className="text-center w-full">
                  <p className="text-[11px] font-bold truncate text-edu-textLight dark:text-edu-textDark">
                    {it.name}
                  </p>
                  <p className="text-[9px] text-slate-400 capitalize truncate">
                    {it.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Action Modal */}
      {selectedItem && selectedInvItem && (
        <Dialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={
            <div className="flex items-center gap-2">
              <span>{selectedItem.name}</span>
              {getRarityBadge(selectedItem.rarity)}
            </div>
          }
          maxWidth="sm"
        >
          <div className="space-y-4 pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedItem.description}
            </p>

            {/* Stats Breakdown */}
            {selectedItem.stats && (
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-edu-bgDark border border-edu-borderLight dark:border-edu-borderDark space-y-1 text-xs font-semibold">
                {selectedItem.stats.healAmount && (
                  <p className="text-emerald-600 dark:text-emerald-400">
                    💚 Memulihkan +{selectedItem.stats.healAmount} HP
                  </p>
                )}
                {selectedItem.stats.attackBonus && (
                  <p className="text-blue-600 dark:text-blue-400">
                    ⚔️ Serangan +{selectedItem.stats.attackBonus}
                  </p>
                )}
                {selectedItem.stats.defenseBonus && (
                  <p className="text-emerald-600 dark:text-emerald-400">
                    🛡️ Pertahanan +{selectedItem.stats.defenseBonus}
                  </p>
                )}
                {selectedItem.stats.maxHpBonus && (
                  <p className="text-rose-600 dark:text-rose-400">
                    ❤️ Tambahan Max HP +{selectedItem.stats.maxHpBonus}
                  </p>
                )}
                {selectedItem.stats.critRateBonus && (
                  <p className="text-purple-600 dark:text-purple-400">
                    ⚡ Peluang Kritis +{selectedItem.stats.critRateBonus}%
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Jumlah Dimiliki: {selectedInvItem.quantity} buah</span>
              <span className="text-amber-500">Harga Jual: {selectedItem.sellPrice} Emas</span>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-edu-borderLight dark:border-edu-borderDark flex flex-col gap-2">
              {selectedItem.category === 'consumable' && (
                <Button
                  size="md"
                  variant="success"
                  onClick={() => handleUsePotion(selectedItem.id)}
                  className="w-full font-bold"
                >
                  <Heart className="h-4 w-4 mr-1.5" />
                  Gunakan Ramuan Sekarang
                </Button>
              )}

              {(selectedItem.category === 'weapon' || selectedItem.category === 'armor') && (
                <>
                  {selectedInvItem.equipped ? (
                    <Button
                      size="md"
                      variant="outline"
                      onClick={() => handleUnequip(selectedItem.category as 'weapon' | 'armor')}
                      className="w-full font-bold"
                    >
                      Lepas Perlengkapan
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      variant="primary"
                      onClick={() => handleEquip(selectedItem.id)}
                      className="w-full font-bold"
                    >
                      <Check className="h-4 w-4 mr-1.5" />
                      Pasang Perlengkapan
                    </Button>
                  )}
                </>
              )}

              <Button
                size="md"
                variant="outline"
                onClick={() => handleSell(selectedItem.id)}
                className="w-full font-bold border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
              >
                <Trash2 className="h-4 w-4 mr-1.5" />
                Jual 1x ({selectedItem.sellPrice} Emas)
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
