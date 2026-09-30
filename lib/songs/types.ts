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