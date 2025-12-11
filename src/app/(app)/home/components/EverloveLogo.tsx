'use client'

import Image from 'next/image'

type EverloveLogoProps = {
  size?: number
  className?: string
  priority?: boolean
}

export function EverloveLogo({ size = 32, className = '', priority = false }: EverloveLogoProps) {
  return <Image alt="Everlove Charity Foundation Logo" className={className} height={size} width={size} priority={priority} src="/favicon.svg"/>
}
