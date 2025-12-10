'use client'

import { useEffect, useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'

import { NAV_ITEMS } from '../constants'

export function EverloveHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
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
        isScrolled
          ? 'bg-white/90 py-3 shadow-lg backdrop-blur-xl'
          : 'bg-transparent py-6'
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
  )
}
