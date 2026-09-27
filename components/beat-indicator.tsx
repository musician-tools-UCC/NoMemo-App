'use client'

import { cn } from '@/lib/utils'

interface BeatIndicatorProps {
  beatsPerMeasure: number
  activeBeat: number
  isPlaying: boolean
}

export function BeatIndicator({
  beatsPerMeasure,
  activeBeat,
  isPlaying,
}: BeatIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-3 sm:gap-4"
      role="img"
      aria-label={`Beat ${activeBeat >= 0 ? activeBeat + 1 : 0} of ${beatsPerMeasure}`}
    >
      {Array.from({ length: beatsPerMeasure }).map((_, i) => {
        const isActive = isPlaying && i === activeBeat
        const isDownbeat = i === 0
        return (
          <span
            key={i}
            className={cn(
              'rounded-full border-2 transition-all duration-75',
              isDownbeat ? 'h-7 w-7 sm:h-9 sm:w-9' : 'h-5 w-5 sm:h-7 sm:w-7',
              isActive
                ? isDownbeat
                  ? 'scale-125 border-emerald-300 bg-emerald-300 shadow-lg shadow-emerald-300/50'
                  : 'scale-110 border-yellow-300 bg-yellow-300 shadow-lg shadow-yellow-300/40'
                : 'border-slate-700 bg-slate-800',
            )}
          />
        )
      })}
    </div>
  )
}
