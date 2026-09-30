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
      name: 'Verso 1',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Más de un esclavo vive en sus tierras...',
    },
    {
      name: 'Verso 2',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Y los violentos aún no se sienten...',
    },
    {
      name: 'Estribillo 1',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Bailaré, bailarás, bailará otra vez...',
    },
    {
      name: 'Interludio',
      measuresCount: 4,
      chords: 'Am C G F',
      lyrics: '(instrumental)',
    },
    {
      name: 'Verso 3',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Pero las rocas siguen sangrando...',
    },
    {
      name: 'Verso 4',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Y los violentos aún no se sienten...',
    },
    {
      name: 'Estribillo 2',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Bailaré, bailarás, bailará otra vez...',
    },
    {
      name: 'Solo de Guitarra',
      measuresCount: 8,
      chords: 'Am C G F',
      lyrics: '(solo de guitarra)',
    },
    {
      name: 'Estribillo Final',
      measuresCount: 8,
      chords: 'Am C G F E',
      lyrics: 'Bailaré, bailarás, bailará otra vez...',
    },
    {
      name: 'Outro / Cierre',
      measuresCount: 10,
      chords: 'Am C G F E Am',
      lyrics: 'Oh, oh oh oh, oh oh oh...',
    },
  ],
}