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
    id: 'mujer-estrella',
    title: 'Mujer Estrella',
    artist: 'Un Cuento Chino',
    bpm: 85,
    timeSignature: 4,
    sections: [
      {
        name: 'Intro',
        measuresCount: 6,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: '(instrumental)',
      },
      {
        name: 'Verso 1',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics:
          'Caminaba por las calles de mi ciudad\nCar al bar al que me acaban de invitar\nLas tarde me envolvía en su complicidad\nTan apurado que no podía ni pensar',
      },
      {
        name: 'Puente',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Y cuando entre\nyo te mire\nNo sabia que era usted\nMujer estrella perdida',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Dime que hay que hacer\nPara que me quieras\nDime lo hare lo haré lo haré',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Como quieres que\nNo te quiera si\nTodo lo tenes lo tenes lo tenes',
      },
      {
        name: 'Verso 2 (1/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics:
          'No sabia si tenias alguien mas\nSolo quería pedirte el instragram\nPero al final me paralice\nAl darme cuenta de que usted es',
      },
      {
        name: 'Verso 2 (2/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Tan hermosa, maravillosa\nLa libertad de su alma\nSu carita toda bonita\nMe enloqueció hasta el cora',
      },
      {
        name: 'Puente',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Amo sus ojos color café\nCanela pasión en su piel\nTodo en ella es un diez',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Dime que hay que hacer\nPara que me quieras\nDime lo hare lo haré lo haré',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Como quieres que\nNo te quiera si\nTodo lo tenes lo tenes lo tenes',
      },
      {
        name: 'Solo de Guitarra',
        measuresCount: 8,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: '(instrumental)',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Dime que hay que hacer\nPara que me quieras\nDime lo hare lo haré lo haré',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: 'Como quieres que\nNo te quiera si\nTodo lo tenes lo tenes lo tenes',
      },
      {
        name: 'Final',
        measuresCount: 8,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: '(instrumental)',
      },
      {
        name: 'Cierre de Bajo',
        measuresCount: 4,
        chords: 'C#  |  C  |  Fm  |  A#',
        lyrics: '(instrumental)',
      },
    ],
  },
]

export function totalMeasures(song: Song): number {
  return song.sections.reduce((sum, s) => sum + s.measuresCount, 0)
}