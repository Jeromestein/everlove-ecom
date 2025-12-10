'use client'

import { ArrowRight } from 'lucide-react'

type Props = {
  onImpactClick: () => void
  onDonateClick: () => void
}

export function HomePageHeroSection({ onDonateClick, onImpactClick }: Props) {
  return (
    <header className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <img
          alt="Children learning"
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-800/40 mix-blend-multiply" />
      </div>

      <div className="container relative z-10 flex justify-center md:justify-start py-28 lg:py-32">
        <div className="max-w-3xl space-y-8 text-white text-center md:text-left">
          <div className="inline-block rounded-full bg-[#eb3f69]/90 px-5 py-2 text-sm font-bold uppercase tracking-[0.22em]">
            Addressing Educational Inequality
          </div>
          <h1 className="text-5xl font-extrabold leading-tight sm:text-7xl">
            Education is a{' '}
            <span className="bg-gradient-to-r from-[#eb3f69] to-pink-300 bg-clip-text text-transparent">
              Transformative Force.
            </span>
          </h1>
          <p className="text-xl text-slate-100 sm:text-2xl">
            In the regions where we work, every backpack and every book is a child&apos;s starting point to a better life.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center sm:justify-start">
            <button
              className="flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              onClick={onImpactClick}
              type="button"
            >
              See Our Impact
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              className="rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              onClick={onDonateClick}
              type="button"
            >
              Support the Cause
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
