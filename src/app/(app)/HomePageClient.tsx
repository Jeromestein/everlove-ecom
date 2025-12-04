'use client'

import {
  ArrowRight,
  Backpack,
  BookOpen,
  ChevronRight,
  Globe,
  Heart,
  MapPin,
  Menu,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type ImpactStats = {
  books: number
  backpacks: number
  students: number
}

const NAV_ITEMS = [
  { id: 'mission', label: 'Mission' },
  { id: 'impact', label: 'Impact' },
  { id: 'stories', label: 'Stories' },
  { id: 'events', label: 'Events' },
]

const STORIES = [
  {
    title: "Aisha's First Backpack",
    location: 'Kenya',
    image:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    description: 'With her new supplies, Aisha topped her class in science for the first time.',
  },
  {
    title: 'The Village Library',
    location: 'Vietnam',
    image:
      'https://images.unsplash.com/photo-1529390003361-507a236d32f5?auto=format&fit=crop&w=1200&q=80',
    description: 'How 500 donated books transformed a community center into a hub of learning.',
  },
  {
    title: 'Tech for Tomorrow',
    location: 'Brazil',
    image:
      'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1200&q=80',
    description: 'Introducing tablets to rural classrooms opened up a world of digital literacy.',
  },
]

const EVENTS = [
  { date: 'OCT 12', title: 'Global Run for Education', location: 'Central Park, NY', type: 'Fundraiser' },
  { date: 'NOV 05', title: 'Charity Gala Night', location: 'London, UK', type: 'Gala' },
  { date: 'DEC 10', title: 'Virtual Volunteer Summit', location: 'Online', type: 'Workshop' },
]

const DONATION_TIERS = [
  { amount: '$25', impact: 'Fills 1 Backpack' },
  { amount: '$50', impact: 'Textbooks for 5 Kids' },
  { amount: '$100', impact: 'Supplies for a Class' },
  { amount: 'Custom', impact: 'Your Choice' },
]

const MISSION_POINTS = [
  'Providing essential learning materials.',
  'Building safe learning environments.',
  'Supporting local teachers and mentors.',
]

const GALLERY = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80',
]

export function HomePageClient() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [impactStats, setImpactStats] = useState<ImpactStats>({
    books: 12450,
    backpacks: 5300,
    students: 8900,
  })

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    const interval = window.setInterval(() => {
      setImpactStats((prev) => ({
        books: prev.books + Math.floor(Math.random() * 3),
        backpacks: prev.backpacks + (Math.random() > 0.7 ? 1 : 0),
        students: prev.students + (Math.random() > 0.8 ? 1 : 0),
      }))
    }, 3000)

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="bg-white text-slate-900">
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 py-3 shadow-lg backdrop-blur-xl'
            : 'bg-gradient-to-b from-slate-900/95 via-slate-900/70 to-transparent py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          <button
            className="flex items-center gap-2 rounded-full px-2 py-1 text-white transition hover:opacity-85"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            type="button"
          >
            <span className={`rounded-full p-2 ${isScrolled ? 'bg-[#eb3f69]' : 'bg-white/90'}`}>
              <Heart
                className={`h-6 w-6 ${isScrolled ? 'text-white' : 'text-[#eb3f69]'}`}
                fill="currentColor"
              />
            </span>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
              Everlove
            </span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`text-sm font-medium transition-colors ${
                  isScrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white/90 hover:text-white'
                }`}
                onClick={() => scrollToSection(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button
              className="rounded-full bg-[#eb3f69] px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#c22e53]"
              onClick={() => scrollToSection('donate')}
              type="button"
            >
              Donate Now
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} type="button">
            {mobileMenuOpen ? (
              <X className={isScrolled ? 'text-slate-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />
            )}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="mt-4 border-t border-white/20 bg-white/95 px-6 py-4 text-slate-900 shadow-xl md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className="text-left text-lg font-semibold"
                  onClick={() => scrollToSection(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
              <button
                className="w-full rounded-lg bg-[#eb3f69] py-3 text-white font-bold"
                onClick={() => scrollToSection('donate')}
                type="button"
              >
                Donate Now
              </button>
            </div>
          </div>
        ) : null}
      </nav>

      <header className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            alt="Children learning"
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1920&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-800/40 mix-blend-multiply" />
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-3xl space-y-6 text-white">
            <div className="inline-block rounded-full bg-[#eb3f69]/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]">
              Addressing Educational Inequality
            </div>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">
              Education is a{' '}
              <span className="bg-gradient-to-r from-[#eb3f69] to-pink-300 bg-clip-text text-transparent">
                Transformative Force.
              </span>
            </h1>
            <p className="text-lg text-slate-100 sm:text-xl">
              In the regions where we work, every backpack and every book is a child&apos;s starting point to a better life.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                onClick={() => scrollToSection('impact')}
                type="button"
              >
                See Our Impact
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                className="rounded-full border-2 border-white px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                onClick={() => scrollToSection('donate')}
                type="button"
              >
                Support the Cause
              </button>
            </div>
          </div>
        </div>
      </header>

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
              {MISSION_POINTS.map((point) => (
                <li className="flex items-center gap-3" key={point}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eb3f69] text-xs text-white">✓</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <img alt="Classroom" className="rounded-2xl object-cover" src={GALLERY[0]} />
              <img alt="Happy students" className="rounded-2xl object-cover md:-mt-8" src={GALLERY[1]} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24" id="stories">
        <div className="container">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#eb3f69]">Voices of Change</p>
            <h3 className="text-3xl font-bold text-slate-900 sm:text-4xl">Success Stories</h3>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STORIES.map((story) => (
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
            {EVENTS.map((event) => {
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

      <section className="relative bg-[#eb3f69] py-24 text-white" id="donate">
        <div className="container text-center">
          <Heart className="mx-auto mb-6 h-16 w-16 text-pink-200" fill="currentColor" />
          <h3 className="text-3xl font-bold sm:text-4xl">Make a Difference Today</h3>
          <p className="mx-auto mb-12 mt-4 max-w-2xl text-lg text-pink-100">
            100% of your donation goes directly to educational programs. Choose an amount to see the impact you can
            create.
          </p>

          <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {DONATION_TIERS.map((tier) => (
              <button
                className="rounded-xl border border-[#ff6c90] bg-[#d62f59] p-6 text-center transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#eb3f69]"
                key={tier.amount}
                type="button"
              >
                <span className="text-3xl font-bold">{tier.amount}</span>
                <span className="mt-2 block text-sm font-medium opacity-90">{tier.impact}</span>
              </button>
            ))}
          </div>

          <button className="rounded-full bg-white px-12 py-4 text-lg font-bold text-[#eb3f69] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl" type="button">
            Proceed to Donate
          </button>
        </div>
      </section>

      <section className="bg-gray-900 py-16 text-gray-300">
        <div className="container">
          <div className="mb-12 grid grid-cols-1 gap-12 border-b border-gray-800 pb-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <span className="rounded-full bg-[#eb3f69] p-2">
                  <Heart className="h-5 w-5 text-white" fill="currentColor" />
                </span>
                <span className="text-2xl font-bold text-white">Everlove</span>
              </div>
              <p className="mb-6 max-w-md text-gray-400">
                Dedicated to addressing global educational inequality. We believe education is the most powerful weapon
                which you can use to change the world.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <span
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-800 transition hover:bg-[#eb3f69]"
                    key={item}
                  >
                    <Globe className="h-5 w-5" />
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {['Our Story', 'Financials', 'Careers', 'Contact'].map((link) => (
                  <li key={link}>
                    <a className="transition hover:text-[#eb3f69]" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">Newsletter</h4>
              <p className="mb-4 text-sm">Stay updated on our latest projects.</p>
              <div className="flex overflow-hidden rounded-lg bg-gray-800">
                <input
                  className="w-full bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-gray-500"
                  placeholder="Email Address"
                  type="email"
                />
                <button className="bg-[#eb3f69] px-4 text-sm font-semibold text-white transition hover:bg-[#c22e53]" type="button">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between text-sm text-gray-500 md:flex-row">
            <p>&copy; 2024 Everlove Foundation. All rights reserved.</p>
            <div className="mt-4 flex gap-6 md:mt-0">
              <a className="transition hover:text-white" href="#">
                Privacy Policy
              </a>
              <a className="transition hover:text-white" href="#">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
