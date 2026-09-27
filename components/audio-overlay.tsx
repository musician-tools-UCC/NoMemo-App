'use client'

import { Volume2 } from 'lucide-react'

export function AudioOverlay({ onEnable }: { onEnable: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-slate-950/95 px-6 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Stage Teleprompter
        </h1>
        <p className="max-w-md text-balance text-slate-400">
          Metronome &amp; lyric prompter for live performance. Tap below to
          unlock audio on your device.
        </p>
      </div>
      <button
        type="button"
        onClick={onEnable}
        className="group flex items-center gap-3 rounded-2xl bg-emerald-400 px-10 py-6 text-xl font-bold text-slate-950 shadow-2xl shadow-emerald-400/20 transition-transform active:scale-95 sm:text-2xl"
      >
        <Volume2 className="h-7 w-7" aria-hidden="true" />
        Tap to Enable Audio
      </button>
      <p className="text-sm text-slate-500">
        Required for iOS / mobile Web Audio playback
      </p>
    </div>
  )
}
