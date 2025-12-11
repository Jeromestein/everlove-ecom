import { NextResponse } from 'next/server'

type ContactRequestBody = {
  firstName?: string
  lastName?: string
  email?: string
  reason?: string
  message?: string
}

const RESEND_ENDPOINT = 'https://api.resend.com/emails'
const REASON_LABELS: Record<string, string> = {
  general: 'General question',
  donation: 'Donation or partnership',
  volunteer: 'Volunteer',
  other: 'Other',
}

const sanitizeText = (value: unknown, maxLength = 1200) => {
  if (!value || typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

const buildCombinedEmail = (
  payload: Required<ContactRequestBody>,
  displayReason: string,
  fromAddress: string,
  toAddress: string,
) => {
  const safeMessage = payload.message.replace(/\n/g, '<br />')
  return {
    subject: `${displayReason} | Everlove Charity Foundation`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2>We received your message</h2>
        <p>Hi ${payload.firstName},</p>
        <p>Thanks for contacting Everlove Charity Foundation about <strong>${displayReason}</strong>. We&apos;ve included our team (${toAddress}) here so we can follow up quickly.</p>
        <div style="margin-top: 12px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
          <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Reason:</strong> ${displayReason}</p>
        </div>
        <p style="margin-top: 10px;"><strong>Your message:</strong></p>
        <div style="margin-top: 4px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
          ${safeMessage}
        </div>
        <p style="margin-top: 16px;">Reply to this email if you need to add anything else.</p>
        <p style="margin-top: 16px;">— Everlove Charity Foundation</p>
        <p style="color: #64748b; font-size: 12px;">Sent from ${fromAddress}</p>
      </div>
    `,
    text: `Hi ${payload.firstName},

Thanks for contacting Everlove Charity Foundation about: ${displayReason}.
We've included our team (${toAddress}) here so we can follow up quickly.

Name: ${payload.firstName} ${payload.lastName}
Email: ${payload.email}
Reason: ${displayReason}

${payload.message}

If you need to add anything, reply directly to this email.

— Everlove Charity Foundation
Sent from ${fromAddress}`,
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM_EMAIL
  const toAddress = process.env.RESEND_CONTACT_TO || fromAddress

  if (!apiKey || !fromAddress || !toAddress) {
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  let body: ContactRequestBody

  try {
    body = (await request.json()) as ContactRequestBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const payload = {
    firstName: sanitizeText(body.firstName, 80),
    lastName: sanitizeText(body.lastName, 80),
    email: sanitizeText(body.email, 200),
    reason: sanitizeText(body.reason, 120),
    message: sanitizeText(body.message, 2000),
  }

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.reason || !payload.message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  const displayReason = REASON_LABELS[payload.reason] ?? payload.reason
  const combinedEmail = buildCombinedEmail(payload as Required<ContactRequestBody>, displayReason, fromAddress, toAddress)

  const recipients = Array.from(new Set([payload.email, toAddress])).filter(Boolean)
  const ccRecipients = [fromAddress].filter((addr) => addr && !recipients.includes(addr))

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: recipients,
      cc: ccRecipients,
      reply_to: payload.email,
      subject: combinedEmail.subject,
      html: combinedEmail.html,
      text: combinedEmail.text,
    }),
  })

  if (!resendResponse.ok) {
    const errorMessage = await resendResponse.text().catch(() => 'Unknown error')
    return NextResponse.json({ error: `Unable to send message. ${errorMessage}` }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
