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
    <div className="bg-white py-10 lg:py-16">
      <div className="container pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="max-w-4xl space-y-12">
          <header className="space-y-4 border-b border-gray-200 pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#eb3f69]">Terms of Service</p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">Using our site responsibly</h1>
            <p className="text-gray-600">
              These terms explain how you may use Everlove Charity Foundation&apos;s website, make online donations, and
              purchase commemorative merchandise. By using the site, you agree to these terms.
            </p>
            <p className="text-sm text-gray-500">Updated: {updatedOn}</p>
          </header>

          <div className="space-y-10 text-gray-700">
            <Section title="Who we are">
              Everlove Charity Foundation is a nonprofit organization dedicated to advancing educational opportunity. For
              questions, contact info@everlovecharity.com or +1 (626) 545-8885.
            </Section>

            <Section title="Eligibility and acceptable use">
              <ul className="space-y-2">
                <ListItem>You must be able to enter a binding agreement and use the site for lawful purposes only.</ListItem>
                <ListItem>No disrupting services, probing security, scraping, or using the site to transmit harmful content.</ListItem>
                <ListItem>Our services are not directed to children under 16.</ListItem>
              </ul>
            </Section>

            <Section title="Donations and purchases">
              <ul className="space-y-2">
                <ListItem>Provide accurate information so we can process your gift or order and issue receipts.</ListItem>
                <ListItem>Prices and any applicable taxes or fees are shown at checkout for merchandise.</ListItem>
                <ListItem>Digital receipts are delivered by email; shipping details are shared when available.</ListItem>
              </ul>
            </Section>

            <Section title="Refunds and returns">
              <ul className="space-y-2">
                <ListItem>Donations are generally non-refundable unless a transaction error occurred.</ListItem>
                <ListItem>
                  Merchandise may be returned within 30 days of delivery if unused and in original condition. Contact us
                  before returning; you are responsible for return shipping unless the item was incorrect or defective.
                </ListItem>
                <ListItem>Refunds, when approved, are issued to the original payment method.</ListItem>
              </ul>
            </Section>

            <Section title="Shipping for commemorative items">
              <ul className="space-y-2">
                <ListItem>Shipping estimates are provided at checkout; delivery times may vary due to carrier delays.</ListItem>
                <ListItem>Risk of loss transfers to you upon delivery by the carrier unless required otherwise by law.</ListItem>
              </ul>
            </Section>

            <Section title="Accounts and communications">
              <ul className="space-y-2">
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
    <li className="flex gap-3">
      <span className="mt-2 h-2 w-2 rounded-full bg-[#eb3f69]" aria-hidden />
      <span>{children}</span>
    </li>
  )
}
