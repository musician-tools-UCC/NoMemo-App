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
        lyrics: '(silencio)',
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
    id: '30-anos',
    title: '30 Años',
    artist: 'Conociendo Rusia',
    bpm: 127,
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
        name: 'Verso 1 (1/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Ya tengo casi 30 años\nPor la noches no me quiero dormir',
      },
      {
        name: 'Verso 1 (2/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Voy soñando despierto sin pestañar, escribiendo en la cocina',
      },
      {
        name: 'Verso 1 (3/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Aprendí a guardar bien los secretos\nNunca pido lo que no me dan',
      },
      {
        name: 'Verso 1 (4/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Vos sabes que aparezco sin avisar\nTraje flores de la huerta',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nEn la calle no hay porque reír',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nY en la tele pare de sufrir',
      },
      {
        name: 'Interludio',
        measuresCount: 4,
        chords: 'Em',
        lyrics: '(instrumental)',
      },
      {
        name: 'Verso 2 (1/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Ya volví de donde sople el viento\nAl fin tengo un poco de calor',
      },
      {
        name: 'Verso 2 (2/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Ya mordí la banquina y me levanté\nEncontré agua en el desierto',
      },
      {
        name: 'Verso 2 (3/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Siento la lluvia que cae por el techo\nAlgunos perros que ladran por ahí',
      },
      {
        name: 'Verso 2 (4/4)',
        measuresCount: 4,
        chords: 'Em Bm Em C F#m7 B7 Em',
        lyrics: 'Un recuerdo olvidado de Miramar\nY que nunca se termina',
      },
      {
        name: 'Estribillo (1/2)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nEn la calle no hay porque reír',
      },
      {
        name: 'Estribillo (2/2)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nY en la tele pare de sufrir',
      },
      {
        name: 'Puente (1/4)',
        measuresCount: 4,
        chords: 'C G Bm Em C D# Bm B7 Em',
        lyrics: 'No me cabe más nada en el pecho',
      },
      {
        name: 'Puente (2/4)',
        measuresCount: 4,
        chords: 'C G Bm Em C D# Bm B7 Em',
        lyrics: 'No me importa lo que diga la gilada',
      },
      {
        name: 'Puente (3/4)',
        measuresCount: 4,
        chords: 'C G Bm Em C D# Bm B7 Em',
        lyrics: 'Y la mirada de todos los demás',
      },
      {
        name: 'Puente (4/4)',
        measuresCount: 2,
        chords: 'C G Bm Em C D# Bm B7 Em',
        lyrics: '',
      },
      {
        name: 'Solo de Guitarra',
        measuresCount: 8,
        chords: 'G Em',
        lyrics: '(instrumental)',
      },
      {
        name: 'Estribillo Final (1/4)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nEn la calle no hay porque reír',
      },
      {
        name: 'Estribillo Final (2/4)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nQue la tele pare de sufrir',
      },
      {
        name: 'Estribillo Final (3/4)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nEn la calle no hay porque reír',
      },
      {
        name: 'Estribillo Final (4/4)',
        measuresCount: 4,
        chords: 'C G B7 Em C G B7 F#m7 Em',
        lyrics: 'Yo estoy esperando\nQue la tele pare de sufrir',
      },
      {
        name: 'Cierre',
        measuresCount: 4,
        chords: 'B7 F#m7 Em B7 Em',
        lyrics: 'En la calle no hay porque reír\nMira la tele pare de sufrir',
      },
      {
        name: 'Outro',
        measuresCount: 4,
        chords: 'Em G',
        lyrics: '(instrumental)',
      },
    ],
  },

    {
    id: 'como-queman',
    title: 'Como Queman',
    artist: 'Un Cuento Chino',
    bpm: 127,
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
        measuresCount: 16,
        chords: 'Em G Am B7 (x4) / Em Am B7 Em',
        lyrics: '(instrumental)',
      },
      {
        name: 'Verso 1 (1/4)',
        measuresCount: 4,
        chords: 'Em Am',
        lyrics: 'Vuelvo a cruzar por el callejón,\ncon el recuerdo en el corazón.',
      },
      {
        name: 'Verso 1 (2/4)',
        measuresCount: 4,
        chords: 'B7 Em',
        lyrics: 'El eco lento de tu caminar,\ntodavía sabe cómo regresar.',
      },
      {
        name: 'Verso 1 (3/4)',
        measuresCount: 4,
        chords: 'Em Am',
        lyrics: 'Las viejas letras que te canté,\nsiguen marcadas sobre mi piel,',
      },
      {
        name: 'Verso 1 (4/4)',
        measuresCount: 4,
        chords: 'D G B7',
        lyrics: 'como ese nombre en el cristal\nque la tormenta no va a borrar.',
      },
      {
        name: 'Pre-Coro (1/2)',
        measuresCount: 4,
        chords: 'C Em',
        lyrics: 'Y aunque juro que ya me fui,\nsiempre termino volviendo aquí.',
      },
      {
        name: 'Pre-Coro (2/2)',
        measuresCount: 4,
        chords: 'Am B7',
        lyrics: 'Donde tu nombre se me quedó,\ndonde mi alma se perdió.',
      },
      {
        name: 'Coro (1/4)',
        measuresCount: 4,
        chords: 'Em Am',
        lyrics: '¡Y vuelvo a recorrer, vuelvo a recorrer!\nEsos pasajes que me hacen volver.',
      },
      {
        name: 'Coro (2/4)',
        measuresCount: 4,
        chords: 'D G B7',
        lyrics: 'A la melodía de tu dulce voz,\nal dolor amargo de nuestro adiós.',
      },
      {
        name: 'Coro (3/4)',
        measuresCount: 4,
        chords: 'C B7',
        lyrics: 'Esas letras que un día te canté,\nesas letras que tanto lloré...',
      },
      {
        name: 'Coro (4/4)',
        measuresCount: 4,
        chords: 'Em G Am B7',
        lyrics: '¡Ay, cómo queman hoy!\n¡Ay, cómo queman hoy!',
      },
      {
        name: 'Verso 2 (1/4)',
        measuresCount: 4,
        chords: 'Em Am D',
        lyrics: 'Quedó tu taza sobre el balcón,\ngris y vacía, sin tu ilusión.',
      },
      {
        name: 'Verso 2 (2/4)',
        measuresCount: 4,
        chords: 'G B7',
        lyrics: 'Dejaste el eco de tu reír,\ny desde entonces no sé vivir.',
      },
      {
        name: 'Verso 2 (3/4)',
        measuresCount: 4,
        chords: 'Em Am D',
        lyrics: 'Miro los vidrios, tiembla el cristal,\nmientras la tarde empieza a bajar.',
      },
      {
        name: 'Verso 2 (4/4)',
        measuresCount: 4,
        chords: 'G B7',
        lyrics: 'En cada esquina de la ciudad,\nsolo me responde tu soledad.',
      },
      {
        name: 'Pre-Coro (1/2)',
        measuresCount: 4,
        chords: 'C Em',
        lyrics: 'Y aunque juro que ya me fui,\nsiempre termino volviendo aquí.',
      },
      {
        name: 'Pre-Coro (2/2)',
        measuresCount: 4,
        chords: 'Am B7',
        lyrics: 'Donde tu nombre se me quedó,\ndonde mi alma se perdió.',
      },
      {
        name: 'Coro (1/4)',
        measuresCount: 4,
        chords: 'Em Am',
        lyrics: '¡Y vuelvo a recorrer, vuelvo a recorrer!\nEsos pasajes que me hacen volver.',
      },
      {
        name: 'Coro (2/4)',
        measuresCount: 4,
        chords: 'D G B7',
        lyrics: 'A la melodía de tu dulce voz,\nal dolor amargo de nuestro adiós.',
      },
      {
        name: 'Coro (3/4)',
        measuresCount: 4,
        chords: 'C B7',
        lyrics: 'Esas letras que un día te canté,\nesas letras que tanto lloré...',
      },
      {
        name: 'Coro (4/4)',
        measuresCount: 4,
        chords: 'Em G Am B7',
        lyrics: '¡Ay, cómo queman hoy!\n¡Ay, cómo queman hoy!',
      },
      {
        name: 'Solo Trompeta y Guitarra Eléctrica',
        measuresCount: 16,
        chords: 'Em Am C D Em B7 / Em G Am B7 (x4)',
        lyrics: '(instrumental)',
      },
      {
        name: 'Coro Final (1/5)',
        measuresCount: 4,
        chords: 'Em Am',
        lyrics: '¡Y vuelvo a recorrer, vuelvo a recorrer!\nEsos pasajes que me hacen volver.',
      },
      {
        name: 'Coro Final (2/5)',
        measuresCount: 4,
        chords: 'D G B7',
        lyrics: 'A la melodía de tu dulce voz,\nal dolor amargo de nuestro adiós.',
      },
      {
        name: 'Coro Final (3/5)',
        measuresCount: 4,
        chords: 'C B7',
        lyrics: 'Esas letras que un día te canté,\nesas letras que tanto lloré...',
      },
      {
        name: 'Coro Final (4/5)',
        measuresCount: 4,
        chords: 'Em G Am B7',
        lyrics: '¡Ay, cómo queman hoy!\n¡Ay, cómo queman hoy!',
      },
      {
        name: 'Coro Final (5/5)',
        measuresCount: 3,
        chords: 'Em G Am B7',
        lyrics: '¡Ay, cómo queman hoy!\n¡Ay, cómo queman hoy!',
      }
    ],
  },

  {
    id: 'que-somos',
    title: 'Que Somos',
    artist: 'Un Cuento Chino',
    bpm: 128,
    timeSignature: 4,
    sections: []
  },

    {
    id: 'cuchillo-guantanamera',
    title: 'Cuchillo Guantanamera',
    artist: 'Airbag',
    bpm: 128,
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
        measuresCount: 12,
        chords: 'Am (riff)  F C E Am  F C G G7 (sostenido)',
        lyrics: '(instrumental)',
      },
      {
        name: 'Verso 1 (1/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Tengo el presentimiento de que algo va a pasar',
      },
      {
        name: 'Verso 1 (2/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'La niebla esta cubriendo toda, toda la ciudad',
      },
      {
        name: 'Verso 1 (3/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'He tomado precauciones por si está acá',
      },
      {
        name: 'Verso 1 (4/4)',
        measuresCount: 4,
        chords: 'F C E E7',
        lyrics: 'No me asusta nada, nada mas',
      },
      {
        name: 'Estribillo (1/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Siento que esta vez viene por mi\nY me ataca en la oscuridad',
      },
      {
        name: 'Estribillo (2/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Oh no quiero mas saber de mi\nEl futuro prende mi ansiedad',
      },
      {
        name: 'Estribillo (3/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Pero poco a poco te vencí\nA cuchillos en la oscuridad',
      },
      {
        name: 'Estribillo (4/4)',
        measuresCount: 4,
        chords: 'F C G G7',
        lyrics: 'Oh no quiero mas saber de mi',
      },
      {
        name: 'Verso 2 (1/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Las cartas esta noche solas se repartirán',
      },
      {
        name: 'Verso 2 (2/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Y nuestro destino en sus manos quedara',
      },
      {
        name: 'Verso 2 (3/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Hay secreteos escondidos en la luna de hoy',
      },
      {
        name: 'Verso 2 (4/4)',
        measuresCount: 4,
        chords: 'F C E E7',
        lyrics: 'El pasado guarda tu dolor',
      },
      {
        name: 'Estribillo (1/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Siento que esta vez viene por mi\nY me ataca en la oscuridad',
      },
      {
        name: 'Estribillo (2/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Oh no quiero mas saber de mi\nEl futuro prende mi ansiedad',
      },
      {
        name: 'Estribillo (3/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Pero poco a poco te vencí\nA cuchillos en la oscuridad',
      },
      {
        name: 'Estribillo (4/4)',
        measuresCount: 4,
        chords: 'F C G G7',
        lyrics: 'Oh no quiero mas saber de mi',
      },
      {
        name: 'Solo de Guitarra',
        measuresCount: 16,
        chords: 'F C E Am (x4)',
        lyrics: '(instrumental)',
      },
      {
        name: 'Estribillo Final (1/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Siento que esta vez viene por mi\nY me ataca en la oscuridad',
      },
      {
        name: 'Estribillo Final (2/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Oh no quiero mas saber de mi\nEl futuro prende mi ansiedad',
      },
      {
        name: 'Estribillo Final (3/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Pero poco a poco te vencí\nA cuchillos en la oscuridad',
      },
      {
        name: 'Estribillo Final (4/4)',
        measuresCount: 4,
        chords: 'F C E Am',
        lyrics: 'Oh no quiero mas saber de mi\nA cuchillos en la oscuridad',
      },
      {
        name: 'Final',
        measuresCount: 10,
        chords: 'F C E Am  F C G G7  Am (calderón)',
        lyrics: '(instrumental)',
      },
    ],
  },

  {
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
        lyrics: '(silencio)',
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