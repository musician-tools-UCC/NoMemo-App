import type { Song } from './types'

export const song: Song = {
  id: 'astros',
  title: 'Astros',
  artist: 'Ciro y los Persas',
  bpm: 148,
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
      chords: 'Am C G F',
      lyrics: '(instrumental)',
    },
    {
      name: 'Verso 1 (1/4)',
      measuresCount: 4,
      chords: 'Am C G F E',
      lyrics: 'Más que tus soles, quieren tu espanto \n Dale tus penas para su canto',
    },
    {
      name: 'Verso 1 (2/4)',
      measuresCount: 4,
      chords: 'Am C G F E',
      lyrics: 'Más de un esclavo vive en sus tierras \n Quieren tu savia cuando te tengan',
    },
    {
      name: 'Verso 1 (3/4)',
      measuresCount: 4,
      chords: 'Am C G F E',
      lyrics: 'Giros violentos, aún no se sienten \n Quizá te azoten cuando te encuentren',
    },
    {
      name: 'Verso 1 (4/4)',
      measuresCount: 4,
      chords: 'Am C G F E',
      lyrics: 'Sobre su vientre estás parado \n Te tocó el tiempo que te ha tocado',
    },
    {
      name: 'Estribillo 1',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Bailaré, bailarás, bailará otra vez\n Que los astros te van a ver \n Que un buen trago no viene mal \n Cuando pega la vida con tanta sed',
    },
    {
      name: 'Interludio',
      measuresCount: 4,
      chords: 'Am C G F',
      lyrics: '(instrumental)',
    },
    {
      name: 'Verso 2 (1/4)',
      measuresCount: 4,
      chords: 'Am C G F E',
      lyrics: 'Veo las rocas, siguen sangrando \n Y, sus derrotas, vos vas pagando',
    },
    {
      name: 'Verso 2 (2/4)',
      measuresCount: 4,
      chords: 'Am C G F E',
      lyrics: 'Nadie que entienda ya de tu herida \n Solo la noche se hizo tu amiga',
    },
    {
      name: 'Estribillo 2',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Bailaré, bailarás, bailará otra vez\n Que los astros te van a ver \n Que un buen trago no viene mal \n Cuando pega la vida con tanta sed',
    },
    {
      name: 'Solo de Guitarra',
      measuresCount: 8,
      chords: 'Am C G F',
      lyrics: '(solo de guitarra)',
    },
    {
      name: 'Estribillo Final x2',
      measuresCount: 16,
      chords: 'Am C G F E',
      lyrics: 'Bailaré, bailarás, bailará otra vez\n Que los astros te van a ver \n Que un buen trago no viene mal \n Cuando pega la vida con tanta sed',
    },
    {
      name: 'Outro / Cierre',
      measuresCount: 10,
      chords: 'Am C G F E Am',
      lyrics: 'Oh, oh oh oh, oh oh oh...',
    },
  ],
}