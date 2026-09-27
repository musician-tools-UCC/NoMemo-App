export interface Section {
  name: string
  measuresCount: number
  chords: string
  lyrics: string
}

export interface Song {
  id: string
  title: string
  artist?: string
  bpm: number
  /** Beats per measure, e.g. 4 for 4/4 */
  timeSignature: number
  sections: Section[]
}

export const SONGS: Song[] = [
  {
    id: 'midnight-drive',
    title: 'Midnight Drive',
    artist: 'The Neon Lines',
    bpm: 120,
    timeSignature: 4,
    sections: [
      {
        name: 'Intro',
        measuresCount: 4,
        chords: 'Am  |  F  |  C  |  G',
        lyrics: '(instrumental — let the pad breathe)',
      },
      {
        name: 'Verse 1',
        measuresCount: 8,
        chords: 'Am        F         C         G',
        lyrics:
          'City lights are calling out my name\nEngine humming soft against the rain\nMiles of empty road ahead of me\nChasing down a dream I cannot see',
      },
      {
        name: 'Pre-Chorus',
        measuresCount: 4,
        chords: 'F  |  G  |  Am  |  Am',
        lyrics: "And I feel it rising up inside\nNowhere left for me to hide",
      },
      {
        name: 'Chorus',
        measuresCount: 8,
        chords: 'C         G         Am        F',
        lyrics:
          "On a midnight drive, I'm coming alive\nEvery neon sign lighting up the night\nHold on tight, we're gonna be alright\nOn a midnight drive tonight",
      },
      {
        name: 'Outro',
        measuresCount: 4,
        chords: 'Am  |  F  |  C  |  G',
        lyrics: '(fade out — repeat the hook softly)',
      },
    ],
  },
  {
    id: 'slow-burn',
    title: 'Slow Burn',
    artist: 'Ivory Coast',
    bpm: 95,
    timeSignature: 4,
    sections: [
      {
        name: 'Intro',
        measuresCount: 2,
        chords: 'D  |  A',
        lyrics: '(soft piano intro)',
      },
      {
        name: 'Verse 1',
        measuresCount: 8,
        chords: 'D          A          Bm         G',
        lyrics:
          "We started with a spark that wouldn't fade\nQuiet little fire that we made\nTook our time, we let the embers grow\nSome things are just better taken slow",
      },
      {
        name: 'Chorus',
        measuresCount: 8,
        chords: 'G          D          A          Bm',
        lyrics:
          "It's a slow burn, baby take your time\nEvery moment with you feels like wine\nNo need to rush, we've got all night\nA slow burn feels so right",
      },
      {
        name: 'Bridge',
        measuresCount: 4,
        chords: 'Bm  |  G  |  D  |  A',
        lyrics: 'And when the morning comes\nWe will still be burning on',
      },
      {
        name: 'Outro',
        measuresCount: 2,
        chords: 'D  |  A',
        lyrics: '(let the last chord ring)',
      },
    ],
  },
]

export function totalMeasures(song: Song): number {
  return song.sections.reduce((sum, s) => sum + s.measuresCount, 0)
}
