import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Terms of Service | Everlove Charity Foundation',
  description:
    'Terms for using Everlove Charity Foundation online services, making donations, and purchasing commemorative merchandise.',
}

const updatedOn = 'March 2025'

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-10 lg:py-16 ">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-[-12%] h-56 w-56 rounded-full bg-[#eb3f69]/15 blur-3xl" />
          <div className="absolute right-[-10%] bottom-[-20%] h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-800/70" />
        </div>
        <div className="container relative z-10 py-16 lg:py-20">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white ring-1 ring-white/20">
              Terms of Service
            </div>
            <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl">Using our site responsibly.</h1>
            <p className="text-lg text-slate-100">
              How to use Everlove Charity Foundation&apos;s website, make donations, and purchase commemorative
              merchandise in a way that keeps everyone safe and informed.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/20">
                Updated: {updatedOn}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 ring-1 ring-white/10">
                California, USA jurisdiction
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="container pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="max-w-4xl space-y-12">
          <div className="space-y-10 text-gray-700">
            <Section title="Who we are">
              Everlove Charity Foundation is a nonprofit organization dedicated to advancing educational opportunity. For
              questions, contact info@everlovecharity.com or +1 (626) 545-8885.
            </Section>

            <Section title="Eligibility and acceptable use">
              <ul className="list-none space-y-2">
                <ListItem>You must be able to enter a binding agreement and use the site for lawful purposes only.</ListItem>
                <ListItem>No disrupting services, probing security, scraping, or using the site to transmit harmful content.</ListItem>
                <ListItem>Our services are not directed to children under 16.</ListItem>
              </ul>
            </Section>

            <Section title="Donations and purchases">
              <ul className="list-none space-y-2">
                <ListItem>Provide accurate information so we can process your gift or order and issue receipts.</ListItem>
                <ListItem>Prices and any applicable taxes or fees are shown at checkout for merchandise.</ListItem>
                <ListItem>Digital receipts are delivered by email; shipping details are shared when available.</ListItem>
              </ul>
            </Section>

            <Section title="Refunds and returns">
              <ul className="list-none space-y-2">
                <ListItem>Donations are generally non-refundable unless a transaction error occurred.</ListItem>
                <ListItem>
                  Merchandise may be returned within 30 days of delivery if unused and in original condition. Contact us
                  before returning; you are responsible for return shipping unless the item was incorrect or defective.
                </ListItem>
                <ListItem>Refunds, when approved, are issued to the original payment method.</ListItem>
              </ul>
            </Section>

            <Section title="Shipping for commemorative items">
              <ul className="list-none space-y-2">
                <ListItem>Shipping estimates are provided at checkout; delivery times may vary due to carrier delays.</ListItem>
                <ListItem>Risk of loss transfers to you upon delivery by the carrier unless required otherwise by law.</ListItem>
              </ul>
            </Section>

            <Section title="Accounts and communications">
              <ul className="list-none space-y-2">
                <ListItem>Keep account credentials secure; you are responsible for activity under your account.</ListItem>
                <ListItem>We send service emails (receipts, order updates). Marketing emails are sent only with consent, and you can unsubscribe anytime.</ListItem>
              </ul>
            </Section>

            <Section title="Intellectual property">
              Site content, trademarks, and graphics are owned by Everlove Charity Foundation or our licensors. You may
              use them for personal, non-commercial purposes; other uses require written permission.
            </Section>

            <Section title="User submissions">
              If you share stories or feedback, you grant us a non-exclusive license to use and display that content for
              our nonprofit mission, provided it does not violate others&apos; rights or applicable law.
            </Section>

            <Section title="Privacy">
              Our handling of personal information is described in our Privacy Policy. By using the site, you agree to
              that policy.
            </Section>

            <Section title="Disclaimers">
              The site and services are provided &quot;as is&quot; without warranties of uninterrupted or error-free availability.
            </Section>

            <Section title="Limitation of liability">
              To the fullest extent permitted by law, Everlove Charity Foundation and its volunteers, directors, and
              employees are not liable for indirect, incidental, special, or consequential damages arising from site use,
              donations, or purchases. This does not limit liability where such limits are prohibited by law.
            </Section>

            <Section title="Indemnity">
              You agree to indemnify Everlove Charity Foundation against losses arising from your misuse of the site or
              violation of these terms, to the extent permitted by law.
            </Section>

            <Section title="Governing law and disputes">
              These terms are governed by the laws of the State of California, USA, without regard to conflict of law
              principles. Disputes will be resolved in the state or federal courts located in California, unless local
              law requires otherwise. We encourage good-faith informal resolution first.
            </Section>

            <Section title="Changes to these terms">
              We may update these terms. If we make material changes, we will post the new date; continued use of the
              site after changes means you accept the updated terms.
            </Section>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </section>
  )
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[#eb3f69]" aria-hidden />
      <span>{children}</span>
    </li>
  )
}
