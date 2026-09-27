'use client'

import { useCallback, useRef } from 'react'

interface SeekMarker {
  measure: number
  label: string
}

interface SeekBarProps {
  totalMeasures: number
  currentMeasure: number
  markers?: SeekMarker[]
  onSeek: (measure: number) => void
}

export function SeekBar({
  totalMeasures,
  currentMeasure,
  markers = [],
  onSeek,
}: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const measureFromClientX = useCallback(
    (clientX: number) => {
      const track = trackRef.current
      if (!track || totalMeasures <= 1) return 0
      const rect = track.getBoundingClientRect()
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      return Math.round(ratio * (totalMeasures - 1))
    },
    [totalMeasures],
  )

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId)
      onSeek(measureFromClientX(e.clientX))
    },
    [measureFromClientX, onSeek],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return
      onSeek(measureFromClientX(e.clientX))
    },
    [measureFromClientX, onSeek],
  )

  const progress =
    totalMeasures > 1 ? (currentMeasure / (totalMeasures - 1)) * 100 : 0

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative h-3 w-full cursor-pointer touch-none rounded-full bg-slate-800"
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-yellow-300"
          style={{ width: `${progress}%` }}
        />
        {markers.map((marker, i) => (
          <span
            key={`${marker.label}-${i}`}
            title={marker.label}
            className="absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-slate-950/60"
            style={{
              left: `${
                totalMeasures > 1 ? (marker.measure / (totalMeasures - 1)) * 100 : 0
              }%`,
            }}
          />
        ))}
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-950 bg-emerald-300 shadow-md shadow-emerald-300/40"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="flex items-center justify-between font-mono text-xs text-slate-500">
        <span>Bar {totalMeasures > 0 ? currentMeasure + 1 : 0}</span>
        <span>{totalMeasures} bars total</span>
      </div>
    </div>
  )
}