'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface MascotAuraProps {
  src: string
  alt: string
  /** 획득 시 컬러 + 아우라, 미획득 시 회색 실루엣 (배경/박스 없음) */
  collected?: boolean
  /** 미획득 실루엣 위에 물음표(?) 표시 — 스탬프 페이지 전용 */
  showQuestion?: boolean
  /** 미획득이라도 항상 컬러 마스코트로 표시 (공방 상세 페이지 전용) */
  alwaysColor?: boolean
  /** 획득 순간 통통 튀는 애니메이션 */
  animate?: boolean
  priority?: boolean
  sizes?: string
  /** 캐릭터 박스 크기는 호출부에서 className(w-/h-/aspect-)으로 지정 */
  className?: string
}

/**
 * 배경(박스) 없이 캐릭터만 보여준다.
 * - 획득: 원본 컬러 마스코트 + 부드러운 아우라 글로우.
 * - 미획득 + `showQuestion`(스탬프 페이지): 원본 마스코트의 **흑백(그레이스케일)**.
 * - 미획득 + 그 외 화면: 가게별 회색 실루엣(`/mascots/sil/*`).
 * - `alwaysColor`(공방 상세): 미획득이라도 컬러로 표시(아우라는 획득 시에만).
 * 빨간 체크 배지는 표시하지 않는다.
 */
export function MascotAura({
  src,
  alt,
  collected = true,
  showQuestion = false,
  alwaysColor = false,
  animate = false,
  priority = false,
  sizes = '128px',
  className,
}: MascotAuraProps) {
  const useColor = collected || alwaysColor
  // 미획득: 스탬프 페이지(showQuestion)는 흑백 컬러마스코트+물음표, 그 외 화면은 회색 실루엣
  const grayMascot = !useColor && showQuestion
  const silhouette = !useColor && !showQuestion
  const imgSrc = silhouette ? src.replace('/mascots/', '/mascots/sil/') : src

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        collected && 'mascot-aura',
        collected && animate && 'mascot-aura-animate',
        className,
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          'relative z-[1] object-contain transition-all duration-300',
          collected && 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.14)]',
          collected && animate && 'animate-stamp-collect',
          grayMascot && 'grayscale opacity-55',
        )}
      />
    </div>
  )
}

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
