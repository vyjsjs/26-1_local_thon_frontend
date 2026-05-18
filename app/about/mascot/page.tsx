'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SHOPS } from '@/lib/data'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/language-toggle'
import { ChevronLeft, Sparkles, Box } from 'lucide-react'

export default function MascotPage() {
  const { lang, t } = useI18n()

  return (
    <div className="min-h-screen pb-4">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link 
            href="/about" 
            className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="flex-1 text-lg font-bold text-center text-foreground">{t('mascot.title')}</h1>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-5 py-6 space-y-5">
        {/* 메인 마스코트 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/20 to-secondary rounded-2xl p-6 text-center animate-fade-in-up">
          <div className="w-28 h-28 mx-auto mb-4 rounded-2xl overflow-hidden bg-card shadow-lg animate-float">
            <Image
              src="/mascots/main-mascot.svg"
              alt={t('mascot.mainMascot')}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">{t('mascot.mainMascot')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {t('mascot.mainDesc')}
          </p>
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent/20 blur-xl" />
        </section>

        {/* 토템 소개 */}
        <section className="bg-card rounded-2xl p-5 border border-border animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <Box className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1.5">{t('mascot.whatIsTotem')}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t('mascot.totemDesc')}
              </p>
            </div>
          </div>
        </section>

        {/* 마스코트 그리드 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              {t('mascot.byShop')}
            </h3>
            <Link 
              href="/characters" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {t('common.viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {SHOPS.map((shop, index) => (
              <Link
                key={shop.id}
                href={`/shop/${shop.id}`}
                className="bg-card rounded-xl p-4 border border-border card-interactive animate-fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.03}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-xl overflow-hidden bg-secondary/50">
                  <Image
                    src={shop.mascotImage}
                    alt={lang === 'en' ? shop.nameEn : shop.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-sm text-foreground mb-0.5">
                    {lang === 'en' ? shop.nameEn : shop.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {lang === 'en' ? shop.mascotDescriptionEn : shop.mascotDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 디자이너 크레딧 */}
        <section className="bg-secondary/50 rounded-xl p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs text-muted-foreground">
            {t('mascot.designCredit')}
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">
            {t('mascot.placeholderNote')}
          </p>
        </section>

        {/* 스탬프 투어로 이동 */}
        <Link href="/stamps" className="block animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <Button className="w-full" size="lg">
            {t('mascot.startTour')}
          </Button>
        </Link>
      </div>
    </div>
  )
}
