'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { type Shop } from '@/lib/data'
import { Check } from 'lucide-react'

interface StampGridProps {
  shops: Shop[]
  stamps: Record<string, { isCollected: boolean }>
  maxVisible?: number
  showViewMore?: boolean
  compact?: boolean
  className?: string
}

export function StampGrid({
  shops,
  stamps,
  maxVisible,
  showViewMore = false,
  compact = false,
  className,
}: StampGridProps) {
  const { lang, t } = useI18n()
  const visibleShops = maxVisible ? shops.slice(0, maxVisible) : shops

  return (
    <div className={cn('', className)}>
      <div className={cn('grid gap-3', compact ? 'grid-cols-4' : 'grid-cols-4')}>
        {visibleShops.map((shop) => {
          const isCollected = stamps[shop.id]?.isCollected ?? false
          return (
            <Link
              key={shop.id}
              href={`/shop/${shop.id}`}
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="relative">
                <div className={cn(
                  'rounded-[14px] overflow-hidden transition-all duration-200',
                  compact ? 'w-14 h-14' : 'w-16 h-16',
                  isCollected 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : 'opacity-50'
                )}>
                  <Image
                    src={shop.mascotImage}
                    alt={lang === 'en' ? shop.nameEn : shop.name}
                    width={64}
                    height={64}
                    className={cn(
                      'w-full h-full object-cover transition-all',
                      isCollected ? '' : 'grayscale'
                    )}
                  />
                </div>
                {isCollected && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
                  </div>
                )}
              </div>
              <span className={cn(
                'text-center line-clamp-1 transition-colors',
                compact ? 'text-badge' : 'text-caption-sm',
                isCollected ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}>
                {lang === 'en' ? shop.nameEn : shop.name}
              </span>
            </Link>
          )
        })}
      </div>
      {showViewMore && maxVisible && shops.length > maxVisible && (
        <Link
          href="/stamps"
          className="block text-center text-caption text-primary font-medium hover:text-primary/80 transition-colors mt-4"
        >
          {t('common.viewMore')}
        </Link>
      )}
    </div>
  )
}

interface StampProgressProps {
  collected: number
  total: number
  className?: string
}

export function StampProgress({ collected, total, className }: StampProgressProps) {
  const { t } = useI18n()
  const percentage = total > 0 ? (collected / total) * 100 : 0

  return (
    <div className={cn('space-y-2.5', className)}>
      <div className="flex justify-between items-baseline">
        <div className="flex items-baseline gap-1">
          <span className="text-display-lg text-primary">{collected}</span>
          <span className="text-body-sm text-muted-foreground">/ {total}</span>
        </div>
        <span className="text-caption-sm text-muted-foreground">
          {percentage.toFixed(0)}% {t('common.complete')}
        </span>
      </div>
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700 ease-out progress-shine"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

interface StampCardProps {
  shop: Shop
  isCollected: boolean
  showDetails?: boolean
  className?: string
}

export function StampCard({ shop, isCollected, showDetails = false, className }: StampCardProps) {
  const { lang, t } = useI18n()
  
  return (
    <Link
      href={`/shop/${shop.id}`}
      className={cn(
        'group block card-base overflow-hidden card-interactive',
        isCollected ? 'border-primary/20' : '',
        className
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={cn(
              'w-16 h-16 rounded-[14px] overflow-hidden transition-all',
              isCollected ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' : 'opacity-50'
            )}>
              <Image
                src={shop.mascotImage}
                alt={lang === 'en' ? shop.nameEn : shop.name}
                width={64}
                height={64}
                className={cn(
                  'w-full h-full object-cover',
                  isCollected ? '' : 'grayscale'
                )}
              />
            </div>
            {isCollected && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-[4px] text-badge',
                isCollected 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-secondary text-muted-foreground'
              )}>
                {isCollected ? t('common.collectedComplete') : t('common.notCollected')}
              </span>
              <span className="text-badge text-muted-foreground">
                {lang === 'en' ? shop.categoryEn : shop.category}
              </span>
            </div>
            <h3 className={cn(
              'text-title-md truncate',
              isCollected ? 'text-foreground' : 'text-muted-foreground'
            )}>
              {lang === 'en' ? shop.nameEn : shop.name}
            </h3>
            {showDetails && (
              <p className="text-caption-sm text-muted-foreground mt-0.5 line-clamp-1">
                {shop.hasExperience
                  ? (shop.tagline ? (lang === 'en' ? shop.taglineEn : shop.tagline) : t('common.experienceAvailable'))
                  : t('common.salesOnly')}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
