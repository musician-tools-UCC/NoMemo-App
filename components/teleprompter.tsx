'use client'

import { useState } from 'react'
import { SONGS, type Song } from '@/lib/songs'
import { useMetronome } from '@/lib/use-metronome'
import { AudioOverlay } from './audio-overlay'
import { BeatIndicator } from './beat-indicator'
import { TransportControls } from './transport-controls'
import { ActiveSection, UpcomingSection } from './section-view'
import { Setlist } from './setlist'

export function Teleprompter() {
  const [song, setSong] = useState<Song>(SONGS[0])
  const m = useMetronome(song)

  const activeSection = song.sections[m.sectionIndex]
  const nextSection = song.sections[m.sectionIndex + 1] ?? null

  return (
    <main className="min-h-dvh bg-slate-950 text-white">
      {!m.ready && <AudioOverlay onEnable={m.enableAudio} />}

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6 lg:py-8">
        {/* Sidebar */}
        <div className="lg:w-72 lg:shrink-0">
          <Setlist songs={SONGS} activeSongId={song.id} onSelect={setSong} />
        </div>

        {/* Main stage */}
        <div className="flex flex-1 flex-col gap-6">
          {/* Header: title + beat + tempo */}
          <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                {song.title}
              </h1>
              <p className="text-sm text-slate-400">
                {song.artist} · {song.bpm} BPM · {song.timeSignature}/4
              </p>
            </div>
            <BeatIndicator
              beatsPerMeasure={song.timeSignature}
              activeBeat={m.beatInMeasure}
              isPlaying={m.isPlaying}
            />
          </header>

          {/* Active section */}
          {activeSection && (
            <ActiveSection
              section={activeSection}
              measureInSection={m.measureInSection}
              isPlaying={m.isPlaying}
            />
          )}

          {/* Upcoming preview */}
          <UpcomingSection section={nextSection} />

          {/* Transport */}
          <div className="sticky bottom-0 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur sm:p-6">
            <TransportControls
              isPlaying={m.isPlaying}
              volume={m.volume}
              muted={m.muted}
              onPlay={m.play}
              onPause={m.pause}
              onStop={m.stop}
              onRestart={m.restart}
              onVolumeChange={m.setVolume}
              onToggleMute={m.toggleMute}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
