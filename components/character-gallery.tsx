'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { SHOPS } from '@/lib/data'
import { MascotAura } from '@/components/mascot-image'

interface CharacterGalleryProps {
  stamps: Record<string, { isCollected: boolean }>
  collectedCount: number
  /** 상단 소개/통계 카드 표시 여부 */
  showIntro?: boolean
  /** 미획득이라도 항상 컬러로 표시 (모든 캐릭터 페이지 전용 — 아우라는 획득 시에만) */
  alwaysColor?: boolean
  className?: string
}

/**
 * 공방 캐릭터(마스코트) 도감 — 13개 마스코트를 격자로 보여준다.
 * 획득 = 컬러+아우라. 미획득: `alwaysColor`면 컬러(아우라X), 그 외 반투명 흑백.
 * /characters · /stamps(도감 탭) 에서 공용.
 */
export function CharacterGallery({ stamps, collectedCount, showIntro = true, alwaysColor = false, className }: CharacterGalleryProps) {
  const { lang, t } = useI18n()

  return (
    <div className={className}>
      {showIntro && (
        <section className="mb-6 animate-fade-in-up">
          <div className="bg-gradient-to-br from-primary/5 via-primary/8 to-accent rounded-[20px] p-5">
            <h1 className="text-display-sm text-foreground mb-2">{t('gallery.title')}</h1>
            <p className="text-body-sm text-muted-foreground leading-relaxed mb-4">
              {t('gallery.subtitle')}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-badge text-foreground">
                  {[t('gallery.totalCharactersPrefix'), SHOPS.length, t('gallery.totalCharactersSuffix')].filter(Boolean).join(' ')}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-3 gap-3">
          {SHOPS.map((shop, index) => {
            const isCollected = stamps[shop.id]?.isCollected
            return (
              <Link
                key={shop.id}
                href={`/shop/${shop.id}`}
                className="group"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <MascotAura
                  src={shop.mascotImage}
                  alt={lang === 'en' ? shop.nameEn : shop.name}
                  collected={!!isCollected}
                  alwaysColor={alwaysColor}
                  sizes="120px"
                  className={cn(
                    'w-full aspect-square transition-transform group-hover:scale-[1.03] group-active:scale-[0.98]',
                  )}
                />
                <p className="mt-2 text-caption-sm font-medium text-foreground text-center line-clamp-1">
                  {lang === 'en' ? shop.nameEn : shop.name}
                </p>
                <p className="text-badge text-muted-foreground text-center">
                  {lang === 'en' ? shop.categoryEn : shop.category}
                </p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
