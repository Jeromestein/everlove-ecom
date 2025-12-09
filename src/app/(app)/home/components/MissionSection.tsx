'use client'

type Props = {
  points: string[]
  gallery: string[]
}

export function MissionSection({ points, gallery }: Props) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-24 text-white" id="mission">
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-slate-800 opacity-50 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#eb3f69] opacity-20 blur-3xl" />

      <div className="container relative z-10 flex flex-col items-center gap-16 md:flex-row">
        <div className="md:w-1/2">
          <h2 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl">Bridging the Gap, One Child at a Time.</h2>
          <p className="mb-6 text-lg leading-relaxed text-slate-300">
            We believe that talent is equally distributed, but opportunity is not. Our mission is to dismantle the
            barriers that keep children from accessing quality education.
          </p>
          <ul className="space-y-4 text-lg font-medium text-white">
            {points.map((point) => (
              <li className="flex items-center gap-3" key={point}>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eb3f69] text-xs text-white">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            <img alt="Classroom" className="rounded-2xl object-cover" src={gallery[0]} />
            <img alt="Happy students" className="rounded-2xl object-cover md:-mt-8" src={gallery[1]} />
          </div>
        </div>
      </div>
    </section>
  )
}
