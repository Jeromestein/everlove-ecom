'use client'

import { Menu, X } from 'lucide-react'
import { Outfit } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { NAV_ITEMS } from '../constants'
import { EverloveLogo } from './EverloveLogo'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
})

export function EverloveHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const hasBackground = isScrolled || mobileMenuOpen

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setMobileMenuOpen(false)
      return
    }

    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = `/#${id}`
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        hasBackground
          ? 'py-3 shadow-lg backdrop-blur-xl bg-white/80 supports-[backdrop-filter]:bg-white/60'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <button
          className="flex items-center gap-2 rounded-full px-2 py-1 text-white transition hover:opacity-85"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setMobileMenuOpen(false)
          }}
          type="button"
        >
          <span
            className={`flex items-center justify-center rounded-full p-1.5 `}
          >
            <EverloveLogo size={64} priority />
          </span>
          <div className="flex flex-col text-left">
            <span className={`${outfit.className} text-2xl font-bold leading-tight ${hasBackground ? 'text-slate-900' : 'text-white'}`}>
              Everlove
            </span>
            <span className={`${outfit.className} text-sm text-muted-foreground tracking-wide ${hasBackground ? 'text-slate-900' : 'text-white'}`}>
              CHARITY FOUNDATION
            </span>
          </div>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            key="home"
            className={`text-base font-medium transition-colors ${
              hasBackground ? 'text-slate-700' : 'text-white/90'
            }`}
            href="/"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="underline-offset-4 decoration-2 transition-colors hover:text-[#eb3f69] hover:underline hover:decoration-[#eb3f69]">
              Home
            </span>
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              className={`text-base font-medium transition-colors ${
                hasBackground ? 'text-slate-700' : 'text-white/90'
              }`}
              href={`/#${item.id}`}
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(item.id)
              }}
            >
              <span className="underline-offset-4 decoration-2 transition-colors hover:text-[#eb3f69] hover:underline hover:decoration-[#eb3f69]">
                {item.label}
              </span>
            </Link>
          ))}
          <Link
            className={`text-base font-medium transition-colors ${
              hasBackground ? 'text-slate-700' : 'text-white/90'
            }`}
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="underline-offset-4 decoration-2 transition-colors hover:text-[#eb3f69] hover:underline hover:decoration-[#eb3f69]">
              Contact
            </span>
          </Link>
          <Link
            className="inline-flex items-center justify-center rounded-full bg-[#eb3f69] px-7 py-3 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#c22e53]"
            href="/donate"
            onClick={() => setMobileMenuOpen(false)}
          >
            Donate Now
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen((prev) => !prev)} type="button">
          {mobileMenuOpen ? (
            <X className={hasBackground ? 'text-slate-900' : 'text-white'} />
          ) : (
            <Menu className={hasBackground ? 'text-slate-900' : 'text-white'} />
          )}
        </button>
      </div>

      {mobileMenuOpen ? (
        <div className="mt-4 px-4 text-slate-900 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              className="text-center tracking-wide text-lg font-semibold text-slate-800"
              href="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                className="text-center tracking-wide text-lg font-semibold text-slate-800"
                href={`/#${item.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection(item.id)
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="text-center tracking-wide text-lg font-semibold text-slate-800"
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              className="w-full inline-flex items-center justify-center rounded-lg bg-[#eb3f69] py-3 text-lg text-white font-bold shadow-lg shadow-[#eb3f69]/20"
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
