'use client'

import { Heart } from 'lucide-react'

export type DonationTier = {
  amount: string
  impact: string
}

type Props = {
  tiers: DonationTier[]
}

export function DonationSection({ tiers }: Props) {
  return (
    <section className="relative bg-[#eb3f69] py-24 text-white" id="donate">
      <div className="container text-center">
        <Heart className="mx-auto mb-6 h-16 w-16 text-pink-200" fill="currentColor" />
        <h3 className="text-3xl font-bold sm:text-4xl">Make a Difference Today</h3>
        <p className="mx-auto mb-12 mt-4 max-w-2xl text-lg text-pink-100">
          100% of your donation goes directly to educational programs. Choose an amount to see the impact you can
          create.
        </p>

        <div className="mx-auto mb-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {tiers.map((tier) => (
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
  )
}
