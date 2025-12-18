import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe =
  stripeSecretKey &&
  new Stripe(stripeSecretKey, {
    apiVersion: '2025-08-27.basil',
  })

type Body = {
  amount?: number
  currency?: string
  frequency?: 'once' | 'monthly'
  dedicate?: boolean
  honorName?: string
}

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe keys are not configured.' }, { status: 500 })
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const amount = typeof body.amount === 'number' ? body.amount : 0
  const currency = (body.currency || 'USD').toUpperCase()
  const frequency = body.frequency === 'monthly' ? 'monthly' : 'once'
  const dedicate = Boolean(body.dedicate)
  const honorName = body.honorName?.trim() || ''

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Amount must be greater than 0.' }, { status: 400 })
  }

  const amountInMinor = Math.round(amount * 100)
  const origin =
    request.headers.get('origin') ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    'http://localhost:3000'

  try {
    const metadata = {
      source: 'donate-page',
      frequency,
      dedicate: String(dedicate),
      honorName,
    }

    const session = await stripe.checkout.sessions.create({
      mode: frequency === 'monthly' ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      success_url: `${origin}/donate?success=1`,
      cancel_url: `${origin}/donate?canceled=1`,
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amountInMinor,
            product_data: {
              name: frequency === 'monthly' ? 'Monthly donation to Everlove' : 'One-time donation to Everlove',
            },
            ...(frequency === 'monthly' ? { recurring: { interval: 'month' } } : {}),
          },
          quantity: 1,
        },
      ],
      ...(frequency === 'monthly'
        ? { subscription_data: { metadata } }
        : { payment_intent_data: { metadata } }),
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Unable to start checkout.' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stripe error creating checkout session.'
    console.error('[stripe][donate] failed to create session', message)
    return NextResponse.json({ error: 'Unable to start checkout. Please try again.' }, { status: 500 })
  }
}
