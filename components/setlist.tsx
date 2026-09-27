'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight, Music } from 'lucide-react'
import type { Song } from '@/lib/songs'
import { cn } from '@/lib/utils'

interface SetlistProps {
  songs: Song[]
  activeSongId: string
  onSelect: (song: Song) => void
  onPrev: () => void
  onNext: () => void
}

export function Setlist({ songs, activeSongId, onSelect, onPrev, onNext }: SetlistProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const activeSong = songs.find((s) => s.id === activeSongId) ?? songs[0]
  const activeIndex = songs.findIndex((s) => s.id === activeSongId)

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
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={songs.length < 2}
          aria-label="Previous song"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:border-slate-700 hover:text-white disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-left transition-colors hover:border-slate-700"
        >
          <span className="flex items-center gap-2 overflow-hidden">
            <Music className="h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
            <span className="flex flex-col overflow-hidden">
              <span className="truncate text-base font-bold text-white">
                {activeSong?.title ?? 'Select a song'}
              </span>
              {activeSong && (
                <span className="truncate text-xs text-slate-500">
                  {activeIndex + 1}/{songs.length} · {activeSong.artist} · {activeSong.bpm} BPM
                </span>
              )}
            </span>
          </span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-slate-400 transition-transform',
              open && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={songs.length < 2}
          aria-label="Next song"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 transition-colors hover:border-slate-700 hover:text-white disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl"
        >
          {songs.map((song) => {
            const isActive = song.id === activeSongId
            return (
              <button
                key={song.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onSelect(song)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full flex-col items-start gap-0.5 rounded-xl px-4 py-2.5 text-left transition-colors',
                  isActive
                    ? 'bg-emerald-400/10 text-emerald-300'
                    : 'text-slate-200 hover:bg-slate-800',
                )}
              >
                <span className="text-base font-bold">{song.title}</span>
                <span className="text-sm text-slate-500">
                  {song.artist} · {song.bpm} BPM · {song.timeSignature}/4
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}