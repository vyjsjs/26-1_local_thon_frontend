'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/language-toggle'
import { ChevronLeft, Sparkles, Box } from 'lucide-react'

export default function MascotPage() {
  const router = useRouter()
  const { t } = useI18n()

  return (
    <div className="min-h-screen pb-4">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border/50">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
            aria-label="back"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="flex-1 text-lg font-bold text-center text-foreground">{t('mascot.title')}</h1>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-5 py-6 space-y-5">
        {/* 메인 마스코트 — 간단한 캐릭터 소개 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/20 to-secondary rounded-2xl p-6 text-center animate-fade-in-up">
          <div className="w-36 h-36 mx-auto mb-4 animate-float">
            <Image
              src="/mascots/jeongnyangi-full.png"
              alt={t('mascot.mascotName')}
              width={144}
              height={144}
              className="w-full h-full object-contain drop-shadow-xl"
              priority
            />
          </div>
          <p className="text-xs font-medium text-primary mb-1">{t('mascot.mainMascot')}</p>
          <h2 className="text-2xl font-bold text-foreground mb-2.5">{t('mascot.mascotName')}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            {t('mascot.mainDesc')}
          </p>
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent/20 blur-xl" />
        </section>

        {/* 캐릭터 세계관 — 정냥이 이야기 */}
        <section className="bg-card rounded-2xl p-5 border border-border animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {t('mascot.storyTitle')}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {t('mascot.story')}
          </p>
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

        {/* 디자이너 크레딧 */}
        <section className="bg-secondary/50 rounded-xl p-4 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xs text-muted-foreground">
            {t('mascot.designCredit')}
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
