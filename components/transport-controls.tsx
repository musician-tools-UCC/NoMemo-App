'use client'

import { Pause, Play, RotateCcw, Square, Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TransportControlsProps {
  isPlaying: boolean
  volume: number
  muted: boolean
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onRestart: () => void
  onVolumeChange: (v: number) => void
  onToggleMute: () => void
}

export function TransportControls({
  isPlaying,
  volume,
  muted,
  onPlay,
  onPause,
  onStop,
  onRestart,
  onVolumeChange,
  onToggleMute,
}: TransportControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center justify-center gap-3">
        {isPlaying ? (
          <TransportButton
            label="Pause"
            onClick={onPause}
            className="bg-yellow-400 text-slate-950"
          >
            <Pause className="h-7 w-7" aria-hidden="true" />
          </TransportButton>
        ) : (
          <TransportButton
            label="Play"
            onClick={onPlay}
            className="bg-emerald-400 text-slate-950"
          >
            <Play className="h-7 w-7" aria-hidden="true" />
          </TransportButton>
        )}
        <TransportButton
          label="Stop"
          onClick={onStop}
          className="bg-slate-800 text-white"
        >
          <Square className="h-6 w-6" aria-hidden="true" />
        </TransportButton>
        <TransportButton
          label="Restart"
          onClick={onRestart}
          className="bg-slate-800 text-white"
        >
          <RotateCcw className="h-6 w-6" aria-hidden="true" />
        </TransportButton>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute metronome' : 'Mute metronome'}
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
            muted ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-white',
          )}
        >
          {muted ? (
            <VolumeX className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Volume2 className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          aria-label="Master volume"
          className="h-2 w-40 cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-400"
        />
      </div>
    </div>
  )
}

function TransportButton({
  label,
  onClick,
  className,
  children,
}: {
  label: string
  onClick: () => void
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        'flex h-16 w-16 items-center justify-center rounded-2xl font-bold shadow-lg transition-transform active:scale-90 sm:h-20 sm:w-20',
        className,
      )}
    >
      {children}
    </button>
  )
}
