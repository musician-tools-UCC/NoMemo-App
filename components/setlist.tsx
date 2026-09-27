'use client'

import { Music } from 'lucide-react'
import type { Song } from '@/lib/songs'
import { cn } from '@/lib/utils'

interface SetlistProps {
  songs: Song[]
  activeSongId: string
  onSelect: (song: Song) => void
}

export function Setlist({ songs, activeSongId, onSelect }: SetlistProps) {
  return (
    <aside className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1 text-sm font-bold uppercase tracking-widest text-slate-500">
        <Music className="h-4 w-4" aria-hidden="true" />
        Setlist
      </div>
      <nav className="flex flex-col gap-2">
        {songs.map((song) => {
          const isActive = song.id === activeSongId
          return (
            <button
              key={song.id}
              type="button"
              onClick={() => onSelect(song)}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'flex flex-col items-start gap-0.5 rounded-xl border px-4 py-3 text-left transition-colors',
                isActive
                  ? 'border-emerald-400/50 bg-emerald-400/10'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900',
              )}
            >
              <span
                className={cn(
                  'text-base font-bold',
                  isActive ? 'text-emerald-300' : 'text-white',
                )}
              >
                {song.title}
              </span>
              <span className="text-sm text-slate-500">
                {song.artist} · {song.bpm} BPM · {song.timeSignature}/4
              </span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
