'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type * as ToneType from 'tone'
import type { Song } from './songs'
import { totalMeasures } from './songs'
import { createClickEngine, type ClickEngine, type SoundId } from './metronome-sounds'

const tonePreload: Promise<typeof ToneType> | null =
  typeof window !== 'undefined' ? import('tone') : null

export interface MetronomeState {
  ready: boolean
  isPlaying: boolean
  beatInMeasure: number
  /** Beats por compás de la sección que está sonando ahora mismo (puede
   * variar de una sección a otra si alguna tiene su propio timeSignature). */
  beatsPerMeasure: number
  sectionIndex: number
  measureInSection: number
  currentMeasure: number
  volume: number
  muted: boolean
  soundId: SoundId
  bluetoothMode: boolean
  latencyMs: number
  enableAudio: () => Promise<void>
  play: () => void
  pause: () => void
  stop: () => void
  restart: () => void
  setVolume: (v: number) => void
  toggleMute: () => void
  setSound: (id: SoundId) => void
  seek: (globalMeasureIndex: number) => void
  setBluetoothMode: (enabled: boolean) => void
  setLatencyMs: (ms: number) => void
}

interface Position {
  sectionIndex: number
  measureInSection: number
  beatInMeasure: number
  measureIndex: number
  beatsPerMeasure: number
}

function sectionBpb(song: Song, sectionIndex: number): number {
  return song.sections[sectionIndex]?.timeSignature ?? song.timeSignature
}

// Beats totales de la canción (sumando measuresCount * su propio bpb por
// sección) para soportar compases mixtos.
function totalBeatsForSong(song: Song): number {
  let total = 0
  for (const section of song.sections) {
    total += section.measuresCount * (section.timeSignature ?? song.timeSignature)
  }
  return total
}

function positionFromBeat(song: Song, globalBeat: number): Position {
  const loopBeats = totalBeatsForSong(song)
  const effective = ((globalBeat % loopBeats) + loopBeats) % loopBeats

  let cursorBeats = 0
  let cursorMeasures = 0
  for (let i = 0; i < song.sections.length; i++) {
    const bpb = sectionBpb(song, i)
    const sectionBeats = song.sections[i].measuresCount * bpb
    if (effective < cursorBeats + sectionBeats) {
      const beatsIntoSection = effective - cursorBeats
      return {
        sectionIndex: i,
        measureInSection: Math.floor(beatsIntoSection / bpb) + 1,
        beatInMeasure: beatsIntoSection % bpb,
        measureIndex: cursorMeasures + Math.floor(beatsIntoSection / bpb),
        beatsPerMeasure: bpb,
      }
    }
    cursorBeats += sectionBeats
    cursorMeasures += song.sections[i].measuresCount
  }
  return {
    sectionIndex: 0,
    measureInSection: 1,
    beatInMeasure: 0,
    measureIndex: 0,
    beatsPerMeasure: sectionBpb(song, 0),
  }
}

// Convierte un número de compás global (0-based) al beat global que le
// corresponde, respetando que cada sección puede tener su propio bpb.
function beatForMeasureIndex(song: Song, targetMeasureIndex: number): number {
  let cursorMeasures = 0
  let cursorBeats = 0
  for (let i = 0; i < song.sections.length; i++) {
    const bpb = sectionBpb(song, i)
    const count = song.sections[i].measuresCount
    if (targetMeasureIndex < cursorMeasures + count) {
      const measureOffset = targetMeasureIndex - cursorMeasures
      return cursorBeats + measureOffset * bpb
    }
    cursorMeasures += count
    cursorBeats += count * bpb
  }
  return cursorBeats
}

export function useMetronome(song: Song): MetronomeState {
  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatInMeasure, setBeatInMeasure] = useState(-1)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(song.timeSignature)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [measureInSection, setMeasureInSection] = useState(1)
  const [currentMeasure, setCurrentMeasure] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [soundId, setSoundIdState] = useState<SoundId>('classic')
  const [bluetoothMode, setBluetoothModeState] = useState(false)
  const [latencyMs, setLatencyMsState] = useState(140)

  const toneRef = useRef<typeof ToneType | null>(null)
  const engineRef = useRef<ClickEngine | null>(null)
  const volumeNodeRef = useRef<ToneType.Volume | null>(null)
  const eventIdRef = useRef<number | null>(null)
  const beatCountRef = useRef(0)
  const wakeLockRef = useRef<any>(null)
  const stateListenerCleanupRef = useRef<(() => void) | null>(null)

  const songRef = useRef(song)
  const mutedRef = useRef(muted)
  const soundIdRef = useRef(soundId)
  const bluetoothModeRef = useRef(bluetoothMode)
  const latencyMsRef = useRef(latencyMs)
  const isPlayingRef = useRef(isPlaying)
  useEffect(() => {
    songRef.current = song
  }, [song])
  useEffect(() => {
    mutedRef.current = muted
  }, [muted])
  useEffect(() => {
    soundIdRef.current = soundId
  }, [soundId])
  useEffect(() => {
    bluetoothModeRef.current = bluetoothMode
  }, [bluetoothMode])
  useEffect(() => {
    latencyMsRef.current = latencyMs
  }, [latencyMs])
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  const resetToStart = useCallback(() => {
    beatCountRef.current = 0
    setBeatInMeasure(-1)
    setSectionIndex(0)
    setMeasureInSection(1)
    setCurrentMeasure(0)
    setBeatsPerMeasure(sectionBpb(songRef.current, 0))
  }, [])

  // Mantiene la pantalla encendida mientras suena (iOS suspende el audio
  // de la página cuando la pantalla se bloquea).
  const acquireWakeLock = useCallback(async () => {
    try {
      const wakeLock = (navigator as any).wakeLock
      if (!wakeLock || wakeLockRef.current) return
      const sentinel = await wakeLock.request('screen')
      wakeLockRef.current = sentinel
      sentinel.addEventListener('release', () => {
        wakeLockRef.current = null
      })
    } catch {
      // No soportado o denegado: no es crítico, la app sigue funcionando.
    }
  }, [])

  const releaseWakeLock = useCallback(() => {
    try {
      wakeLockRef.current?.release()
    } catch {
      // ignorar
    }
    wakeLockRef.current = null
  }, [])

  // Reactiva el AudioContext si iOS lo suspendió por inactividad o por
  // bloqueo de pantalla. Tone.start() es seguro de llamar varias veces.
  const ensureAudioRunning = useCallback(async () => {
    const Tone = toneRef.current
    if (!Tone) return
    try {
      await Tone.start()
    } catch {
      // Si falla, el estado del contexto lo va a reflejar y se maneja abajo.
    }
  }, [])

  const enableAudio = useCallback(async () => {
    if (toneRef.current) return
    const Tone = tonePreload ? await tonePreload : await import('tone')
    await Tone.start()

    const volumeNode = new Tone.Volume(Tone.gainToDb(0.8)).toDestination()
    const engine = createClickEngine(Tone, soundIdRef.current, volumeNode)

    const transport = Tone.getTransport()
    transport.bpm.value = songRef.current.bpm

    const id = transport.scheduleRepeat((time) => {
      const currentSong = songRef.current
      const loopBeats = totalBeatsForSong(currentSong)
      const globalBeat = beatCountRef.current

      if (globalBeat >= loopBeats) return

      const pos = positionFromBeat(currentSong, globalBeat)

      if (!mutedRef.current) {
        engineRef.current?.trigger(time, pos.beatInMeasure === 0)
      }

      const isLastBeat = globalBeat + 1 >= loopBeats
      const visualOffset = bluetoothModeRef.current ? latencyMsRef.current / 1000 : 0

      Tone.getDraw().schedule(() => {
        setBeatInMeasure(pos.beatInMeasure)
        setBeatsPerMeasure(pos.beatsPerMeasure)
        setSectionIndex(pos.sectionIndex)
        setMeasureInSection(pos.measureInSection)
        setCurrentMeasure(pos.measureIndex)
      }, time + visualOffset)

      beatCountRef.current = globalBeat + 1

      if (isLastBeat) {
        Tone.getDraw().schedule(() => {
          transport.pause()
          resetToStart()
          setIsPlaying(false)
          releaseWakeLock()
        }, time + visualOffset)
      }
    }, '4n')

    toneRef.current = Tone
    engineRef.current = engine
    volumeNodeRef.current = volumeNode
    eventIdRef.current = id

    // Si iOS suspende el audio mientras estaba sonando, pasamos la UI a
    // "pausado" para que el botón vuelva a mostrar Play y no quede
    // mostrando Pausa con todo congelado.
    const rawContext = Tone.getContext().rawContext as any
    const handleStateChange = () => {
      if (Tone.getContext().state !== 'running' && isPlayingRef.current) {
        Tone.getTransport().pause()
        setIsPlaying(false)
        releaseWakeLock()
      }
    }
    rawContext.addEventListener?.('statechange', handleStateChange)
    stateListenerCleanupRef.current = () =>
      rawContext.removeEventListener?.('statechange', handleStateChange)

    setReady(true)
  }, [resetToStart, releaseWakeLock])

  // Al volver a la app (por ejemplo después de bloquear el celular), si el
  // audio quedó suspendido mientras figuraba "reproduciendo", lo reflejamos.
  useEffect(() => {
    const onVisibilityChange = () => {
      const Tone = toneRef.current
      if (!Tone || document.visibilityState !== 'visible') return
      if (Tone.getContext().state !== 'running' && isPlayingRef.current) {
        Tone.getTransport().pause()
        setIsPlaying(false)
        releaseWakeLock()
      } else if (isPlayingRef.current) {
        // Los wake locks se liberan solos al ocultar la página: pedir de nuevo.
        void acquireWakeLock()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [acquireWakeLock, releaseWakeLock])

  const setSound = useCallback((id: SoundId) => {
    const Tone = toneRef.current
    const volumeNode = volumeNodeRef.current
    if (!Tone || !volumeNode) {
      setSoundIdState(id)
      return
    }
    engineRef.current?.dispose()
    engineRef.current = createClickEngine(Tone, id, volumeNode)
    setSoundIdState(id)
  }, [])

  const setBluetoothMode = useCallback((enabled: boolean) => {
    setBluetoothModeState(enabled)
  }, [])

  const setLatencyMs = useCallback((ms: number) => {
    setLatencyMsState(ms)
  }, [])

  const seek = useCallback((globalMeasureIndex: number) => {
    const Tone = toneRef.current
    if (!Tone) return
    const currentSong = songRef.current
    const total = totalMeasures(currentSong)
    const clamped = Math.max(0, Math.min(total - 1, Math.round(globalMeasureIndex)))
    const targetBeat = beatForMeasureIndex(currentSong, clamped)

    beatCountRef.current = targetBeat

    const transport = Tone.getTransport()
    // La duración de un tiempo (negra) no cambia con el compás, solo con el
    // BPM — así que saltar por segundos funciona igual para 4/4 que 2/4.
    transport.seconds = targetBeat * (60 / currentSong.bpm)

    const pos = positionFromBeat(currentSong, targetBeat)
    setBeatInMeasure(pos.beatInMeasure)
    setBeatsPerMeasure(pos.beatsPerMeasure)
    setSectionIndex(pos.sectionIndex)
    setMeasureInSection(pos.measureInSection)
    setCurrentMeasure(pos.measureIndex)
  }, [])

  useEffect(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.seconds = 0
    transport.bpm.value = song.bpm
    resetToStart()
    setIsPlaying(false)
    releaseWakeLock()
  }, [song, resetToStart, releaseWakeLock])

  useEffect(() => {
    const Tone = toneRef.current
    const node = volumeNodeRef.current
    if (!Tone || !node) return
    node.mute = muted
    node.volume.value = Tone.gainToDb(Math.max(volume, 0.0001))
  }, [volume, muted])

  const play = useCallback(async () => {
    const Tone = toneRef.current
    if (!Tone) return
    // Reactiva el audio si iOS lo había suspendido (inactividad, pantalla
    // bloqueada, etc.) ANTES de arrancar el reloj.
    await ensureAudioRunning()
    Tone.getTransport().start()
    setIsPlaying(true)
    void acquireWakeLock()
  }, [ensureAudioRunning, acquireWakeLock])

  const pause = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    Tone.getTransport().pause()
    setIsPlaying(false)
    releaseWakeLock()
  }, [releaseWakeLock])

  const stop = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.seconds = 0
    resetToStart()
    setIsPlaying(false)
    releaseWakeLock()
  }, [resetToStart, releaseWakeLock])

  const restart = useCallback(async () => {
    const Tone = toneRef.current
    if (!Tone) return
    await ensureAudioRunning()
    const transport = Tone.getTransport()
    transport.stop()
    transport.seconds = 0
    resetToStart()
    transport.start()
    setIsPlaying(true)
    void acquireWakeLock()
  }, [ensureAudioRunning, resetToStart, acquireWakeLock])

  const setVolume = useCallback((v: number) => setVolumeState(v), [])
  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  useEffect(() => {
    return () => {
      stateListenerCleanupRef.current?.()
      releaseWakeLock()
      const Tone = toneRef.current
      if (!Tone) return
      const transport = Tone.getTransport()
      if (eventIdRef.current !== null) transport.clear(eventIdRef.current)
      transport.stop()
      engineRef.current?.dispose()
      volumeNodeRef.current?.dispose()
    }
  }, [releaseWakeLock])

  return {
    ready,
    isPlaying,
    beatInMeasure,
    beatsPerMeasure,
    sectionIndex,
    measureInSection,
    currentMeasure,
    volume,
    muted,
    soundId,
    bluetoothMode,
    latencyMs,
    enableAudio,
    play,
    pause,
    stop,
    restart,
    setVolume,
    toggleMute,
    setSound,
    seek,
    setBluetoothMode,
    setLatencyMs,
  }
}