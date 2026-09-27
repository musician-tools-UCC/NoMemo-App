import type * as ToneType from 'tone'

export type SoundId = 'classic' | 'beep' | 'wood' | 'hihat'

export const SOUND_OPTIONS: { id: SoundId; label: string }[] = [
  { id: 'classic', label: 'Clásico' },
  { id: 'beep', label: 'Beep electrónico' },
  { id: 'wood', label: 'Wood block' },
  { id: 'hihat', label: 'Hi-hat' },
]

export interface ClickEngine {
  trigger: (time: number, isAccent: boolean) => void
  dispose: () => void
}

export function createClickEngine(
  Tone: typeof ToneType,
  soundId: SoundId,
  destination: ToneType.ToneAudioNode,
): ClickEngine {
  switch (soundId) {
    case 'beep': {
      const synth = new Tone.Synth({
        oscillator: { type: 'square' },
        envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.02 },
      }).connect(destination)
      return {
        trigger: (time, accent) =>
          synth.triggerAttackRelease(accent ? 'A5' : 'A4', '32n', time),
        dispose: () => synth.dispose(),
      }
    }

    case 'wood': {
      const synth = new Tone.MetalSynth({
        envelope: { attack: 0.001, decay: 0.08, release: 0.01 },
        harmonicity: 3.1,
        modulationIndex: 16,
        resonance: 2000,
        octaves: 0.5,
      }).connect(destination)
      return {
        trigger: (time, accent) => {
          synth.frequency.value = accent ? 500 : 350
          synth.triggerAttackRelease('16n', time)
        },
        dispose: () => synth.dispose(),
      }
    }

    case 'hihat': {
      const synth = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.001, decay: 0.04, sustain: 0 },
      }).connect(destination)
      return {
        trigger: (time, accent) => {
          synth.envelope.decay = accent ? 0.09 : 0.04
          synth.triggerAttackRelease(accent ? '16n' : '32n', time)
        },
        dispose: () => synth.dispose(),
      }
    }

    case 'classic':
    default: {
      const synth = new Tone.MembraneSynth({
        pitchDecay: 0.008,
        octaves: 2,
        envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.05 },
      }).connect(destination)
      return {
        trigger: (time, accent) =>
          synth.triggerAttackRelease(accent ? 'C5' : 'C4', '16n', time),
        dispose: () => synth.dispose(),
      }
    }
  }
}