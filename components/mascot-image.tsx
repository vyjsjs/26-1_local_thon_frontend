'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface MascotImageProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isCollected?: boolean
  className?: string
  showAnimation?: boolean
  showBadge?: boolean
}

const sizeMap = {
  sm: 48,
  md: 80,
  lg: 112,
  xl: 144,
}

const radiusMap = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-2xl',
}

export function MascotImage({
  src,
  alt,
  size = 'md',
  isCollected = true,
  className,
  showAnimation = false,
  showBadge = true,
}: MascotImageProps) {
  const dimension = sizeMap[size]
  const radius = radiusMap[size]

  return (
    <div
      className={cn(
        'relative overflow-visible',
        className
      )}
      style={{ width: dimension, height: dimension }}
    >
      <div
        className={cn(
          'w-full h-full overflow-hidden transition-all duration-300',
          radius,
          isCollected 
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background shadow-md' 
            : 'opacity-50',
          showAnimation && isCollected && 'animate-stamp-collect animate-stamp-glow',
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={dimension}
          height={dimension}
          className={cn(
            'w-full h-full object-cover transition-all',
            !isCollected && 'grayscale'
          )}
          priority={size === 'xl' || size === 'lg'}
        />
      </div>
      
      {/* 수집 완료 배지 */}
      {isCollected && showBadge && (
        <div className={cn(
          'absolute flex items-center justify-center bg-primary rounded-full shadow-md',
          size === 'sm' && '-bottom-0.5 -right-0.5 w-4 h-4',
          size === 'md' && '-bottom-1 -right-1 w-5 h-5',
          size === 'lg' && '-bottom-1 -right-1 w-6 h-6',
          size === 'xl' && '-bottom-1.5 -right-1.5 w-7 h-7',
        )}>
          <Check 
            className={cn(
              'text-primary-foreground',
              size === 'sm' && 'w-2.5 h-2.5',
              size === 'md' && 'w-3 h-3',
              size === 'lg' && 'w-3.5 h-3.5',
              size === 'xl' && 'w-4 h-4',
            )} 
            strokeWidth={3} 
          />
        </div>
      )}
      
      {/* 미수집 오버레이 */}
      {!isCollected && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          radius
        )}>
          <span className="sr-only">미수집</span>
        </div>
      )}
    </div>
  )
}

interface MascotPlaceholderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  label?: string
  className?: string
}

export function MascotPlaceholder({
  size = 'md',
  label,
  className,
}: MascotPlaceholderProps) {
  const dimension = sizeMap[size]
  const radius = radiusMap[size]

  return (
    <div
      className={cn(
        'relative bg-gradient-to-br from-muted to-secondary/50 flex items-center justify-center',
        radius,
        className
      )}
      style={{ width: dimension, height: dimension }}
    >
      <div className="text-center text-muted-foreground">
        <svg
          className="mx-auto mb-1 opacity-40"
          width={dimension / 3}
          height={dimension / 3}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
        {label && <span className="text-xs opacity-60">{label}</span>}
      </div>
    </div>
  )
}
