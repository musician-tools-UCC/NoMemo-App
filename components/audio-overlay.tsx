'use client'

import { Bluetooth, BluetoothOff, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AudioOverlayProps {
  onEnable: () => void
  bluetoothMode: boolean
  latencyMs: number
  onChangeBluetoothMode: (enabled: boolean) => void
  onChangeLatency: (ms: number) => void
}

function testRawBeep() {
  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext
    const ctx = new AudioContextClass()
    console.log('[TEST] AudioContext state al crear:', ctx.state)
    ctx.resume().then(() => {
      console.log('[TEST] AudioContext state despues de resume:', ctx.state)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.8, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.5)
      console.log('[TEST] Beep crudo disparado, deberia sonar 0.5s')
    })
  } catch (err) {
    console.error('[TEST] Error al crear AudioContext:', err)
  }
}

export function AudioOverlay({
  onEnable,
  bluetoothMode,
  latencyMs,
  onChangeBluetoothMode,
  onChangeLatency,
}: AudioOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-slate-950/95 px-6 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Stage Teleprompter
        </h1>
        <p className="max-w-md text-balance text-slate-400">
          Metronome &amp; lyric prompter for live performance.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <span className="text-center text-xs font-bold uppercase tracking-widest text-slate-500">
          ¿Cómo vas a conectar el audio?
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChangeBluetoothMode(false)}
            className={cn(
              'flex flex-1 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition-colors',
              !bluetoothMode
                ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                : 'border-slate-800 bg-slate-900/40 text-slate-400',
            )}
          >
            <BluetoothOff className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-bold">Sin Bluetooth</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeBluetoothMode(true)}
            className={cn(
              'flex flex-1 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition-colors',
              bluetoothMode
                ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                : 'border-slate-800 bg-slate-900/40 text-slate-400',
            )}
          >
            <Bluetooth className="h-5 w-5" aria-hidden="true" />
            <span className="text-sm font-bold">Con Bluetooth</span>
          </button>
        </div>

        {bluetoothMode && (
          <div className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">
                Delay de tu Bluetooth
              </span>
              <span className="font-mono text-sm text-emerald-300">{latencyMs} ms</span>
            </div>
            <input
              type="range"
              min={0}
              max={400}
              step={10}
              value={latencyMs}
              onChange={(e) => onChangeLatency(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-emerald-400"
            />
            <p className="text-xs text-slate-500">
              Si la letra te queda adelantada al clic que escuchás, subí este valor.
              Podés ajustarlo también durante el show.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onEnable}
        className="group flex items-center gap-3 rounded-2xl bg-emerald-400 px-10 py-6 text-xl font-bold text-slate-950 shadow-2xl shadow-emerald-400/20 transition-transform active:scale-95 sm:text-2xl"
      >
        <Volume2 className="h-7 w-7" aria-hidden="true" />
        Tap to Enable Audio
      </button>
      <p className="text-sm text-slate-500">
        Required for iOS / mobile Web Audio playback
      </p>

      {/* Botón de diagnóstico temporal — lo sacamos una vez resuelto el problema */}
      <button
        type="button"
        onClick={testRawBeep}
        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-300"
      >
        🔧 Test: Beep crudo (sin Tone.js)
      </button>
    </div>
  )
}