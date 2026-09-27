'use client'

import { useCallback, useMemo, useState } from 'react'
import { Bluetooth } from 'lucide-react'
import { SONGS, totalMeasures, type Song } from '@/lib/songs'
import { useMetronome } from '@/lib/use-metronome'
import { AudioOverlay } from './audio-overlay'
import { BeatIndicator } from './beat-indicator'
import { TransportControls } from './transport-controls'
import { ActiveSection, UpcomingSection } from './section-view'
import { Setlist } from './setlist'
import { SoundSelector } from './sound-selector'
import { SeekBar } from './seek-bar'
import { cn } from '@/lib/utils'

export function Teleprompter() {
  const [song, setSong] = useState<Song>(SONGS[0])
  const m = useMetronome(song)

  const activeSection = song.sections[m.sectionIndex]
  const nextSection = song.sections[m.sectionIndex + 1] ?? null

  const songTotalMeasures = useMemo(() => totalMeasures(song), [song])

  const sectionMarkers = useMemo(() => {
    let cursor = 0
    return song.sections.map((s) => {
      const marker = { measure: cursor, label: s.name }
      cursor += s.measuresCount
      return marker
    })
  }, [song])

  const goToOffset = useCallback(
    (offset: number) => {
      const currentIndex = SONGS.findIndex((s) => s.id === song.id)
      const nextIndex = (currentIndex + offset + SONGS.length) % SONGS.length
      setSong(SONGS[nextIndex])
    },
    [song],
  )

  const goPrev = useCallback(() => goToOffset(-1), [goToOffset])
  const goNext = useCallback(() => goToOffset(1), [goToOffset])

  return (
    <main className="min-h-dvh w-full overflow-x-hidden bg-slate-950 text-white">
      {!m.ready && (
        <AudioOverlay
          onEnable={m.enableAudio}
          bluetoothMode={m.bluetoothMode}
          latencyMs={m.latencyMs}
          onChangeBluetoothMode={m.setBluetoothMode}
          onChangeLatency={m.setLatencyMs}
        />
      )}

      <div
        className="mx-auto flex w-full max-w-4xl flex-col gap-4 overflow-x-hidden px-4 pb-6 sm:px-6 sm:pb-8"
        style={{
          paddingTop: 'max(1.5rem, calc(env(safe-area-inset-top) + 0.75rem))',
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        {/* Setlist como menú desplegable + prev/next, arriba de todo */}
        <Setlist
          songs={SONGS}
          activeSongId={song.id}
          onSelect={setSong}
          onPrev={goPrev}
          onNext={goNext}
        />

        {/* Letra activa — arriba, es lo principal que hay que leer */}
        {activeSection && (
          <ActiveSection
            section={activeSection}
            measureInSection={m.measureInSection}
            isPlaying={m.isPlaying}
            beatsPerMeasure={song.timeSignature}
            activeBeat={m.beatInMeasure}
          />
        )}

        {/* Up Next — en el medio */}
        <UpcomingSection section={nextSection} />

        {/* Espaciador para que la letra no quede tapada por los bloques fijos de abajo */}
        <div className="h-2" />
      </div>

      {/* Bloques fijos abajo: dos secciones visualmente separadas */}
      <div
        className="sticky bottom-0 left-0 flex w-full flex-col gap-2 px-4 sm:px-6"
        style={{
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
          paddingLeft: 'max(1rem, env(safe-area-inset-left))',
          paddingRight: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        {/* Bloque 1: Play / Pause / Stop + volumen */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4 backdrop-blur sm:p-5">
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

        {/* Bloque 2: título + indicador de beat + sonido + seek bar */}
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/95 p-4 backdrop-blur sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-black tracking-tight sm:text-xl">
                {song.title}
              </h1>
              <p className="truncate text-xs text-slate-400">
                {song.artist} · {song.bpm} BPM · {song.timeSignature}/4
              </p>
            </div>
            <BeatIndicator
              beatsPerMeasure={song.timeSignature}
              activeBeat={m.beatInMeasure}
              isPlaying={m.isPlaying}
            />
          </div>

          <SoundSelector value={m.soundId} onChange={m.setSound} />

          {/* Calibración de Bluetooth, accesible en cualquier momento (ej. durante el soundcheck) */}
          <div className="flex flex-col gap-2 rounded-xl border border-slate-800 bg-slate-950/50 p-3">
            <button
              type="button"
              onClick={() => m.setBluetoothMode(!m.bluetoothMode)}
              className={cn(
                'flex items-center justify-between gap-2 text-sm font-semibold transition-colors',
                m.bluetoothMode ? 'text-emerald-300' : 'text-slate-400',
              )}
            >
              <span className="flex items-center gap-2">
                <Bluetooth className="h-4 w-4" aria-hidden="true" />
                Modo Bluetooth
              </span>
              <span
                className={cn(
                  'flex h-6 w-11 items-center rounded-full px-0.5 transition-colors',
                  m.bluetoothMode ? 'justify-end bg-emerald-400' : 'justify-start bg-slate-700',
                )}
              >
                <span className="h-5 w-5 rounded-full bg-slate-950" />
              </span>
            </button>

            {m.bluetoothMode && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Delay</span>
                  <span className="font-mono text-emerald-300">{m.latencyMs} ms</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={400}
                  step={10}
                  value={m.latencyMs}
                  onChange={(e) => m.setLatencyMs(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-400"
                />
              </div>
            )}
          </div>

          <SeekBar
            totalMeasures={songTotalMeasures}
            currentMeasure={m.currentMeasure}
            markers={sectionMarkers}
            onSeek={m.seek}
          />
        </div>
      </div>
    </main>
  )
}