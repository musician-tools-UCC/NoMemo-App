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
    id: '100k-kilometros',
    title: '100k Kilometros',
    artist: 'Un Cuento Chino',
    bpm: 165,
    timeSignature: 4,
    sections: [
      {
        name: 'Preparación',
        measuresCount: 4,
        chords: '',
        lyrics: '(instrumental)',
      },
      {
        name: 'Intro',
        measuresCount: 8,
        chords: 'F C Dm G',
        lyrics: '(instrumental)',
      },
      {
        name: 'Verso 1 (1/2)',
        measuresCount: 4,
        chords: 'C E Am F Fm',
        lyrics: 'Cien mil kilómetros por hora en el tablero,\nel aire cambia y yo me apago por entero.',
      },
      {
        name: 'Verso 1 (2/2)',
        measuresCount: 4,
        chords: 'C E Am F Fm',
        lyrics: 'Flotando en medio de una nube rosa y fría,\nel mundo es chico y me olvidé la geografía.',
      },
      {
        name: 'Puente (1/2)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Miro una foto de los dos en la pantalla,',
      },
      {
        name: 'Puente (2/2)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'No puedo mantener mi mente callada.',
      },
      {
        name: 'Estribillo (1/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Y extraño a mi novia, qué situación tan obvia,',
      },
      {
        name: 'Estribillo (2/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'los días pesan más que la gravedad.',
      },
      {
        name: 'Estribillo (3/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Extraño a mi novia, me gana la fobia',
      },
      {
        name: 'Estribillo (4/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'de estar tan lejos de la realidad.',
      },
      {
        name: 'Estribillo (5/6)',
        measuresCount: 4,
        chords: 'C G F',
        lyrics: '(Oh-oh, oh-oh) No sé cómo volver.',
      },
      {
        name: 'Estribillo (6/6)',
        measuresCount: 4,
        chords: 'C G C',
        lyrics: '(Oh-oh, oh-oh) Te quiero ver.',
      },
      {
        name: 'Verso 2 (1/2)',
        measuresCount: 4,
        chords: 'C E Am F Fm',
        lyrics: 'Cien mil kilómetros metidos en la ida,\ncomiendo el tiempo como un perro sin comida.',
      },
      {
        name: 'Verso 2 (2/2)',
        measuresCount: 4,
        chords: 'C E Am F Fm',
        lyrics: 'Estoy tan lejos del sillón y de mi vida,\ncon la cabeza a la deriva y confundida.',
      },
      {
        name: 'Puente (1/4)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Ya no me sirven los paisajes de ventana,',
      },
      {
        name: 'Puente (2/4)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'si no te veo al despertar por la mañana.',
      },
      {
        name: 'Puente (3/4)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Solo pretendo aterrizar en nuestro piso,',
      },
      {
        name: 'Puente (4/4)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: "pa' rescatar el paraíso que Dios quiso.",
      },
      {
        name: 'Falso Puente (1/3)',
        measuresCount: 4,
        chords: 'C Em F G Am',
        lyrics: 'Y aunque la altura me juegue una mala pasada,\nen esta nave ya no me importa más nada.',
      },
      {
        name: 'Falso Puente (2/3)',
        measuresCount: 4,
        chords: 'F G',
        lyrics: 'Porque solo pienso en ti, si',
      },
      {
        name: 'Falso Puente (3/3)',
        measuresCount: 4,
        chords: 'F G',
        lyrics: 'solo pienso en ti.',
      },
      {
        name: 'Estribillo (1/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Y extraño a mi novia, qué situación tan obvia,',
      },
      {
        name: 'Estribillo (2/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'los días pesan más que la gravedad.',
      },
      {
        name: 'Estribillo (3/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'Extraño a mi novia, me gana la fobia',
      },
      {
        name: 'Estribillo (4/6)',
        measuresCount: 4,
        chords: 'C E Am G F Fm',
        lyrics: 'de estar tan lejos de la realidad.',
      },
      {
        name: 'Estribillo (5/6)',
        measuresCount: 4,
        chords: 'C G F',
        lyrics: '(Oh-oh, oh-oh) No sé cómo volver.',
      },
      {
        name: 'Estribillo (6/6)',
        measuresCount: 4,
        chords: 'C G C',
        lyrics: '(Oh-oh, oh-oh) Te quiero ver.',
      },
    ],
  },

  {
    id: 'mujer-estrella',
    title: 'Mujer Estrella',
    artist: 'Un Cuento Chino',
    bpm: 85,
    timeSignature: 4,
    sections: [
      {
        name: 'Preparación',
        measuresCount: 2,
        chords: '',
        lyrics: '(instrumental)',
      },
      {
        name: 'Intro',
        measuresCount: 5,
        chords: 'C# C Fm A#',
        lyrics: '(instrumental)',
      },
      {
        name: 'Verso 1',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics:
          'Caminaba por las calles de mi ciudad\nCai al bar al que me acaban de invitar\nLas tarde me envolvía en su complicidad\nTan apurado que no podía ni pensar',
      },
      {
        name: 'Puente',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Y cuando entre\nyo te mire\nNo sabia que era usted\nMujer estrella perdida',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Dime que hay que hacer\nPara que me quieras\nDime lo hare lo haré lo haré',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Como quieres que\nNo te quiera si\nTodo lo tenes lo tenes lo tenes',
      },
      {
        name: 'Verso 2 (1/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics:
          'No sabia si tenias alguien mas\nSolo quería pedirte el instragram\nPero al final me paralice\nAl darme cuenta de que usted es',
      },
      {
        name: 'Verso 2 (2/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Tan hermosa, maravillosa\nLa libertad de su alma\nSu carita toda bonita\nMe enloqueció hasta el cora',
      },
      {
        name: 'Puente',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Amo sus ojos color café\nCanela pasión en su piel\nTodo en ella es un diez',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Dime que hay que hacer\nPara que me quieras\nDime lo hare lo haré lo haré',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Como quieres que\nNo te quiera si\nTodo lo tenes lo tenes lo tenes',
      },
      {
        name: 'Solo de Guitarra',
        measuresCount: 8,
        chords: 'C# C Fm A#',
        lyrics: '(instrumental)',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Dime que hay que hacer\nPara que me quieras\nDime lo hare lo haré lo haré',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: 'Como quieres que\nNo te quiera si\nTodo lo tenes lo tenes lo tenes',
      },
      {
        name: 'Final',
        measuresCount: 8,
        chords: 'C# C Fm A#',
        lyrics: '(instrumental)',
      },
      {
        name: 'Cierre de Bajo',
        measuresCount: 4,
        chords: 'C# C Fm A#',
        lyrics: '(instrumental)',
      },
    ],
  },
]

export function totalMeasures(song: Song): number {
  return song.sections.reduce((sum, s) => sum + s.measuresCount, 0)
}