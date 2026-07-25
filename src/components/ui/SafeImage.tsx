'use client'

import Image, { type ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import { DEFAULT_IMAGE, resolveImageUrl } from '@/lib/images'

type SafeImageProps = Omit<ImageProps, 'src' | 'onError'> & {
  src: string | null | undefined
  fallbackSrc?: string
}

function isPrivateOrLocalHost(url: string): boolean {
  try {
    const host = new URL(url).hostname
    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local')
    )
  } catch {
    return false
  }
}

/**
 * next/image wrapper that:
 * 1. Resolves null/empty/invalid API paths to a default image
 * 2. Bypasses optimizer for local/private hosts (Next 16 blocks 127.0.0.1)
 * 3. Swaps to default on runtime load error
 */
export function SafeImage({
  src,
  fallbackSrc = DEFAULT_IMAGE,
  alt,
  ...props
}: SafeImageProps) {
  const resolved = resolveImageUrl(src)
  const [displaySrc, setDisplaySrc] = useState(resolved || fallbackSrc)

  useEffect(() => {
    setDisplaySrc(resolveImageUrl(src) || fallbackSrc)
  }, [src, fallbackSrc])

  const isFallback = displaySrc === fallbackSrc || displaySrc.endsWith('.svg')
  const skipOptimizer = isFallback || isPrivateOrLocalHost(displaySrc) || Boolean(props.unoptimized)

  return (
    <Image
      {...props}
      alt={alt}
      src={displaySrc}
      unoptimized={skipOptimizer}
      onError={() => {
        if (displaySrc !== fallbackSrc) {
          setDisplaySrc(fallbackSrc)
        }
      }}
    />
  )
}
