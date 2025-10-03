"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
}

/**
 * Lazy-loaded image component with loading state and fallback
 * Optimizes initial page load by deferring image loading
 */
export function LazyImage({ src, alt, className, fallback = '/placeholder.svg' }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const imageSrc = hasError ? fallback : src

  return (
    <div className={cn("relative overflow-hidden bg-zinc-800", className)}>
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-zinc-700" />
      )}
      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}
