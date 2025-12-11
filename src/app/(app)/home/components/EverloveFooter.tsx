'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import { Outfit } from 'next/font/google'
import Link from 'next/link'

import { NAV_ITEMS } from '../constants'
import { EverloveLogo } from './EverloveLogo'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

export function EverloveFooter() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <section className="bg-gray-900 py-16 text-gray-300">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-12 border-b border-gray-800 pb-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <EverloveLogo size={64} />
              <div className="flex flex-col text-left">
                <span className={`${outfit.className} text-2xl font-bold leading-tight`}>Everlove</span>
                <span className={`${outfit.className} text-sm text-muted-foreground tracking-wide`}>CHARITY FOUNDATION</span>
              </div>
            </div>
            <p className="max-w-xl text-gray-400">
              Dedicated to addressing global educational inequality. We believe education is the most powerful weapon
              which you can use to change the world.
            </p>
            <p className="max-w-xl text-sm text-gray-400">
              Everlove Charity Foundation is a 501(c)3 tax-exempt organization (ID: 33-4447023). Your donation is tax
              deductible within U.S. guidelines; we email a receipt after each gift.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    className="transition hover:text-[#eb3f69]"
                    onClick={() => scrollToSection(item.id)}
                    type="button"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#eb3f69]" />
                <a className="hover:text-[#eb3f69]" href="mailto:info@everlovecharity.com">
                  info@everlovecharity.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#eb3f69]" />
                <a className="hover:text-[#eb3f69]" href="tel:+16265458885">
                  +1 (626) 545-8885
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#eb3f69]" />
                <span>208 White Cap Ln, Newport Beach, CA 92657</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between text-sm text-gray-500 md:flex-row">
          <p>&copy; 2025 Everlove Foundation. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link className="transition hover:text-[#eb3f69]" href="/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-[#eb3f69]" href="/terms-of-service">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
