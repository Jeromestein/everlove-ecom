'use client'

import { type CSSProperties, useEffect, useMemo, useState } from 'react'

import { AlertTriangle, Flame, Gauge } from 'lucide-react'

const LOSS_TARGET = 10_000_000_000_000
const LITERACY_TARGET = 8

function useAnimateNumber(from: number, to: number, duration = 2600) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    let frame: number
    let start: number | null = null
    const delta = to - from

    const animate = (timestamp: number) => {
      if (start === null) {
        start = timestamp
      }

      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      const next = from + delta * eased
      const bounded = delta < 0 ? Math.max(next, to) : Math.min(next, to)

      setValue(Math.floor(bounded))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [duration, from, to])

  return value
}

export function LearningCrisisSection() {
  const lossValue = useAnimateNumber(0, LOSS_TARGET, 4200)
  const literacyValue = useAnimateNumber(100, LITERACY_TARGET, 2000)

  const formattedLoss = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0,
      }).format(lossValue),
    [lossValue],
  )

  const formattedLiteracy = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 1,
      }).format(literacyValue),
    [literacyValue],
  )

  const lossRatio = Math.min(Math.max(lossValue / LOSS_TARGET, 0), 1)
  const lossHue = 120 * (1 - lossRatio) // 120=green at 0, 0=red at target
  const lossColor = `hsl(${Math.max(lossHue, 0)} 78% 58%)`

  const safeLiteracy = Math.max(Math.min(literacyValue, 100), 0)
  const literacyPercentWidth = `${safeLiteracy}%`
  const literacyHue = 120 * (safeLiteracy / 100) // 120=green, 0=red
  const literacyColor = `hsl(${Math.max(literacyHue, 0)} 78% 58%)`
  const literacyBarStyle: CSSProperties = {
    width: literacyPercentWidth,
    background: `linear-gradient(90deg, hsl(${Math.max(literacyHue, 0)} 78% 52%), hsl(${Math.max(
      literacyHue - 25,
      0,
    )} 80% 50%))`,
    boxShadow: `0 0 25px hsla(${Math.max(literacyHue, 0)} 78% 52% / 0.35)`,
  }

  const lossBarStyle: CSSProperties = {
    width: `${Math.max(lossRatio * 100, 6)}%`,
    background: `linear-gradient(90deg, hsl(${Math.max(lossHue, 0)} 78% 52%), hsl(${Math.max(lossHue - 20, 0)} 82% 50%))`,
    boxShadow: `0 0 25px hsla(${Math.max(lossHue, 0)} 78% 52% / 0.35)`,
  }

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-slate-950 py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#eb3f69]/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_10%,rgba(255,255,255,0.12),rgba(15,23,42,0.95))]" />
      </div>

      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#eb3f69]">Learning Crisis</p>
          <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            The world is bleeding opportunity. Every year we let children fall behind, we burn through trillions.
          </h2>
          <p className="text-lg text-slate-200">
            More than twelve zeros vanish annually because children aren&apos;t learning. At the same time, almost every child
            in low-income countries starts adolescence without being able to read and understand a simple story. The cost is
            human and economic — and it is accelerating.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Flame className="h-4 w-4 text-[#eb3f69]" />
              Economic hemorrhage
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <Gauge className="h-4 w-4 text-cyan-300" />
              Learning poverty at 10
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
            <a
              className="rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20"
              href="https://thecommonwealth.org/news/world-faces-10-trillion-economic-loss-children-and-youth-not-learning-we-need-urgent-action"
              rel="noreferrer noopener"
              target="_blank"
            >
              Data: The Commonwealth
            </a>
            <a
              className="rounded-full bg-white/10 px-3 py-1 transition hover:bg-white/20"
              href="https://www.unicef.org/cuba/en/press-releases/70-10-year-olds-now-learning-poverty-unable-read-and-understand-simple-text"
              rel="noreferrer noopener"
              target="_blank"
            >
              UNICEF — Reading by age 10
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-[#eb3f69]/10 via-transparent to-cyan-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
              <span className="h-2 w-2 rounded-full bg-[#eb3f69] animate-pulse" />
              Lost every year
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-slate-300">More than</p>
              <div className="flex min-w-0 items-baseline gap-3">
                <span className="text-4xl font-semibold sm:text-5xl" style={{ color: lossColor }}>
                  $
                </span>
                <span
                  className="min-w-0 break-words text-4xl font-black leading-none tracking-tight tabular-nums sm:text-6xl md:text-7xl"
                  style={{ color: lossColor }}
                >
                  {formattedLoss}
                </span>
              </div>
              <p className="text-base text-slate-300">
                dollars are lost every single year because children are not learning.
              </p>
            </div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={lossBarStyle} />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 shadow-2xl backdrop-blur">
            <div className="absolute inset-0 opacity-30 mix-blend-screen">
              <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(235,63,105,0.4),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.35),transparent_40%)]" />
            </div>
            <div className="relative flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">
              <AlertTriangle className="h-4 w-4 text-cyan-200" />
              Literacy by age 10
            </div>
            <div className="relative z-10 mt-6 space-y-3">
              <div className="flex items-end gap-3">
                <span className="text-6xl font-black leading-none tabular-nums sm:text-7xl md:text-8xl" style={{ color: literacyColor }}>
                  {formattedLiteracy}
                </span>
                <span className="text-3xl font-semibold sm:text-4xl" style={{ color: literacyColor }}>
                  %
                </span>
              </div>
              <p className="text-base text-slate-200">
                of children in low-income countries can read by age 10. We need to reverse this curve now.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-300">
                  <span>Reading readiness</span>
                  <span>{formattedLiteracy}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={literacyBarStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
