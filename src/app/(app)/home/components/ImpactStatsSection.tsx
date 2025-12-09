'use client'

import { Backpack, BookOpen, TrendingUp, Users } from 'lucide-react'

export type ImpactStats = {
  books: number
  backpacks: number
  students: number
}

type Props = {
  impactStats: ImpactStats
}

export function ImpactStatsSection({ impactStats }: Props) {
  return (
    <section className="bg-gray-50 py-20" id="impact">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eb3f69]">Real-Time Impact</p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Reach in Numbers</h2>
          </div>
          <div className="flex items-center gap-2 text-slate-600 md:mt-0">
            <span className="h-3 w-3 animate-pulse rounded-full bg-[#eb3f69]" />
            <span className="text-sm font-semibold">Live Data Syncing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl border-b-4 border-cyan-500">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-cyan-50 p-3">
                <BookOpen className="h-8 w-8 text-cyan-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="mb-2 font-mono text-5xl font-extrabold text-slate-900">
              {impactStats.books.toLocaleString()}
            </div>
            <p className="text-slate-600">Books Distributed</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[75%] animate-pulse rounded-full bg-cyan-500" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl border-b-4 border-[#eb3f69]">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-pink-50 p-3">
                <Backpack className="h-8 w-8 text-[#eb3f69]" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="mb-2 font-mono text-5xl font-extrabold text-slate-900">
              {impactStats.backpacks.toLocaleString()}
            </div>
            <p className="text-slate-600">Backpacks Provided</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[60%] animate-pulse rounded-full bg-[#eb3f69]" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl transition-shadow hover:shadow-2xl border-b-4 border-purple-500">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-lg bg-purple-50 p-3">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="mb-2 font-mono text-5xl font-extrabold text-slate-900">
              {impactStats.students.toLocaleString()}
            </div>
            <p className="text-slate-600">Students Empowered</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[85%] animate-pulse rounded-full bg-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
