import { Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ContactSection } from '../home/components/ContactSection'

export const metadata: Metadata = {
  title: 'Contact | Everlove Charity Foundation',
  description: 'Reach the Everlove team for questions, partnerships, volunteering, or donations.',
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-slate-900 text-white py-10 lg:py-16 ">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-18%] h-64 w-64 rounded-full bg-[#eb3f69]/15 blur-3xl" />
          <div className="absolute right-[-14%] bottom-[-20%] h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/85 to-slate-800/70" />
        </div>
        <div className="container relative z-10 py-16 lg:py-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-white/20">
              Contact
              <Sparkles className="h-4 w-4" />
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl">Talk with the Everlove team.</h1>
            <p className="text-lg text-slate-100">
              Have a question about donations, partnerships, or volunteering? We&apos;re here to help and will respond as
              quickly as possible.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20">
                <Mail className="h-4 w-4" />
                info@everlovecharity.com
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20">
                <Phone className="h-4 w-4" />
                +1 (626) 545-8885
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20">
                <MapPin className="h-4 w-4" />
                Orange County, CA
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-[#eb3f69] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#eb3f69]/25 transition hover:-translate-y-0.5 hover:bg-[#c22e53]"
                href="#contact"
              >
                Jump to Form
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/15"
                href="mailto:info@everlovecharity.com"
              >
                Email Us Directly
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
