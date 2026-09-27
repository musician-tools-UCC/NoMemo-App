'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type * as ToneType from 'tone'
import type { Song } from './songs'
import { totalMeasures } from './songs'
import { createClickEngine, type ClickEngine, type SoundId } from './metronome-sounds'

export interface MetronomeState {
  ready: boolean
  isPlaying: boolean
  beatInMeasure: number
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
}

function positionFromBeat(song: Song, globalBeat: number): Position {
  const bpb = song.timeSignature
  const total = totalMeasures(song)
  const loopBeats = total * bpb
  const effective = ((globalBeat % loopBeats) + loopBeats) % loopBeats
  const measureIndex = Math.floor(effective / bpb)
  const beatInMeasure = effective % bpb

  let cursor = 0
  for (let i = 0; i < song.sections.length; i++) {
    const count = song.sections[i].measuresCount
    if (measureIndex < cursor + count) {
      return {
        sectionIndex: i,
        measureInSection: measureIndex - cursor + 1,
        beatInMeasure,
        measureIndex,
      }
    }
    cursor += count
  }
  return { sectionIndex: 0, measureInSection: 1, beatInMeasure, measureIndex: 0 }
}

export function useMetronome(song: Song): MetronomeState {
  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatInMeasure, setBeatInMeasure] = useState(-1)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [measureInSection, setMeasureInSection] = useState(1)
  const [currentMeasure, setCurrentMeasure] = useState(0)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [soundId, setSoundIdState] = useState<SoundId>('classic')
  const [bluetoothMode, setBluetoothModeState] = useState(false)
  const [latencyMs, setLatencyMsState] = useState(150)

  const toneRef = useRef<typeof ToneType | null>(null)
  const engineRef = useRef<ClickEngine | null>(null)
  const volumeNodeRef = useRef<ToneType.Volume | null>(null)
  const eventIdRef = useRef<number | null>(null)
  const beatCountRef = useRef(0)

  const songRef = useRef(song)
  const mutedRef = useRef(muted)
  const soundIdRef = useRef(soundId)
  const bluetoothModeRef = useRef(bluetoothMode)
  const latencyMsRef = useRef(latencyMs)
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

  const resetToStart = useCallback(() => {
    beatCountRef.current = 0
    setBeatInMeasure(-1)
    setSectionIndex(0)
    setMeasureInSection(1)
    setCurrentMeasure(0)
  }, [])

  const enableAudio = useCallback(async () => {
    if (toneRef.current) return
    const Tone = await import('tone')
    await Tone.start()

    const volumeNode = new Tone.Volume(Tone.gainToDb(0.8)).toDestination()
    const engine = createClickEngine(Tone, soundIdRef.current, volumeNode)

    const transport = Tone.getTransport()
    transport.bpm.value = songRef.current.bpm

    const id = transport.scheduleRepeat((time) => {
      const currentSong = songRef.current
      const bpb = currentSong.timeSignature
      const total = totalMeasures(currentSong)
      const loopBeats = total * bpb
      const globalBeat = beatCountRef.current

      if (globalBeat >= loopBeats) return

      const beat = globalBeat % bpb

      // El clic de audio siempre suena en el tiempo exacto — el propio
      // Bluetooth ya le suma su retraso natural al llegar a los in-ears.
      if (!mutedRef.current) {
        engineRef.current?.trigger(time, beat === 0)
      }

      const pos = positionFromBeat(currentSong, globalBeat)
      const isLastBeat = globalBeat + 1 >= loopBeats

      // La UI (letra, beat, compás) se retrasa a propósito si está activado
      // el modo Bluetooth, para que coincida con lo que se escucha, no con
      // lo que se toca en el instante exacto.
      const visualOffset = bluetoothModeRef.current ? latencyMsRef.current / 1000 : 0

      Tone.getDraw().schedule(() => {
        setBeatInMeasure(pos.beatInMeasure)
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
        }, time + visualOffset)
      }
    }, '4n')

    toneRef.current = Tone
    engineRef.current = engine
    volumeNodeRef.current = volumeNode
    eventIdRef.current = id
    setReady(true)
  }, [resetToStart])

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
    const bpb = currentSong.timeSignature
    const total = totalMeasures(currentSong)
    const clamped = Math.max(0, Math.min(total - 1, Math.round(globalMeasureIndex)))
    const targetBeat = clamped * bpb

    beatCountRef.current = targetBeat

    const transport = Tone.getTransport()
    transport.position = `${clamped}:0:0`

    const pos = positionFromBeat(currentSong, targetBeat)
    setBeatInMeasure(pos.beatInMeasure)
    setSectionIndex(pos.sectionIndex)
    setMeasureInSection(pos.measureInSection)
    setCurrentMeasure(pos.measureIndex)
  }, [])

  useEffect(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.position = 0
    transport.bpm.value = song.bpm
    resetToStart()
    setIsPlaying(false)
  }, [song, resetToStart])

  useEffect(() => {
    const Tone = toneRef.current
    const node = volumeNodeRef.current
    if (!Tone || !node) return
    node.mute = muted
    node.volume.value = Tone.gainToDb(Math.max(volume, 0.0001))
  }, [volume, muted])

  const play = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    Tone.getTransport().start()
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    Tone.getTransport().pause()
    setIsPlaying(false)
  }, [])

  const stop = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.position = 0
    resetToStart()
    setIsPlaying(false)
  }, [resetToStart])

  const restart = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.position = 0
    resetToStart()
    transport.start()
    setIsPlaying(true)
  }, [resetToStart])

  const setVolume = useCallback((v: number) => setVolumeState(v), [])
  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  useEffect(() => {
    return () => {
      const Tone = toneRef.current
      if (!Tone) return
      const transport = Tone.getTransport()
      if (eventIdRef.current !== null) transport.clear(eventIdRef.current)
      transport.stop()
      engineRef.current?.dispose()
      volumeNodeRef.current?.dispose()
    }
  }, [])

  return {
    ready,
    isPlaying,
    beatInMeasure,
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