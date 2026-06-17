'use client'

import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { SHOPS } from '@/lib/data'
import { LanguageToggle } from '@/components/language-toggle'
import { BottomNav } from '@/components/bottom-nav'
import { MascotAura } from '@/components/mascot-image'
import { ArrowLeft, Check } from 'lucide-react'
import Link from 'next/link'

export default function CharactersPage() {
  const { stamps, collectedCount, isLoading } = useStamps()
  const { lang, t } = useI18n()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 rounded-[14px] bg-secondary animate-pulse" />
          <p className="text-body-sm text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/about/mascot" 
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </Link>
            <span className="text-title-md text-foreground">{t('gallery.title')}</span>
          </div>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-4 py-6">
        {/* 소개 섹션 */}
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
              <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
                <Check className="w-3 h-3 text-success" />
                <span className="text-badge text-foreground">{collectedCount}{t('gallery.collected')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 캐릭터 그리드 */}
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
                    sizes="120px"
                    className="w-full aspect-square transition-transform group-hover:scale-[1.03] group-active:scale-[0.98]"
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

      <BottomNav />
    </div>
  )
}
