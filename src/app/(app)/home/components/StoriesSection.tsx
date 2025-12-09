'use client'

import { ChevronRight, MapPin } from 'lucide-react'

export type Story = {
  title: string
  location: string
  image: string
  description: string
}

type Props = {
  stories: Story[]
}

export function StoriesSection({ stories }: Props) {
  return (
    <section className="bg-white py-24" id="stories">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eb3f69]">Voices of Change</p>
          <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Success Stories</h3>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <article className="group cursor-pointer" key={story.title}>
              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">
                <div className="absolute inset-0 z-10 bg-black/20 transition-colors group-hover:bg-black/0" />
                <img
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={story.image}
                />
                <div className="absolute left-4 top-4 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 backdrop-blur-sm">
                  <MapPin className="h-3 w-3" />
                  {story.location}
                </div>
              </div>
              <h4 className="mb-2 text-2xl font-bold text-slate-900 transition-colors group-hover:text-[#eb3f69]">
                {story.title}
              </h4>
              <p className="mb-4 text-slate-600">{story.description}</p>
              <div className="flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-[#eb3f69] transition-all group-hover:gap-2">
                Read Full Story <ChevronRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
