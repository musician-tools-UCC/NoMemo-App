'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type * as ToneType from 'tone'
import type { Song } from './songs'
import { totalMeasures } from './songs'
import { createClickEngine, type ClickEngine, type SoundId } from './metronome-sounds'

export interface MetronomeState {
  /** Whether the Web Audio context has been unlocked (Tone.start()). */
  ready: boolean
  isPlaying: boolean
  /** 0-based beat within the current measure. -1 before playback starts. */
  beatInMeasure: number
  /** Index of the active section. */
  sectionIndex: number
  /** 1-based measure within the active section. */
  measureInSection: number
  /** 0-based measure across the whole song (loops). */
  currentMeasure: number
  volume: number
  muted: boolean
  soundId: SoundId
  enableAudio: () => Promise<void>
  play: () => void
  pause: () => void
  stop: () => void
  restart: () => void
  setVolume: (v: number) => void
  toggleMute: () => void
  setSound: (id: SoundId) => void
  /** Jump playback to a specific 0-based global measure. */
  seek: (globalMeasureIndex: number) => void
}

interface Position {
  sectionIndex: number
  measureInSection: number
  beatInMeasure: number
  /** 0-based measure across the whole song (looped). */
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

  const toneRef = useRef<typeof ToneType | null>(null)
  const engineRef = useRef<ClickEngine | null>(null)
  const volumeNodeRef = useRef<ToneType.Volume | null>(null)
  const eventIdRef = useRef<number | null>(null)
  const beatCountRef = useRef(0)

  // Keep refs of reactive values the audio callback reads.
  const songRef = useRef(song)
  const mutedRef = useRef(muted)
  const soundIdRef = useRef(soundId)
  useEffect(() => {
    songRef.current = song
  }, [song])
  useEffect(() => {
    mutedRef.current = muted
  }, [muted])
  useEffect(() => {
    soundIdRef.current = soundId
  }, [soundId])

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
      const globalBeat = beatCountRef.current
      const beat = globalBeat % bpb

      if (!mutedRef.current) {
        engineRef.current?.trigger(time, beat === 0)
      }

      const pos = positionFromBeat(currentSong, globalBeat)
      Tone.getDraw().schedule(() => {
        setBeatInMeasure(pos.beatInMeasure)
        setSectionIndex(pos.sectionIndex)
        setMeasureInSection(pos.measureInSection)
        setCurrentMeasure(pos.measureIndex)
      }, time)

      beatCountRef.current = globalBeat + 1
    }, '4n')

    toneRef.current = Tone
    engineRef.current = engine
    volumeNodeRef.current = volumeNode
    eventIdRef.current = id
    setReady(true)
  }, [])

  // Cambiar de sonido en caliente: descarta el engine viejo y crea uno nuevo.
  const setSound = useCallback((id: SoundId) => {
    const Tone = toneRef.current
    const volumeNode = volumeNodeRef.current
    if (!Tone || !volumeNode) {
      // Todavía no se inicializó el audio; solo guardamos la preferencia.
      setSoundIdState(id)
      return
    }
    engineRef.current?.dispose()
    engineRef.current = createClickEngine(Tone, id, volumeNode)
    setSoundIdState(id)
  }, [])

  // Saltar a un compás específico de la canción (scrubbing tipo streaming).
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

  // Apply BPM when the song changes; reset transport position.
  useEffect(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.position = 0
    transport.bpm.value = song.bpm
    beatCountRef.current = 0
    setIsPlaying(false)
    setBeatInMeasure(-1)
    setSectionIndex(0)
    setMeasureInSection(1)
    setCurrentMeasure(0)
  }, [song])

  // Apply volume / mute changes to the audio graph.
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
    beatCountRef.current = 0
    setIsPlaying(false)
    setBeatInMeasure(-1)
    setSectionIndex(0)
    setMeasureInSection(1)
    setCurrentMeasure(0)
  }, [])

  const restart = useCallback(() => {
    const Tone = toneRef.current
    if (!Tone) return
    const transport = Tone.getTransport()
    transport.stop()
    transport.position = 0
    beatCountRef.current = 0
    setBeatInMeasure(-1)
    setSectionIndex(0)
    setMeasureInSection(1)
    setCurrentMeasure(0)
    transport.start()
    setIsPlaying(true)
  }, [])

  const setVolume = useCallback((v: number) => setVolumeState(v), [])
  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  // Cleanup on unmount.
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
    enableAudio,
    play,
    pause,
    stop,
    restart,
    setVolume,
    toggleMute,
    setSound,
    seek,
  }
}