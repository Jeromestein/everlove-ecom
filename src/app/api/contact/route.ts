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

const buildEmailBody = (payload: Required<ContactRequestBody>, displayReason: string) => {
  const safeMessage = payload.message.replace(/\n/g, '<br />')
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2>New message from Everlove website</h2>
      <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Reason:</strong> ${displayReason}</p>
      <p><strong>Message:</strong></p>
      <div style="padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
        ${safeMessage}
      </div>
    </div>
  `
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

  const emailContent = {
    from: fromAddress,
    to: [toAddress],
    reply_to: payload.email,
    subject: `New message about: ${REASON_LABELS[payload.reason] ?? payload.reason}`,
    html: buildEmailBody(payload as Required<ContactRequestBody>, REASON_LABELS[payload.reason] ?? payload.reason),
    text: `Name: ${payload.firstName} ${payload.lastName}
Email: ${payload.email}
Reason: ${REASON_LABELS[payload.reason] ?? payload.reason}

${payload.message}`,
  }

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailContent),
  })

  if (!resendResponse.ok) {
    const errorMessage = await resendResponse.text().catch(() => 'Unknown error')
    return NextResponse.json({ error: `Unable to send message. ${errorMessage}` }, { status: 502 })
  }

  return NextResponse.json({ success: true })
}
