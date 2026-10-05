export interface Section {
  name: string
  measuresCount: number
  chords: string
  lyrics: string
  /** Opcional: si esta sección tiene un compás distinto al de la canción
   * (ej. un quiebre en 2/4 dentro de una canción en 4/4). Si no se
   * especifica, usa el timeSignature de la canción. */
  timeSignature?: number
}

export interface Song {
  id: string
  title: string
  artist?: string
  bpm: number
  /** Beats per measure por defecto, e.g. 4 for 4/4 */
  timeSignature: number
  sections: Section[]
}