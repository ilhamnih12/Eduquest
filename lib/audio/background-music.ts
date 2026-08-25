/** Shared preference for both game effects and background music. */
export const AUDIO_PREFERENCE_KEY = 'eduquest-audio-enabled';

export interface CalmBgmVariation {
  id: string;
  name: string;
  tempo: number;
  chords: readonly (readonly number[])[];
  melody: readonly number[];
}

/**
 * Three original procedural arrangements. They are synthesized by Web Audio,
 * so Eduquest stays lightweight, works offline, and needs no licensed files.
 */
export const CALM_BGM_VARIATIONS: readonly CalmBgmVariation[] = [
  {
    id: 'embun-pagi',
    name: 'Embun Pagi',
    tempo: 60,
    chords: [
      [261.63, 329.63, 392.0],
      [220.0, 261.63, 329.63],
      [174.61, 220.0, 261.63],
      [196.0, 246.94, 293.66],
    ],
    melody: [523.25, 493.88, 440.0, 392.0, 440.0, 493.88, 392.0, 329.63],
  },
  {
    id: 'langit-senja',
    name: 'Langit Senja',
    tempo: 56,
    chords: [
      [293.66, 369.99, 440.0],
      [246.94, 293.66, 369.99],
      [196.0, 246.94, 293.66],
      [220.0, 277.18, 329.63],
    ],
    melody: [587.33, 440.0, 493.88, 369.99, 440.0, 329.63, 369.99, 293.66],
  },
  {
    id: 'danau-tenang',
    name: 'Danau Tenang',
    tempo: 64,
    chords: [
      [220.0, 277.18, 329.63],
      [174.61, 220.0, 261.63],
      [261.63, 329.63, 392.0],
      [196.0, 246.94, 329.63],
    ],
    melody: [440.0, 523.25, 493.88, 392.0, 329.63, 392.0, 440.0, 329.63],
  },
] as const;

export function getAudioPreference(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.localStorage.getItem(AUDIO_PREFERENCE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function saveAudioPreference(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(AUDIO_PREFERENCE_KEY, String(enabled));
  } catch {
    // Audio still works for this session when storage is blocked.
  }
}

/**
 * Creates one shuffle bag. `previousIndex` is moved away from the first slot so
 * a track never immediately repeats when a new three-track cycle starts.
 */
export function createShuffledTrackOrder(
  trackCount: number,
  previousIndex: number | null,
  random: () => number = Math.random
): number[] {
  const order = Array.from({ length: trackCount }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  if (order.length > 1 && previousIndex !== null && order[0] === previousIndex) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}

class BackgroundMusicManager {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private playing = false;
  private starting = false;
  private nextTrackTimer: number | null = null;
  private order: number[] = [];
  private lastTrackIndex: number | null = null;
  private activeSources = new Set<AudioScheduledSourceNode>();

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) this.ctx = new AudioContextClass();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public getCurrentTrackName(): string | null {
    return this.lastTrackIndex === null ? null : CALM_BGM_VARIATIONS[this.lastTrackIndex]?.name ?? null;
  }

  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (enabled) {
      void this.start();
    } else {
      this.stop();
    }
  }

  /** Must be triggered by a click/key event at least once due to autoplay rules. */
  public async start(): Promise<void> {
    if (!this.enabled || this.playing || this.starting) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.starting = true;
    try {
      if (ctx.state === 'suspended') await ctx.resume();
      if (!this.enabled || this.playing) return;
      this.playing = true;
      this.scheduleNextTrack();
    } catch {
      // Browsers may reject resume() until a later user gesture. The global
      // unlock listeners will try again on the next interaction.
    } finally {
      this.starting = false;
    }
  }

  public stop(): void {
    this.playing = false;
    if (this.nextTrackTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.nextTrackTimer);
      this.nextTrackTimer = null;
    }
    this.activeSources.forEach((source) => {
      try {
        source.stop();
      } catch {
        // The source may have ended naturally.
      }
    });
    this.activeSources.clear();
  }

  private takeNextTrackIndex(): number {
    if (this.order.length === 0) {
      this.order = createShuffledTrackOrder(
        CALM_BGM_VARIATIONS.length,
        this.lastTrackIndex
      );
    }
    return this.order.shift() ?? 0;
  }

  private trackSource(source: AudioScheduledSourceNode): void {
    this.activeSources.add(source);
    source.addEventListener('ended', () => this.activeSources.delete(source), { once: true });
  }

  private scheduleNextTrack(): void {
    const ctx = this.getContext();
    if (!ctx || !this.playing || !this.enabled) return;

    const trackIndex = this.takeNextTrackIndex();
    const track = CALM_BGM_VARIATIONS[trackIndex];
    this.lastTrackIndex = trackIndex;

    // Eight calm phrases, with a short overlap for a seamless crossfade.
    const beatSeconds = 60 / track.tempo;
    const phraseSeconds = beatSeconds * 4;
    const duration = phraseSeconds * 8;
    const startsAt = ctx.currentTime + 0.05;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, startsAt);
    master.gain.exponentialRampToValueAtTime(0.042, startsAt + 1.8);
    master.gain.setValueAtTime(0.042, startsAt + duration - 1.8);
    master.gain.exponentialRampToValueAtTime(0.0001, startsAt + duration);
    master.connect(ctx.destination);

    for (let phrase = 0; phrase < 8; phrase += 1) {
      const chord = track.chords[phrase % track.chords.length];
      const phraseStart = startsAt + phrase * phraseSeconds;

      chord.forEach((frequency, noteIndex) => {
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = noteIndex === 0 ? 'sine' : 'triangle';
        oscillator.frequency.setValueAtTime(frequency / 2, phraseStart);
        oscillator.detune.setValueAtTime((noteIndex - 1) * 3, phraseStart);
        gain.gain.setValueAtTime(0.0001, phraseStart);
        gain.gain.exponentialRampToValueAtTime(noteIndex === 0 ? 0.34 : 0.2, phraseStart + 1.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, phraseStart + phraseSeconds + 0.3);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start(phraseStart);
        oscillator.stop(phraseStart + phraseSeconds + 0.35);
        this.trackSource(oscillator);
      });

      const melodyFrequency = track.melody[phrase % track.melody.length];
      const melodyStart = phraseStart + beatSeconds;
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(melodyFrequency, melodyStart);
      bellGain.gain.setValueAtTime(0.0001, melodyStart);
      bellGain.gain.exponentialRampToValueAtTime(0.11, melodyStart + 0.08);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, melodyStart + beatSeconds * 1.6);
      bell.connect(bellGain);
      bellGain.connect(master);
      bell.start(melodyStart);
      bell.stop(melodyStart + beatSeconds * 1.7);
      this.trackSource(bell);
    }

    if (typeof window !== 'undefined') {
      this.nextTrackTimer = window.setTimeout(() => {
        this.scheduleNextTrack();
        // Keep the previous master connected briefly so both arrangements
        // crossfade instead of leaving a gap between tracks.
        window.setTimeout(() => master.disconnect(), 1000);
      }, Math.max(1000, (duration - 0.35) * 1000));
    }
  }
}

export const backgroundMusicManager = new BackgroundMusicManager();
