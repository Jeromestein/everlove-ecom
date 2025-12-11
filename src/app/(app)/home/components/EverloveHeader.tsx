'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { NAV_ITEMS } from '../constants'
import { EverloveLogo } from './EverloveLogo'

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
          ? 'bg-white py-3 shadow-lg backdrop-blur-xl'
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
          <span
            className={`flex items-center justify-center rounded-full p-1.5 `}
          >
            <EverloveLogo size={56} priority />
          </span>
          <span className={`text-3xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            Everlove
          </span>
        </button>

        <div className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`text-base font-medium tracking-wide transition-colors ${
                isScrolled ? 'text-slate-700 hover:text-slate-900' : 'text-white/90 hover:text-white'
              }`}
              onClick={() => scrollToSection(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
          <button
            className="rounded-full bg-[#eb3f69] px-7 py-3 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#c22e53]"
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
        <div className="mt-4 border-t border-white/20 bg-white px-6 py-4 text-slate-900 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className="text-left text-xl font-semibold"
                onClick={() => scrollToSection(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
            <button
              className="w-full rounded-lg bg-[#eb3f69] py-3 text-lg text-white font-bold"
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
