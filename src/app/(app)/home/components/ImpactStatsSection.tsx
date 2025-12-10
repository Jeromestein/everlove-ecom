'use client'

import { useEffect, useMemo, useState } from 'react'

import { Backpack, BookOpen, Users } from 'lucide-react'

export type ImpactStats = {
  books: number
  backpacks: number
  students: number
}

type Props = {
  impactStats: ImpactStats
}

type SparklineProps = {
  points: number[]
  color: string
  id: string
}

const SPARK_COLORS: Record<keyof ImpactStats, string> = {
  books: '#06b6d4',
  backpacks: '#eb3f69',
  students: '#8b5cf6',
}

const HISTORY_LENGTH = 18

const generateSeedSeries = (value: number) =>
  Array.from({ length: HISTORY_LENGTH }, (_, i) => value - (HISTORY_LENGTH - i) * Math.max(1, Math.round(value * 0.0012)))

function Sparkline({ points, color, id }: SparklineProps) {
  const width = 260
  const height = 120
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const path = points
    .map((value, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width
      const y = height - ((value - min) / range) * height
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
  const endY = height - ((points.at(-1)! - min) / range) * height

  return (
    <svg aria-hidden="true" className="h-32 w-full" role="presentation" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((ratio) => (
        <line
          key={ratio}
          stroke="rgba(148,163,184,0.25)"
          strokeDasharray="4 6"
          strokeWidth="1"
          x1="0"
          x2={width}
          y1={height * ratio}
          y2={height * ratio}
        />
      ))}
      <path d={`${path} L${width},${height} L0,${height} Z`} fill={`url(#${id}-fill)`} opacity="0.7" />
      <path d={path} fill="none" stroke={color} strokeLinecap="round" strokeWidth="3.5" />
      <circle cx={width} cy={endY} fill={color} r="4" />
    </svg>
  )
}

export function ImpactStatsSection({ impactStats }: Props) {
  const [history, setHistory] = useState<Record<keyof ImpactStats, number[]>>({
    books: generateSeedSeries(impactStats.books),
    backpacks: generateSeedSeries(impactStats.backpacks),
    students: generateSeedSeries(impactStats.students),
  })

  useEffect(() => {
    setHistory((prev) => ({
      books: [...prev.books.slice(1), impactStats.books],
      backpacks: [...prev.backpacks.slice(1), impactStats.backpacks],
      students: [...prev.students.slice(1), impactStats.students],
    }))
  }, [impactStats.backpacks, impactStats.books, impactStats.students])

  const sparkData = useMemo(
    () => ({
      books: history.books,
      backpacks: history.backpacks,
      students: history.students,
    }),
    [history.backpacks, history.books, history.students],
  )

  const deltas = useMemo(
    () => ({
      books: sparkData.books.at(-1)! - sparkData.books.at(-2)!,
      backpacks: sparkData.backpacks.at(-1)! - sparkData.backpacks.at(-2)!,
      students: sparkData.students.at(-1)! - sparkData.students.at(-2)!,
    }),
    [sparkData.backpacks, sparkData.books, sparkData.students],
  )

  const cards: Array<{
    key: keyof ImpactStats
    title: string
    icon: JSX.Element
    border: string
    bg: string
    barWidth: string
  }> = [
    {
      key: 'books',
      title: 'Books Distributed',
      icon: (
        <div className="rounded-lg bg-cyan-50 p-3">
          <BookOpen className="h-8 w-8 text-cyan-600" />
        </div>
      ),
      border: 'border-cyan-500',
      bg: 'bg-gradient-to-br from-white to-cyan-50/30',
      barWidth: '75%',
    },
    {
      key: 'backpacks',
      title: 'Backpacks Provided',
      icon: (
        <div className="rounded-lg bg-pink-50 p-3">
          <Backpack className="h-8 w-8 text-[#eb3f69]" />
        </div>
      ),
      border: 'border-[#eb3f69]',
      bg: 'bg-gradient-to-br from-white to-pink-50/30',
      barWidth: '60%',
    },
    {
      key: 'students',
      title: 'Students Empowered',
      icon: (
        <div className="rounded-lg bg-purple-50 p-3">
          <Users className="h-8 w-8 text-purple-600" />
        </div>
      ),
      border: 'border-purple-500',
      bg: 'bg-gradient-to-br from-white to-purple-50/30',
      barWidth: '85%',
    },
  ]

  return (
    <section className="bg-gray-50 py-20" id="impact">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eb3f69]">Real-Time Impact</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Reach in Numbers</h2>
          </div>
          <div className="flex items-center gap-2 text-slate-600 md:mt-0">
            <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold">Live Data Syncing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ key, title, icon, border, bg, barWidth }) => {
            const value = impactStats[key]
            const delta = deltas[key]
            const color = SPARK_COLORS[key]
            const up = delta >= 0

            return (
              <div
                className={`rounded-3xl ${bg} p-6 shadow-xl ring-1 ring-slate-200 transition-shadow hover:shadow-2xl ${border}`}
                key={key}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {icon}
                    <div className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{title}</div>
                  </div>
                  <div className="text-xs font-semibold text-slate-500">Live trend</div>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-inner">
                  <Sparkline color={color} id={`spark-${key}`} points={sparkData[key]} />
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Total</p>
                    <div className="text-3xl font-black text-slate-900 sm:text-4xl">{value.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Change</p>
                    <div className="text-sm font-semibold" style={{ color }}>
                      {up ? '+' : ''}
                      {delta.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full animate-pulse rounded-full" style={{ backgroundColor: color, width: barWidth }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
