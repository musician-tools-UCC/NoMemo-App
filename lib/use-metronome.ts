'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type * as ToneType from 'tone'
import type { Song } from './songs'
import { totalMeasures } from './songs'

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
  volume: number
  muted: boolean
  enableAudio: () => Promise<void>
  play: () => void
  pause: () => void
  stop: () => void
  restart: () => void
  setVolume: (v: number) => void
  toggleMute: () => void
}

interface Position {
  sectionIndex: number
  measureInSection: number
  beatInMeasure: number
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
      }
    }
    cursor += count
  }
  return { sectionIndex: 0, measureInSection: 1, beatInMeasure }
}

export function useMetronome(song: Song): MetronomeState {
  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [beatInMeasure, setBeatInMeasure] = useState(-1)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [measureInSection, setMeasureInSection] = useState(1)
  const [volume, setVolumeState] = useState(0.8)
  const [muted, setMuted] = useState(false)

  const toneRef = useRef<typeof ToneType | null>(null)
  const synthRef = useRef<ToneType.MembraneSynth | null>(null)
  const volumeNodeRef = useRef<ToneType.Volume | null>(null)
  const eventIdRef = useRef<number | null>(null)
  const beatCountRef = useRef(0)

  // Keep refs of reactive values the audio callback reads.
  const songRef = useRef(song)
  const mutedRef = useRef(muted)
  useEffect(() => {
    songRef.current = song
  }, [song])
  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  const enableAudio = useCallback(async () => {
    if (toneRef.current) return
    const Tone = await import('tone')
    await Tone.start()

    const volumeNode = new Tone.Volume(Tone.gainToDb(0.8)).toDestination()
    const synth = new Tone.MembraneSynth({
      pitchDecay: 0.008,
      octaves: 2,
      envelope: { attack: 0.001, decay: 0.18, sustain: 0, release: 0.05 },
    }).connect(volumeNode)

    const transport = Tone.getTransport()
    transport.bpm.value = songRef.current.bpm

    const id = transport.scheduleRepeat((time) => {
      const currentSong = songRef.current
      const bpb = currentSong.timeSignature
      const globalBeat = beatCountRef.current
      const beat = globalBeat % bpb

      if (!mutedRef.current) {
        // High click on beat 1, low click on the rest.
        synth.triggerAttackRelease(beat === 0 ? 'C5' : 'C4', '16n', time)
      }

      const pos = positionFromBeat(currentSong, globalBeat)
      Tone.getDraw().schedule(() => {
        setBeatInMeasure(pos.beatInMeasure)
        setSectionIndex(pos.sectionIndex)
        setMeasureInSection(pos.measureInSection)
      }, time)

      beatCountRef.current = globalBeat + 1
    }, '4n')

    toneRef.current = Tone
    synthRef.current = synth
    volumeNodeRef.current = volumeNode
    eventIdRef.current = id
    setReady(true)
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
      synthRef.current?.dispose()
      volumeNodeRef.current?.dispose()
    }
  }, [])

  return {
    ready,
    isPlaying,
    beatInMeasure,
    sectionIndex,
    measureInSection,
    volume,
    muted,
    enableAudio,
    play,
    pause,
    stop,
    restart,
    setVolume,
    toggleMute,
  }
}
