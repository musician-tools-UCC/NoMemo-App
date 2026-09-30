import type { Song } from './types'

export const song: Song = {
  id: 'irresponsables',
  title: 'Irresponsables',
  artist: 'Babasónicos',
  bpm: 94,
  timeSignature: 4,
  sections: [
    {
      name: 'Preparación',
      measuresCount: 2,
      chords: '',
      lyrics: '(silencio)',
    },
    {
      name: 'Intro',
      measuresCount: 4,
      chords: 'Em',
      lyrics: '(instrumental)',
    },
    {
      name: 'Estrofa 1',
      measuresCount: 8,
      chords: 'Em Am D C Am B',
      lyrics:
        'Somos culpables de este amor escandaloso\nQue el fuego mismo de pasión alimentó\nQue, en el remanso de la noche impostergable\nNos avergüenza seguir sintiéndolo',
    },
    {
      name: 'Estribillo 1',
      measuresCount: 12,
      chords: 'Em C D Em D G Am B C Am B',
      lyrics:
        'Poco a poco fuimos volviéndonos locos\nY ese vapor de nuestro amor nos embriagó con su licor\nY culpa al carnaval interminable nos hizo confundir, irresponsables',
    },
    {
      name: 'Estrofa 2',
      measuresCount: 8,
      chords: 'Em Am D C Am B',
      lyrics:
        'Si fuimos carne de la intriga casquivana\nQue la imprudencia del rumor hoy desató\nQue, descubiertos por la luz de la mañana\nNos castigaron la desidia y el dolor',
    },
    {
      name: 'Solo de Guitarra',
      measuresCount: 8,
      chords: 'Em Am D C Am B',
      lyrics: '(solo instrumental)',
    },
    {
      name: 'Estribillo 2',
      measuresCount: 12,
      chords: 'Em C D Em D G Am B C Am B',
      lyrics:
        'Poco a poco fuimos volviéndonos locos\nY ese vapor de nuestro amor nos embriagó con su licor\nY culpa al carnaval interminable nos hizo confundir, irresponsables',
    },
    {
      name: 'Estribillo Final',
      measuresCount: 12,
      chords: 'Em C D Em D G Am B C Am B',
      lyrics:
        'Poco a poco fuimos volviéndonos locos\nY ese vapor de nuestro amor nos embriagó con su licor\nY culpa al carnaval interminable nos hizo confundir, irresponsables',
    },
    {
      name: 'Outro',
      measuresCount: 4,
      chords: 'Em',
      lyrics: '(final)',
    },
  ],
}