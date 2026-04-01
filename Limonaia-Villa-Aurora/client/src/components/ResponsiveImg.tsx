import { useState } from 'react'

type Props = {
  src: string
  fallback: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
  sizes?: string
}

export function ResponsiveImg({
  src,
  fallback,
  alt,
  className,
  loading = 'lazy',
  sizes,
}: Props) {
  const [current, setCurrent] = useState(src)

  return (
    <img
      className={className}
      src={current}
      alt={alt}
      loading={loading}
      sizes={sizes}
      decoding="async"
      onError={() => setCurrent(fallback)}
    />
  )
}
