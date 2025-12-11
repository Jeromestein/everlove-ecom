import { Mail, MapPin, Phone, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

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
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-white/20">
                Contact
                <Sparkles className="h-4 w-4" />
              </div>
            <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl">
              Talk with <span className="text-[#eb3f69]">Everlove</span> team.
            </h1>
              <p className="text-lg text-slate-100">
                Have a question about donations, partnerships, or volunteering? We&apos;re here to help and will respond as
                quickly as possible.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20 transition hover:bg-white/15 hover:text-[#eb3f69]"
                  href="mailto:info@everlovecharity.com"
                >
                  <Mail className="h-4 w-4" />
                  info@everlovecharity.com
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20 transition hover:bg-white/15 hover:text-[#eb3f69]"
                  href="tel:+16265458885"
                >
                  <Phone className="h-4 w-4" />
                  +1 (626) 545-8885
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20">
                  <MapPin className="h-4 w-4" />
                  208 White Cap Ln, Newport Beach, CA 92657
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
              <iframe
                title="Everlove Charity Foundation Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.7923673805203!2d-117.8309648!3d33.6106914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dce734cb479e51%3A0xdb81bf5b4f9b27ad!2s208%20White%20Cap%20Ln%2C%20Newport%20Beach%2C%20CA%2092657!5e0!3m2!1szh-CN!2sus!4v1765493524514!5m2!1szh-CN!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full lg:h-[380px]"
              />
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
