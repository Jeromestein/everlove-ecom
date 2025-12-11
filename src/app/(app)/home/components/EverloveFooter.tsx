'use client'

import { Globe } from 'lucide-react'

import { EverloveLogo } from './EverloveLogo'

export function EverloveFooter() {
  return (
    <section className="bg-gray-900 py-16 text-gray-300">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-12 border-b border-gray-800 pb-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-2">
              <span className="rounded-full p-1.5 shadow-sm">
                <EverloveLogo size={64}/>
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
  )
}
