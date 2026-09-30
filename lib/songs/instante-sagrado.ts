import type { Song } from './types'

export const song: Song = {
  id: 'instante-sagrado',
  title: 'Instante Sagrado',
  artist: 'Un Cuento Chino',
  bpm: 77,
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
      chords: 'F A Dm C Bb',
      lyrics: '(instrumental)',
    },
    {
      name: 'Verso 1',
      measuresCount: 8,
      chords: 'F A Dm C Bbm / F A Dm C Bbm / F A Dm C Bbm',
      lyrics:
        'El reloj no detiene su marcha apurada,\nesta noche no puede quedar terminada.\nSi te quise de menos y causa lamento,\nhoy te entrego mi vida en el último aliento.',
    },
    {
      name: 'Puente 1',
      measuresCount: 4,
      chords: 'F A Dm C Bb',
      lyrics:
        'Quédate hoy conmigo, no cruces la puerta,\nque la vida sin ti es una casa desierta.',
    },
    {
      name: 'Estribillo 1',
      measuresCount: 8,
      chords: 'F A Dm D# F A# A#m / F Am Dm C A# A#',
      lyrics:
        'Que el destino detenga este instante sagrado,\nque no muera el amor que tenemos guardado.\nTodavía no llega el perfecto final,\nno apaguemos la luz de este amor inmortal.',
    },
    {
      name: 'Verso 2',
      measuresCount: 8,
      chords: 'F A Dm C B / F A Dm C B / F A Dm C Bm',
      lyrics:
        'Si lo estás pensando, dilo sin demora,\nque el silencio lastima y los ojos te lloran.\nTú bien sabes que el alma se queda vacía,\nsi silenciamos de golpe nuestra melodía.',
    },
    {
      name: 'Puente 2',
      measuresCount: 4,
      chords: 'F A Dm C Bb',
      lyrics:
        'No nos dejes perdernos en este desvelo,\nmira cómo el azar nos unió desde el cielo.',
    },
    {
      name: 'Estribillo 2',
      measuresCount: 8,
      chords: 'F A Dm D# F A# A#m / F Am Dm C A# A#',
      lyrics:
        'Que el destino detenga este instante sagrado,\nque no muera el amor que tenemos guardado.\nTodavía no llega el perfecto final,',
    },
    {
      name: 'Solo de Guitarra y Synth',
      measuresCount: 8,
      chords: 'F A Dm D# F A# A#m (x2)',
      lyrics: '(instrumental)',
    },
    {
      name: 'Estribillo Final',
      measuresCount: 8,
      chords: 'F A Dm D# F A# A#m / F Am Dm C A# A#',
      lyrics:
        'Que el destino detenga este instante sagrado,\nque no muera el amor que tenemos guardado.\nTodavía no llega el perfecto final,\nno apaguemos la luz de este amor inmortal.',
    },
    {
      name: 'Outro',
      measuresCount: 4,
      chords: 'F A Dm A#',
      lyrics: 'Todavía no...\nTodavía no...\nAún no.',
    },
    {
      name: 'Final',
      measuresCount: 4,
      chords: 'F D# F D# F',
      lyrics: '(instrumental)',
    },
  ],
}