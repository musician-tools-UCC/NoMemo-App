import type { Song } from './types'

export const song: Song = {
  id: 'irresponsables',
  title: 'Irresponsables',
  artist: 'Babasónicos',
  bpm: 190,
  timeSignature: 4,
  sections: [
    {
      name: 'Preparación',
      measuresCount: 4,
      chords: '',
      lyrics: '(silencio)',
    },
    {
      name: 'Intro',
      measuresCount: 8,
      chords: 'Em',
      lyrics: '(instrumental)',
    },
    {
      name: 'Estrofa 1',
      measuresCount: 8,
      chords: 'Em Am D C Am B7',
      lyrics:
        'Somos culpables de este amor escandaloso\nQue el fuego mismo de pasión alimentó',
    },
    {
      name: 'Estrofa 1',
      measuresCount: 8,
      chords: 'Em Am D C Am B7',
      lyrics:'Que en el remanso de la noche impostergable \n Nos avergüenza seguir sintiéndolo',
    },
    {
      name: 'Estribillo (1/2)',
      measuresCount: 8,
      chords: 'Em C D Em D G Am B7 C Am B7',
      lyrics:'Poco a poco fuimos volviéndonos locos \n Y ese vapor de nuestro amor ',
    },
    {
      name: 'Estribillo (2/2)',
      measuresCount: 12,
      chords: 'Em C D Em D G Am B7 C Am B7',
      lyrics:'nos embriagó con su licor\nY culpa al carnaval interminable nos hizo confundir, irresponsables',
    },
    {
      name: 'Estrofa 2',
      measuresCount: 8,
      chords: 'Em Am D C Am B7',
      lyrics:'Si fuimos carne de la intriga casquivana\nQue la imprudencia del rumor hoy desató',
    },
    {
      name: 'Estrofa 2',
      measuresCount: 8,
      chords: 'Em Am D C Am B7',
      lyrics:'Que descubiertos por la luz de la mañana\nNos castigaron la desidia y el dolor',
    },

    {
      name: 'Estribillo (1/2)',
      measuresCount: 8,
      chords: 'Em C D Em D G Am B7 C Am B7',
      lyrics:'Poco a poco fuimos volviéndonos locos\nY ese vapor de nuestro amor ',
    },
    {
      name: 'Estribillo (2/2)',
      measuresCount: 12,
      chords: 'Em C D Em D G Am B7 C Am B7',
      lyrics:'nos embriagó con su licor\nY culpa al carnaval interminable nos hizo confundir, irresponsables',
    },

    {
      name: 'Solo de Guitarra',
      measuresCount: 16,
      chords: 'Em Am D C Am B7',
      lyrics: '(solo instrumental)',
    },
    
    {
      name: 'Estribillo (1/2)',
      measuresCount: 8,
      chords: 'Em C D Em D G Am B7 C Am B7',
      lyrics:'Poco a poco fuimos volviéndonos locos\nY ese vapor de nuestro amor ',
    },
    {
      name: 'Estribillo (2/2)',
      measuresCount: 12,
      chords: 'Em C D Em D G Am B7 C Am B7',
      lyrics:'nos embriagó con su licor\nY culpa al carnaval interminable nos hizo confundir, irresponsables',
    },
    {
      name: 'Outro',
      measuresCount: 2,
      chords: 'Em',
      lyrics: '(final)',
    },
  ],
}