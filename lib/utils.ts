import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Indonesian Rupiah / Gold format
 */
export function formatGold(amount: number): string {
  return new Intl.NumberFormat('id-ID').format(Math.max(0, Math.floor(amount)));
}

/**
 * Format large numbers with Indonesian locale
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Backward-compatible subject metadata helper. The canonical data now lives
 * in lib/game/subjects.ts.
 */
export { getSubjectMetadata as getSubjectMeta } from '@/lib/game/subjects';

/**
 * Web Audio API synthesizer for instant 8-bit / fantasy RPG sound effects.
 * Requires 0 external assets, works seamlessly offline.
 */
class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  private initCtx() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore audio errors
    }
  }

  public playCorrect() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        const startTime = now + idx * 0.07;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {
      // Ignore
    }
  }

  public playWrong() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [311.13, 293.66, 277.18].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        const startTime = now + idx * 0.1;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } catch {
      // Ignore
    }
  }

  public playAttack() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    } catch {
      // Ignore
    }
  }

  public playHeal() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [400, 500, 600, 750, 900].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const st = now + i * 0.05;
        gain.gain.setValueAtTime(0.12, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(st);
        osc.stop(st + 0.22);
      });
    } catch {
      // Ignore
    }
  }

  public playVictory() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.15 },
        { f: 659.25, d: 0.15 },
        { f: 783.99, d: 0.15 },
        { f: 1046.5, d: 0.4 },
      ];
      let offset = 0;
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = n.f;
        const st = now + offset;
        gain.gain.setValueAtTime(0.2, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + n.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(st);
        osc.stop(st + n.d + 0.05);
        offset += n.d * 0.9;
      });
    } catch {
      // Ignore
    }
  }

  public playLevelUp() {
    if (!this.soundEnabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const scale = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      scale.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const st = now + idx * 0.08;
        gain.gain.setValueAtTime(0.2, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(st);
        osc.stop(st + 0.35);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundManager = new SoundManager();
