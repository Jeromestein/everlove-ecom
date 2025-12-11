import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Everlove Charity Foundation',
  description:
    'How Everlove Charity Foundation collects, uses, and protects personal information for donations, merchandise, and community updates.',
}

const updatedOn = 'March 2025'

const sections = [
  {
    title: 'What we collect',
    items: [
      'Contact details you share with us (name, email, mailing address, phone).',
      'Donation and purchase details (amounts, items, currency, payment method, and limited card details such as last four digits and expiry where required).',
      'Shipping information for commemorative items.',
      'Communications and preferences (messages you send us, newsletter choices).',
      'Basic usage data and cookies that help us keep the site secure and improve it. We do not sell personal data.',
    ],
  },
  {
    title: 'How we use data',
    items: [
      'Process donations and purchases, issue receipts, and deliver merchandise.',
      'Send impact updates, fundraising news, and marketing emails (you can unsubscribe anytime).',
      'Provide support, respond to messages, and improve our website experience.',
      'Detect and prevent fraud or abuse and meet legal, tax, and charity reporting duties.',
    ],
  },
  {
    title: 'Sharing and processors',
    items: [
      'Payment processors (e.g., for card or digital wallet payments). We do not store full card numbers.',
      'Email and marketing providers to send newsletters and receipts.',
      'Fulfillment and shipping partners for merchandise orders.',
      'Analytics and security vendors to keep the site reliable and secure.',
      'Auditors or regulators when required by law. We do not sell or rent personal information.',
    ],
  },
  {
    title: 'Cookies and analytics',
    items: [
      'Essential cookies keep the site functioning (for example, preserving cart or session state).',
      'We may use privacy-minded analytics to understand site performance. Marketing pixels, if added, will respect consent and opt-out controls.',
    ],
  },
  {
    title: 'Retention',
    items: [
      'Transaction records are kept as required for tax and charity compliance.',
      'Marketing and newsletter data is kept until you unsubscribe or ask us to delete it.',
      'Technical logs are retained only as long as needed for security and operations.',
    ],
  },
  {
    title: 'Your choices and rights',
    items: [
      'Unsubscribe using links in our emails, or contact us to adjust your preferences.',
      'Request access, correction, deletion, or restriction where applicable under local law.',
      'Opt out of non-essential cookies or analytics where offered in your browser or device settings.',
    ],
  },
  {
    title: 'Children',
    items: ['Our services are not directed to children under 16. If we learn we collected such data, we will delete it.'],
  },
  {
    title: 'International transfers',
    items: [
      'We may use service providers in other countries. When we transfer data, we rely on appropriate safeguards as required by applicable law.',
    ],
  },
  {
    title: 'Security',
    items: [
      'We use industry-standard measures to protect personal information, but no method of transmission or storage is 100% secure.',
    ],
  },
  {
    title: 'Changes',
    items: ['We may update this Privacy Policy. We will post the new date when changes take effect.'],
  },
]

const contactDetails = {
  email: 'info@everlovecharity.com',
  phone: '+1 (626) 545-8885',
  address: '208 White Cap Ln, Newport Beach, CA 92657',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-10 lg:py-16">
      <div className="container pb-20 pt-16 lg:pb-28 lg:pt-20">
        <div className="max-w-4xl space-y-12">
          <header className="space-y-4 border-b border-gray-200 pb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#eb3f69]">Privacy Policy</p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">Protecting your trust</h1>
            <p className="text-gray-600">
              Everlove Charity Foundation is a nonprofit organization. We collect personal information to process online
              donations, deliver commemorative merchandise, and share updates about our mission. This notice explains
              what we collect, how we use it, and the choices available to you.
            </p>
            <p className="text-sm text-gray-500">Updated: {updatedOn}</p>
          </header>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                <ul className="space-y-2 text-gray-700">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#eb3f69]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="rounded-2xl bg-gray-50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">Questions or requests</h2>
            <p className="mt-2 text-gray-700">
              To exercise your privacy rights or ask questions, contact us. We aim to respond promptly and within
              timelines required by applicable law.
            </p>
            <div className="mt-4 grid gap-2 text-gray-800 sm:grid-cols-2 sm:gap-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{contactDetails.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{contactDetails.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">Mailing address</p>
                <p className="font-medium">{contactDetails.address}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
