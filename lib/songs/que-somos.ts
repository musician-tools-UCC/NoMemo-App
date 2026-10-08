import type { Song } from './types'

export const song: Song = {
  id: 'que-somos',
  title: 'Que Somos',
  artist: 'Un Cuento Chino',
  bpm: 96,
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
      chords: 'Dm7 Am7 G#m Gm7 C7',
      lyrics: '(instrumental)',
    },
    {
      name: 'Verso 1 (1/4)',
      measuresCount: 4,
      chords: 'Dm7 Am7 Gm7 C7',
      lyrics: 'Dime para vos quién soy\nUn chiste mal contado y...',
    },
    {
      name: 'Verso 1 (2/4)',
      measuresCount: 4,
      chords: 'Dm7 Am7 Gm7 C7',
      lyrics: 'Ahora Volando pasando las horas\nContigo soñando drogado voy',
    },
    {
      name: 'Verso 1 (3/4)',
      measuresCount: 4,
      chords: 'Dm7 Am7 Gm7 C7',
      lyrics: 'Quisiera ver cuánto tiempo me queda\nPara descubrir mi corazón',
    },
    {
      name: 'Verso 1 (4/4)',
      measuresCount: 4,
      chords: 'Dm7 Am7 Gm7 C7',
      lyrics: 'Está dolido, arrepentido\nSolo quiero volver a sentirte otra vez',
    },

    {
      name: 'Quiebre (2/4)',
      measuresCount: 1,
      timeSignature: 2,   // <- esta sección se cuenta en 2/4
      chords: '...',
      lyrics: 'Se Viene 2/4',
    },

    {
      name: 'Pre-Coro',
      measuresCount: 6,
      chords: 'Am7 G#m Gm7 C7 Fmaj7',
      lyrics: '(transición)',
    },
    {
      name: 'Estribillo (1/4)',
      measuresCount: 4,
      chords: 'Am7 G#m Gm7 C7 Fmaj7',
      lyrics: 'Y ahora decime qué somos los dos',
    },
    {
      name: 'Estribillo (2/4)',
      measuresCount: 4,
      chords: 'Am7 G#m Gm7 C7 Fmaj7',
      lyrics: 'Infinitas noches buscandote, perdiendo la voz',
    },
    {
      name: 'Estribillo (3/4)',
      measuresCount: 4,
      chords: 'Am7 G#m Gm7 C7 Fmaj7 Fm',
      lyrics: 'Quedarme contigo o quedarme sin nada\nOtra noche fría con el alma apagada',
    },
    {
      name: 'Estribillo (4/4)',
      measuresCount: 4,
      chords: 'Dm7 E7 Am7 Gm7 C7 Fmaj7 E7',
      lyrics: 'Decime qué somos los dos...',
    },
    {
      name: 'Solo de Guitarra',
      measuresCount: 8,
      chords: 'Eb7 Dm7 Am7 Dm7 Am7 G#m Gm7 C7',
      lyrics: '(instrumental)',
    },
    {
      name: 'Verso 2 (1/2)',
      measuresCount: 4,
      chords: 'Dm7 Em7 Am7 BbMaj7',
      lyrics:
        'Puede que en la noche yo te sienta\nQue sea todo como una tormenta\nNo sé si vos sos todo lo que me atormenta\nO si es quedarme solo hasta que llegue a la meta',
    },
    {
      name: 'Verso 2 (2/2)',
      measuresCount: 4,
      chords: 'Dm7 Am7 G#m Gm7 C7',
      lyrics:
        'Qué triste de pensar que todo va a pasar\nQué triste de pensar que nada va a durar\nAl fin entendí qué es la felicidad\nUn solo momento, no la eternidad',
    },
    {
      name: 'Puente (1/2)',
      measuresCount: 4,
      chords: 'Dm7 Am7 G#m Gm7',
      lyrics: 'Perdóname, te juro que\nQuisiera ver todo lo que está mal de mí',
    },
    {
      name: 'Puente (2/2)',
      measuresCount: 4,
      chords: 'Dm7 Am7 E7',
      lyrics: 'Extrañame, abrazame\nY besame, mi amor',
    },
    {
      name: 'Estribillo Final (1/4)',
      measuresCount: 4,
      chords: 'Am7 G#m Gm7 C7 Fmaj7',
      lyrics: 'Y ahora decime qué somos los dos',
    },
    {
      name: 'Estribillo Final (2/4)',
      measuresCount: 4,
      chords: 'Am7 G#m Gm7 C7 Fmaj7',
      lyrics: 'Infinitas noches buscandote, perdiendo la voz',
    },
    {
      name: 'Estribillo Final (3/4)',
      measuresCount: 4,
      chords: 'Am7 G#m Gm7 C7 Fmaj7 Fm',
      lyrics: 'Quedarme contigo o quedarme sin nada\nOtra noche fría con el alma apagada',
    },
    {
      name: 'Estribillo Final (4/4)',
      measuresCount: 4,
      chords: 'Dm7 E7 Am7 Gm7 C7 Fmaj7 E7',
      lyrics: 'Decime qué somos los dos...',
    },
    {
      name: 'Solo Final',
      measuresCount: 12,
      chords: 'Dm7 Am7 G#m Gm7 C7 Fmaj7',
      lyrics: '(instrumental)',
    },
  ],
}