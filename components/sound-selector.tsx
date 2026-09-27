'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Volume2 } from 'lucide-react'
import { SOUND_OPTIONS, type SoundId } from '@/lib/metronome-sounds'
import { cn } from '@/lib/utils'

export function SoundSelector({
  value,
  onChange,
}: {
  value: SoundId
  onChange: (id: SoundId) => void
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeLabel = SOUND_OPTIONS.find((o) => o.id === value)?.label ?? 'Sonido'

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-left transition-colors hover:border-slate-700"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <Volume2 className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
          Sonido: <span className="text-emerald-300">{activeLabel}</span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-slate-400 transition-transform',
            open && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute bottom-full left-0 right-0 z-40 mb-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-1.5 shadow-2xl"
        >
          {SOUND_OPTIONS.map((opt) => {
            const isActive = opt.id === value
            return (
              <button
                key={opt.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(opt.id)
                  setOpen(false)
                }}
                className={cn(
                  'w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'text-slate-300 hover:bg-slate-800',
                )}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}