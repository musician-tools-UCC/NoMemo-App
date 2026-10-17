'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type * as ToneType from 'tone'
import type { Song } from './songs'
import { totalMeasures } from './songs'
import { createClickEngine, type ClickEngine, type SoundId } from './metronome-sounds'

const tonePreload: Promise<typeof ToneType> | null =
  typeof window !== 'undefined' ? import('tone') : null

// ============================================================
// AJUSTE DEL RUIDO DE FONDO — cambiá SOLO el número de abajo.
// ============================================================
const NOISE_DB = -70
const NOISE_FADE_IN_S = 0.1
const NOISE_FADE_OUT_S = 0.25

function dbToGain(db: number): number {
  return Math.pow(10, db / 20)
}

export interface MetronomeState {
  ready: boolean
  isPlaying: boolean
  beatInMeasure: number
  beatsPerMeasure: number
  sectionIndex: number
  measureInSection: number
  currentMeasure: number
  volume: number
  muted: boolean
  soundId: SoundId
  bluetoothMode: boolean
  latencyMs: number
  noiseEnabled: boolean
  noiseDb: number
  
  // Controles independientes para el ruido blanco
  isNoisePlaying: boolean
  toggleNoise: () => void
  playNoise: () => void
  stopNoise: () => void

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
  setNoiseEnabled: (enabled: boolean) => void
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
  const [isNoisePlaying, setIsNoisePlaying] = useState(false)
  const [beatInMeasure, setBeatInMeasure] = useState(-1)
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(song.timeSignature)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [measureInSection, setMeasureInSection] = useState(1)
  const [currentMeasure, setCurrentMeasure] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [soundId, setSoundIdState] = useState<SoundId>('beep')
  const [bluetoothMode, setBluetoothModeState] = useState(false)
  const [latencyMs, setLatencyMsState] = useState(140)
  const [noiseEnabled, setNoiseEnabledState] = useState(true)

  const toneRef = useRef<typeof ToneType | null>(null)
  const engineRef = useRef<ClickEngine | null>(null)
  const volumeNodeRef = useRef<ToneType.Volume | null>(null)
  const noiseRef = useRef<ToneType.Noise | null>(null)
  const noiseGainRef = useRef<ToneType.Gain | null>(null)
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
  const isNoisePlayingRef = useRef(isNoisePlaying)

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
  useEffect(() => {
    isNoisePlayingRef.current = isNoisePlaying
  }, [isNoisePlaying])

  const resetToStart = useCallback(() => {
    beatCountRef.current = 0
    setBeatInMeasure(-1)
    setSectionIndex(0)
    setMeasureInSection(1)
    setCurrentMeasure(0)
    setBeatsPerMeasure(sectionBpb(songRef.current, 0))
  }, [])

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
      // Ignorar si no está soportado
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

  const ensureAudioRunning = useCallback(async () => {
    const Tone = toneRef.current
    if (!Tone) return
    try {
      await Tone.start()
    } catch {
      // Ignorar
    }
  }, [])

  const enableAudio = useCallback(async () => {
    if (toneRef.current) return
    const Tone = tonePreload ? await tonePreload : await import('tone')
    await Tone.start()

    const volumeNode = new Tone.Volume(Tone.gainToDb(0.8)).toDestination()
    const engine = createClickEngine(Tone, soundIdRef.current, volumeNode)

    const noiseGain = new Tone.Gain(0).toDestination()
    const noise = new Tone.Noise('white').connect(noiseGain)
    noise.start()

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
          if (!isNoisePlayingRef.current) {
            releaseWakeLock()
          }
        }, time + visualOffset)
      }
    }, '4n')

    toneRef.current = Tone
    engineRef.current = engine
    volumeNodeRef.current = volumeNode
    noiseRef.current = noise
    noiseGainRef.current = noiseGain
    eventIdRef.current = id

    const rawContext = Tone.getContext().rawContext as any
    const handleStateChange = () => {
      if (Tone.getContext().state !== 'running' && (isPlayingRef.current || isNoisePlayingRef.current)) {
        Tone.getTransport().pause()
        setIsPlaying(false)
        setIsNoisePlaying(false)
        releaseWakeLock()
      }
    }
    rawContext.addEventListener?.('statechange', handleStateChange)
    stateListenerCleanupRef.current = () =>
      rawContext.removeEventListener?.('statechange', handleStateChange)

    setReady(true)
  }, [resetToStart, releaseWakeLock])

  useEffect(() => {
    const onVisibilityChange = () => {
      const Tone = toneRef.current
      if (!Tone || document.visibilityState !== 'visible') return
      if (Tone.getContext().state !== 'running' && (isPlayingRef.current || isNoisePlayingRef.current)) {
        Tone.getTransport().pause()
        setIsPlaying(false)
        setIsNoisePlaying(false)
        releaseWakeLock()
      } else if (isPlayingRef.current || isNoisePlayingRef.current) {
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

  const setNoiseEnabled = useCallback((enabled: boolean) => {
    setNoiseEnabledState(enabled)
  }, [])

  const playNoise = useCallback(async () => {
    await ensureAudioRunning()
    setIsNoisePlaying(true)
    void acquireWakeLock()
  }, [ensureAudioRunning, acquireWakeLock])

  const stopNoise = useCallback(() => {
    setIsNoisePlaying(false)
    if (!isPlayingRef.current) {
      releaseWakeLock()
    }
  }, [releaseWakeLock])

  const toggleNoise = useCallback(() => {
    if (isNoisePlayingRef.current) {
      stopNoise()
    } else {
      void playNoise()
    }
  }, [playNoise, stopNoise])

  const seek = useCallback((globalMeasureIndex: number) => {
    const Tone = toneRef.current
    if (!Tone) return
    const currentSong = songRef.current
    const total = totalMeasures(currentSong)
    const clamped = Math.max(0, Math.min(total - 1, Math.round(globalMeasureIndex)))
    const targetBeat = beatForMeasureIndex(currentSong, clamped)

    beatCountRef.current = targetBeat

    const transport = Tone.getTransport()
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
    setIsNoisePlaying(false)
    releaseWakeLock()
  }, [song, resetToStart, releaseWakeLock])

  useEffect(() => {
    const Tone = toneRef.current
    const node = volumeNodeRef.current
    if (!Tone || !node) return
    node.mute = muted
    node.volume.value = Tone.gainToDb(Math.max(volume, 0.0001))
  }, [volume, muted])

  // El ruido se activa si el metrónomo está sonando O si el botón independiente de ruido fue presionado
  useEffect(() => {
    const node = noiseGainRef.current
    if (!node) return
    const active = (isPlaying || isNoisePlaying) && noiseEnabled && !muted
    node.gain.rampTo(
      active ? dbToGain(NOISE_DB) : 0,
      active ? NOISE_FADE_IN_S : NOISE_FADE_OUT_S,
    )
  }, [ready, isPlaying, isNoisePlaying, noiseEnabled, muted])

  const play = useCallback(async () => {
    const Tone = toneRef.current
    if (!Tone) return
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
    if (!isNoisePlayingRef.current) {
      releaseWakeLock()
    }
  }, [releaseWakeLock])

  const stop = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.seconds = 0
    resetToStart()
    setIsPlaying(false)
    if (!isNoisePlayingRef.current) {
      releaseWakeLock()
    }
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
      noiseRef.current?.dispose()
      noiseGainRef.current?.dispose()
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
    noiseEnabled,
    noiseDb: NOISE_DB,
    
    isNoisePlaying,
    toggleNoise,
    playNoise,
    stopNoise,

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
    setNoiseEnabled,
  }
}