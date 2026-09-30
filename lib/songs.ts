import type { Section, Song } from './songs/types'

// Cada canción vive en su propio archivo dentro de lib/songs/.
// Para agregar una nueva: 1) creá lib/songs/nombre-cancion.ts siguiendo el
// mismo formato que las demás, 2) importala acá abajo, 3) agregala al
// array SONGS en el orden en que la tocan en vivo.
import { song as kilometros100k } from './songs/100k-kilometros'
import { song as treintaAnos } from './songs/30-anos'
import { song as comoQueman } from './songs/como-queman'
import { song as quieroVerteDeNafta } from './songs/quiero-verte-de-nafta'
import { song as cuchilloGuantanamera } from './songs/cuchillo-guantanamera'
import { song as queSomos } from './songs/que-somos'
import { song as astros } from './songs/astros'
import { song as instanteSagrado } from './songs/instante-sagrado'
import { song as irresponsables } from './songs/irresponsables'
import { song as mujerEstrella } from './songs/mujer-estrella'

export type { Section, Song }

export const SONGS: Song[] = [
  irresponsables,
  treintaAnos,
  comoQueman,
  kilometros100k,
  quieroVerteDeNafta,
  queSomos,
  cuchilloGuantanamera,
  astros,
  instanteSagrado,
  mujerEstrella,
]

export function totalMeasures(song: Song): number {
  return song.sections.reduce((sum, s) => sum + s.measuresCount, 0)
}