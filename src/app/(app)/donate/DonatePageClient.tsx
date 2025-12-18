'use client'

import {
  ArrowRight,
  CheckCircle2,
  Heart,
  HeartHandshake,
  Info,
  ShieldCheck,
  Sparkles,
  Sprout,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const oneTimeAmounts = [25, 50, 100, 250]
const monthlyAmounts = [15, 30, 60, 120]
const currencyOptions = ['USD', 'EUR', 'GBP']

const faqs = [
  {
    question: 'Will I receive a donation receipt?',
    answer:
      'Yes. We email a receipt right after your gift that includes the amount, currency, and our 501(c)3 EIN for your records.',
  },
  {
    question: 'Is my donation secure?',
    answer: 'Checkout is processed over HTTPS with modern encryption. Card details never touch our servers.',
  },
  {
    question: 'Can I dedicate my donation?',
    answer:
      'Absolutely. Toggle the dedication option to add a honoree name or message that we will include in the confirmation.',
  },
  {
    question: 'Do you accept recurring gifts?',
    answer:
      'Yes. Choose the recurring tab to set up an automatic monthly gift. You can update or cancel anytime by contacting us.',
  },
]

const galleryImages = [
  { src: '/african-kids-learing-happy.jpg', alt: 'Students smiling during class' },
  { src: '/library-for-kids.webp', alt: 'Books and learning materials for kids' },
  { src: '/Youth-in-Foster-Care.jpg', alt: 'Teens receiving support and care' },
  { src: '/kids-books.jpg', alt: 'Colorful books ready for distribution' },
]

const impactHighlights = [
  'Funds books, backpacks, and tutoring for students who need it most.',
  'Supports safe learning spaces and trauma-aware care for youth.',
  'Sends transparent impact updates so you know your gift is working.',
]

function formatAmount(amount: number, currency: string) {
  if (!Number.isFinite(amount)) return '$0'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch (error) {
    return `$${amount.toFixed(0)}`
  }
}

export function DonatePageClient() {
  const searchParams = useSearchParams()
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once')
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [dedicate, setDedicate] = useState(false)
  const [honorName, setHonorName] = useState('')
  const [helperMessage, setHelperMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setSelectedAmount(frequency === 'once' ? 100 : 30)
    setCustomAmount('')
  }, [frequency])

  const presetAmounts = frequency === 'once' ? oneTimeAmounts : monthlyAmounts
  const parsedCustom = Number.parseFloat(customAmount)
  const amountFromCustom = Number.isFinite(parsedCustom) && parsedCustom > 0 ? parsedCustom : null
  const donationAmount = amountFromCustom ?? selectedAmount
  const formattedAmount = formatAmount(donationAmount, currency)

  const impactMessage = useMemo(() => {
    if (donationAmount >= 200) return 'Equips an entire classroom with books and tech access.'
    if (donationAmount >= 100) return 'Provides a month of tutoring and supplies for several students.'
    if (donationAmount >= 50) return 'Covers backpacks and essentials for two students.'
    return "Gets notebooks, pencils, and first books into a student's hands."
  }, [donationAmount])

  useEffect(() => {
    if (searchParams?.get('success') === '1') {
      setHelperMessage('Thank you! Your donation was received. A receipt is on its way to your email.')
    } else if (searchParams?.get('canceled') === '1') {
      setHelperMessage('Donation canceled. You can adjust the amount or try again anytime.')
    }
  }, [searchParams])

  const handleDonate = async () => {
    setErrorMessage(null)
    setHelperMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/stripe/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
          currency,
          frequency,
          dedicate,
          honorName: dedicate ? honorName.trim() : '',
        }),
      })

      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? 'Unable to start checkout. Please try again.')
      }

      window.location.href = data.url
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-slate-900 text-white py-10 lg:py-16" id="donation-form">
        <div className="absolute inset-0">
          <Image
            alt="Everlove students learning together"
            className="h-full w-full object-cover"
            priority
            src="/Tarekegn-donation-banner.png"
            fill
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-900/60" />
          <div className="absolute -left-10 top-12 h-72 w-72 rounded-full bg-[#eb3f69]/20 blur-3xl" />
          <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
        </div>

        <div className="container relative z-10 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/15">
                Donate
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold leading-[1.1] sm:text-5xl">
                  Your support today builds brighter tomorrows.
                </h1>
                <p className="max-w-3xl text-lg text-slate-100">
                  Every gift keeps kids learning safely—with books, tutoring, and trauma-informed care. Choose your
                  amount and we will guide you to secure checkout.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/10">
                  <ShieldCheck className="h-4 w-4" />
                  100% secure checkout
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/10">
                  <HeartHandshake className="h-4 w-4" />
                  501(c)3 • EIN 33-4447023
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/10">
                  <Sprout className="h-4 w-4" />
                  Tax-deductible where applicable
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/95 p-6 text-slate-900 shadow-2xl ring-1 ring-slate-200 backdrop-blur md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">Make an impact</p>
                  <p className="text-xl font-bold text-slate-900">Choose your gift</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  <ShieldCheck className="h-4 w-4" />
                  Secure
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 rounded-full bg-slate-100 p-1 text-sm font-semibold text-slate-700">
                <button
                  className={`rounded-full px-4 py-2 transition ${frequency === 'once' ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/70'}`}
                  onClick={() => setFrequency('once')}
                  type="button"
                >
                  One-time
                </button>
                <button
                  className={`rounded-full px-4 py-2 transition ${frequency === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'hover:bg-white/70'}`}
                  onClick={() => setFrequency('monthly')}
                  type="button"
                >
                  Recurring
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {presetAmounts.map((amount) => {
                  const isActive = amount === selectedAmount && amountFromCustom === null
                  return (
                    <button
                      className={`rounded-xl border px-4 py-3 text-center text-sm font-semibold transition ${
                        isActive
                          ? 'border-[#eb3f69] bg-[#eb3f69]/10 text-[#eb3f69] shadow-sm'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      key={`${frequency}-${amount}`}
                      onClick={() => setSelectedAmount(amount)}
                      type="button"
                    >
                      {formatAmount(amount, currency)}
                    </button>
                  )
                })}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-[0.65fr_1fr]">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                    id="currency"
                    onChange={(event) => setCurrency(event.target.value)}
                    value={currency}
                  >
                    {currencyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600" htmlFor="custom-amount">
                    Custom amount
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                    id="custom-amount"
                    min="5"
                    name="custom-amount"
                    onChange={(event) => setCustomAmount(event.target.value)}
                    placeholder="Other"
                    type="number"
                    value={customAmount}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    checked={dedicate}
                    className="mt-1 h-4 w-4 accent-[#eb3f69]"
                    onChange={(event) => setDedicate(event.target.checked)}
                    type="checkbox"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Dedicate my donation</p>
                    <p className="text-xs text-slate-600">
                      Honor a loved one or special moment; we will include this in your confirmation.
                    </p>
                  </div>
                </label>
                {dedicate ? (
                  <input
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                    onChange={(event) => setHonorName(event.target.value)}
                    placeholder="Honoree name or message"
                    value={honorName}
                  />
                ) : null}
              </div>

              <div className="mt-5 space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {frequency === 'monthly' ? 'Monthly gift selected' : 'One-time gift selected'}
                </div>
                <p className="text-lg font-bold text-slate-900">{formattedAmount}</p>
                <p className="text-sm text-slate-600">{impactMessage}</p>
              </div>

              <button
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#eb3f69] px-6 py-3 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d42f59] disabled:cursor-not-allowed disabled:opacity-80"
                disabled={isSubmitting}
                onClick={handleDonate}
                type="button"
              >
                {isSubmitting ? 'Redirecting…' : `Donate ${formattedAmount}`}
                {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
              </button>

              <div className="mt-3 flex items-start gap-2 text-xs text-slate-600">
                <Info className="mt-0.5 h-4 w-4 text-slate-400" />
                <p>
                  Everlove Charity Foundation is a 501(c)3 tax-exempt organization (EIN 33-4447023). You will receive an
                  email receipt after the gift is completed.
                </p>
              </div>
              {helperMessage ? <p className="mt-3 text-sm font-semibold text-[#eb3f69]">{helperMessage}</p> : null}
              {errorMessage ? <p className="mt-3 text-sm font-semibold text-red-600">{errorMessage}</p> : null}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eb3f69]/10 px-4 py-2 text-sm font-semibold text-[#eb3f69]">
              <Heart className="h-4 w-4" />
              About your gift
            </div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Where your donation goes</h2>
            <p className="max-w-3xl text-lg text-slate-700">
              Everlove powers education access for kids facing housing insecurity, domestic violence, or life in foster
              care. Every dollar fuels tutoring, supplies, safe study spaces, and the trauma-informed care that keeps
              children learning.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {impactHighlights.map((item) => (
                <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm" key={item}>
                  <span className="mt-1 h-2 w-2 rounded-full bg-[#eb3f69]" aria-hidden />
                  <p className="text-sm font-medium text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white">
            <div className="absolute inset-0 opacity-80">
              <Image alt="Students reading together" className="h-full w-full object-cover" fill src="/topic-education.jpg" sizes="900px" />
            </div>
            <div className="relative z-10 space-y-4 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-slate-800/80 p-8 lg:p-10">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                Impact
              </div>
              <h3 className="text-2xl font-bold leading-tight">Learning support, delivered fast.</h3>
              <p className="text-slate-100">
                Within days of a gift, we move books, tablets, and tutoring to the children who need them most—working
                alongside local educators and caregivers.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'Backpacks delivered', value: '5,300+' },
                  { label: 'Books placed', value: '12,450+' },
                  { label: 'Students supported', value: '8,900+' },
                  { label: 'Cities served', value: '12' },
                ].map((stat) => (
                  <div className="rounded-2xl bg-white/10 p-4 shadow-sm ring-1 ring-white/10" key={stat.label}>
                    <p className="text-xs text-slate-200">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <ShieldCheck className="h-4 w-4" />
                Transparency-first reporting
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2">
            {galleryImages.map((image, index) => (
              <div
                className={`relative overflow-hidden rounded-3xl ${index % 2 === 0 ? 'sm:translate-y-3' : 'sm:-translate-y-3'}`}
                key={image.src}
              >
                <Image alt={image.alt} className="h-full w-full object-cover transition duration-500 hover:scale-105" height={360} src={image.src} width={480} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#eb3f69] shadow-sm ring-1 ring-[#eb3f69]/20">
              <Sparkles className="h-4 w-4" />
              Your impact in motion
            </div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">See the difference you are making</h2>
            <p className="max-w-2xl text-lg text-slate-700">
              From Oakland to Orange County to rural Rwanda, Everlove partners with local educators so every student can
              thrive. Your generosity turns into tangible supplies, mentors, and safe spaces.
            </p>
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <HeartHandshake className="h-4 w-4 text-[#eb3f69]" />
                Donor promise
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#eb3f69]" aria-hidden />
                  Transparent reporting on the students and projects your gift fuels.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#eb3f69]" aria-hidden />
                  No surprises: clear receipts, easy recurring management, and responsive donor support.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#eb3f69]" aria-hidden />
                  Secure processing and respect for your privacy at every step.
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-slate-700">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 font-semibold text-white">
                <ShieldCheck className="h-4 w-4" />
                Secure checkout
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-900 ring-1 ring-slate-200">
                <Sparkles className="h-4 w-4" />
                Impact updates
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-900 ring-1 ring-slate-200">
                <Heart className="h-4 w-4 text-[#eb3f69]" />
                Community powered
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20" id="faq">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eb3f69]/10 px-4 py-2 text-sm font-semibold text-[#eb3f69]">
              <Info className="h-4 w-4" />
              Donor support
            </div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Questions about donating?</h2>
            <p className="max-w-xl text-lg text-slate-700">
              We are here to help with receipts, recurring gifts, or dedication messages.
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Donor Support</p>
              <Link className="text-[#eb3f69] underline decoration-[#eb3f69]/60 underline-offset-4" href="mailto:info@everlovecharity.com">
                info@everlovecharity.com
              </Link>
              <p className="text-slate-600">+1 (626) 545-8885</p>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md [&[open]]:border-[#eb3f69]/40 [&[open]]:shadow-lg"
                key={faq.question}
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-slate-900">
                  {faq.question}
                  <span className="text-[#eb3f69] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-900 py-12 text-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-[-20%] h-72 w-72 rounded-full bg-[#eb3f69]/15 blur-3xl" />
          <div className="absolute right-[-12%] bottom-[-25%] h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" />
        </div>
        <div className="container relative z-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-8 text-center ring-1 ring-white/10 lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold sm:text-3xl">Ready to make an impact?</h3>
            <p className="text-slate-200">Your generosity keeps Everlove students learning, healing, and thriving.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
              href="#donation-form"
            >
              Give now
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              href="/contact"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
