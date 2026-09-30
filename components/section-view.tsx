'use client'

import type { Section } from '@/lib/songs'
import { cn } from '@/lib/utils'

// Se expande la altura para aprovechar el espacio ganado al quitar "Up Next"
const LYRICS_BOX_HEIGHT = 'min-h-[320px] sm:min-h-[400px]'

function lyricsFontClass(lyrics: string): string {
  const length = lyrics.length
  if (length <= 60) return 'text-4xl sm:text-6xl leading-snug'
  if (length <= 120) return 'text-3xl sm:text-5xl leading-snug'
  if (length <= 200) return 'text-2xl sm:text-4xl leading-normal'
  return 'text-xl sm:text-3xl leading-normal'
}

function MiniBeatIndicator({
  beatsPerMeasure,
  activeBeat,
  isPlaying,
}: {
  beatsPerMeasure: number
  activeBeat: number
  isPlaying: boolean
}) {
  return (
    <div
      className="flex items-center gap-1"
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
              'h-1.5 w-1.5 rounded-full transition-all duration-75',
              isActive
                ? isDownbeat
                  ? 'scale-125 bg-emerald-300'
                  : 'scale-110 bg-yellow-300'
                : 'bg-slate-700',
            )}
          />
        )
      })}
    </div>
  )
}

function firstLyricLine(lyrics?: string): string {
  if (!lyrics) return ''
  const firstLine = lyrics.split('\n').find((l) => l.trim().length > 0)
  return firstLine ?? ''
}

export function ActiveSection({
  section,
  nextSection,
  measureInSection,
  isPlaying,
  beatsPerMeasure,
  activeBeat,
}: {
  section: Section
  nextSection?: Section | null
  measureInSection: number
  isPlaying: boolean
  beatsPerMeasure: number
  activeBeat: number
}) {
  const progress = isPlaying
    ? Math.min((measureInSection / section.measuresCount) * 100, 100)
    : 0

  const upcomingLine = firstLyricLine(nextSection?.lyrics)
  const upcomingChords = nextSection?.chords

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10 flex flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-emerald-300 sm:text-base">
            {section.name}
          </span>
          <div className="flex items-center gap-2.5">
            <MiniBeatIndicator
              beatsPerMeasure={beatsPerMeasure}
              activeBeat={activeBeat}
              isPlaying={isPlaying}
            />
            <span className="font-mono text-sm text-slate-400 sm:text-base">
              Measure {isPlaying ? measureInSection : 0} / {section.measuresCount}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Acordes de la sección actual */}
        <pre className="mb-6 overflow-x-auto whitespace-pre-wrap font-mono text-2xl font-bold leading-relaxed text-yellow-300 sm:text-4xl">
          {section.chords}
        </pre>

        {/* Letra actual */}
        <div className={cn(LYRICS_BOX_HEIGHT, 'flex flex-col justify-between py-2')}>
          <p
            className={cn(
              'w-full whitespace-pre-wrap font-semibold text-white transition-all duration-300',
              lyricsFontClass(section.lyrics),
            )}
          >
            {section.lyrics}
          </p>

          {/* Vista previa transparente de la siguiente sección (Acordes + Letra) */}
          {(upcomingChords || upcomingLine) && (
            <div className="pt-6 transition-opacity duration-300 select-none border-t border-slate-800/40 mt-4">
              {upcomingChords && (
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-lg font-bold text-yellow-300/50 sm:text-2xl mb-1">
                  {upcomingChords}
                </pre>
              )}
              {upcomingLine && (
                <p className="w-full truncate font-semibold text-white/50 text-lg sm:text-2xl">
                  {upcomingLine} 
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}