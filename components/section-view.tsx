'use client'

import type { Section } from '@/lib/songs'
import { cn } from '@/lib/utils'

// Altura fija del bloque de letra — nunca cambia entre secciones cortas o largas.
const LYRICS_BOX_HEIGHT = 'h-[280px] sm:h-[340px]'

function lyricsFontClass(lyrics: string): string {
  const length = lyrics.length
  if (length <= 60) return 'text-4xl sm:text-6xl leading-snug'
  if (length <= 120) return 'text-3xl sm:text-5xl leading-snug'
  if (length <= 200) return 'text-2xl sm:text-4xl leading-normal'
  return 'text-xl sm:text-3xl leading-normal'
}

export function ActiveSection({
  section,
  measureInSection,
  isPlaying,
}: {
  section: Section
  measureInSection: number
  isPlaying: boolean
}) {
  const progress = isPlaying
    ? Math.min((measureInSection / section.measuresCount) * 100, 100)
    : 0

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="rounded-full bg-emerald-400/15 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-emerald-300 sm:text-base">
          {section.name}
        </span>
        <span className="font-mono text-sm text-slate-400 sm:text-base">
          Measure {isPlaying ? measureInSection : 0} / {section.measuresCount}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300 transition-all duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Chords */}
      <pre className="mb-6 overflow-x-auto whitespace-pre-wrap font-mono text-2xl font-bold leading-relaxed text-yellow-300 sm:text-4xl">
        {section.chords}
      </pre>

      {/* Lyrics — altura fija, la fuente se adapta al largo del texto */}
      <div className={cn(LYRICS_BOX_HEIGHT, 'flex items-center overflow-hidden')}>
        <p
          className={cn(
            'w-full whitespace-pre-wrap font-semibold text-white',
            lyricsFontClass(section.lyrics),
          )}
        >
          {section.lyrics}
        </p>
      </div>
    </div>
  )
}

function firstLyricLine(lyrics: string): string {
  const firstLine = lyrics.split('\n')[0]?.trim() ?? ''
  return firstLine || '(instrumental)'
}

export function UpcomingSection({ section }: { section: Section | null }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800/70 bg-slate-900/30 p-5',
        !section && 'opacity-60',
      )}
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
        <span>Up Next</span>
      </div>
      {section ? (
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold text-slate-200">
            {section.name}
            <span className="ml-2 font-mono text-sm font-normal text-slate-500">
              {section.measuresCount} bars
            </span>
          </span>
          <span className="truncate font-mono text-sm text-yellow-300/70">
            {section.chords}
          </span>
          <span className="truncate text-base font-medium text-slate-300">
            {firstLyricLine(section.lyrics)}
          </span>
        </div>
      ) : (
        <span className="text-lg font-semibold text-slate-400">
          End of song — loops back to top
        </span>
      )}
    </div>
  )
}