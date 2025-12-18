import type { Metadata } from 'next'
import { Suspense } from 'react'

import { DonatePageClient } from './DonatePageClient'

export const metadata: Metadata = {
  title: 'Donate | Everlove Charity Foundation',
  description:
    'Support Everlove students with books, tutoring, and safe learning spaces. Choose a one-time or recurring gift and proceed to our secure checkout.',
}

export default function DonatePage() {
  return (
    <Suspense fallback={null}>
      <DonatePageClient />
    </Suspense>
  )
}
