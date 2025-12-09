'use client'

import { MapPin } from 'lucide-react'

export type EventItem = {
  date: string
  title: string
  location: string
  type: string
}

type Props = {
  events: EventItem[]
}

export function EventsSection({ events }: Props) {
  return (
    <section className="bg-gray-50 py-24" id="events">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eb3f69]">Get Involved</p>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Upcoming Activities</h3>
          </div>
          <button className="hidden text-sm font-bold text-slate-700 transition hover:text-slate-900 md:block" type="button">
            View All Calendar
          </button>
        </div>

        <div className="space-y-4">
          {events.map((event) => {
            const [month, day] = event.date.split(' ')
            return (
              <article
                className="flex flex-col items-center gap-6 rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md md:flex-row md:text-left"
                key={event.title}
              >
                <div className="min-w-[100px] rounded-xl bg-slate-100 p-4 text-slate-800">
                  <div className="text-sm font-bold uppercase tracking-wide">{month}</div>
                  <div className="text-3xl font-extrabold">{day}</div>
                </div>
                <div className="flex-grow">
                  <span className="mb-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600">
                    {event.type}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 transition-colors hover:text-[#eb3f69]">{event.title}</h4>
                  <p className="mt-1 flex items-center justify-center gap-1 text-slate-500 md:justify-start">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </p>
                </div>
                <button
                  className="rounded-full border-2 border-[#eb3f69] px-6 py-2 font-bold text-[#eb3f69] transition hover:bg-[#eb3f69] hover:text-white"
                  type="button"
                >
                  Register
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
