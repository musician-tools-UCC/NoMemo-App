'use client'

import { SOUND_OPTIONS, type SoundId } from '@/lib/metronome-sounds'
import { cn } from '@/lib/utils'

export function SoundSelector({
  value,
  onChange,
}: {
  value: SoundId
  onChange: (id: SoundId) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
        Sonido
      </span>
      {SOUND_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors',
            value === opt.id
              ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
              : 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}