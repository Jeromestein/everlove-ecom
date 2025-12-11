'use client'

import { Mail, Send, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'

import { CONTACT_REASONS } from '../constants'

type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  reason: string
  message: string
}

const emptyForm: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  reason: '',
  message: '',
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState<string | null>(null)

  const hasStatusMessage = useMemo(() => status === 'success' || status === 'error', [status])

  const updateField = (field: keyof ContactFormData) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    if (status !== 'idle') {
      setStatus('idle')
      setServerMessage(null)
    }
  }

  const validate = (payload: ContactFormData) => {
    const nextErrors: Partial<Record<keyof ContactFormData, string>> = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!payload.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!payload.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!payload.email.trim() || !emailPattern.test(payload.email)) nextErrors.email = 'Enter a valid email address.'
    if (!payload.reason.trim()) nextErrors.reason = 'Please choose a reason.'
    if (!payload.message.trim()) nextErrors.message = 'Message is required.'

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerMessage(null)

    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error((data as { error?: string }).error ?? 'Unable to send your message right now.')
      }

      setStatus('success')
      setServerMessage('Thanks for reaching out! We will get back to you shortly.')
      setFormData(emptyForm)
    } catch (error) {
      setStatus('error')
      setServerMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24" id="contact">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-10 h-48 w-48 rounded-full bg-[#eb3f69]/10 blur-3xl" />
        <div className="absolute right-[-8%] top-1/2 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent" />
      </div>

      <div className="container relative z-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#eb3f69]/10 px-4 py-2 text-sm font-semibold text-[#eb3f69]">
            <Sparkles className="h-4 w-4" />
            Get in Touch
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-[1.1] text-slate-900 sm:text-5xl">
              Have questions or want to learn more?
            </h2>
            <p className="max-w-xl text-lg text-slate-600">
              We&apos;d love to hear from you. Reach out with any questions about our work or how you can get involved.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-3 text-slate-800 shadow-sm ring-1 ring-slate-200">
            <Mail className="h-5 w-5 text-[#eb3f69]" />
            <Link href="mailto:info@everlovecharity.com" className="transition hover:text-[#eb3f69]">info@everlovecharity.com</Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl ring-1 ring-slate-100 backdrop-blur md:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800" htmlFor="firstName">
                  First Name<span className="text-[#eb3f69]">*</span>
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                  id="firstName"
                  name="firstName"
                  onChange={updateField('firstName')}
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.firstName)}
                />
                {errors.firstName ? <p className="text-xs text-[#eb3f69]">{errors.firstName}</p> : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800" htmlFor="lastName">
                  Last Name<span className="text-[#eb3f69]">*</span>
                </label>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                  id="lastName"
                  name="lastName"
                  onChange={updateField('lastName')}
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.lastName)}
                />
                {errors.lastName ? <p className="text-xs text-[#eb3f69]">{errors.lastName}</p> : null}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor="email">
                Email<span className="text-[#eb3f69]">*</span>
              </label>
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                id="email"
                name="email"
                onChange={updateField('email')}
                placeholder="Enter your email address"
                type="email"
                value={formData.email}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? <p className="text-xs text-[#eb3f69]">{errors.email}</p> : null}
            </div>

            <div className="space-y-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-slate-800">
                  Reason<span className="text-[#eb3f69]">*</span>
                </span>
                <p className="text-xs text-slate-500">Pick one so we can route your note quickly.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {CONTACT_REASONS.map((reason) => {
                  const isChecked = formData.reason === reason.value
                  return (
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm transition ${
                        isChecked
                          ? 'border-[#eb3f69] bg-[#eb3f69]/5 ring-2 ring-[#eb3f69]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      key={reason.value}
                    >
                      <input
                        checked={isChecked}
                        className="mt-1 h-4 w-4 accent-[#eb3f69]"
                        disabled={isSubmitting}
                        name="reason"
                        onChange={updateField('reason')}
                        type="radio"
                        value={reason.value}
                      />
                      <span className="text-slate-800">{reason.label}</span>
                    </label>
                  )
                })}
              </div>
              {errors.reason ? <p className="text-xs text-[#eb3f69]">{errors.reason}</p> : null}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-800" htmlFor="message">
                Message<span className="text-[#eb3f69]">*</span>
              </label>
              <textarea
                className="min-h-[140px] w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner transition focus:border-[#eb3f69] focus:ring-2 focus:ring-[#eb3f69]/20"
                id="message"
                name="message"
                onChange={updateField('message')}
                placeholder="Please share your comments, questions, and ideas with us."
                value={formData.message}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? <p className="text-xs text-[#eb3f69]">{errors.message}</p> : null}
            </div>

            <div className="space-y-3">
              <button
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#eb3f69] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d62f59] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#eb3f69]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-80"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>

              {hasStatusMessage ? (
                <p className={`text-sm ${status === 'success' ? 'text-emerald-600' : 'text-[#eb3f69]'}`} aria-live="polite">
                  {serverMessage}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
