'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { TOUCH_SUWON_LINK } from '@/lib/data'
import { LanguageToggle } from '@/components/language-toggle'
import { MapPin, Clock, ChevronRight, Smartphone, Navigation } from 'lucide-react'

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen pb-4 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="w-8" />
          <h1 className="text-title-md text-center text-foreground">{t('about.title')}</h1>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-4 py-6 space-y-5">
        {/* 히어로 이미지 */}
        <section className="relative overflow-hidden rounded-[14px] bg-gradient-to-br from-secondary to-muted aspect-[16/9] animate-fade-in-up">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg className="mx-auto mb-2 opacity-30" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-body-sm opacity-50">{t('home.streetPhoto')}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-badge text-white/80 mb-1">{t('about.suwonHaenggung')}</p>
            <h2 className="text-display-sm text-white">{t('about.craftStreet')}</h2>
          </div>
        </section>

        {/* 소개 텍스트 */}
        <section className="card-base p-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-display-lg text-foreground mb-3 text-balance whitespace-pre-line">
            {t('about.mainTitle')}
          </h2>
          <div className="space-y-3 text-body-sm text-muted-foreground leading-relaxed">
            <p>{t('about.desc1')}</p>
            <p>{t('about.desc2')}</p>
          </div>
        </section>

        {/* 마스코트 소개 링크 */}
        <Link href="/about/mascot">
          <section className="bg-gradient-to-br from-primary/8 via-accent to-secondary rounded-[14px] p-5 animate-fade-in-up card-interactive" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex-shrink-0">
                <Image
                  src="/mascots/main-mascot.png"
                  alt={t('about.mascotTitle')}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-title-md text-foreground mb-0.5">{t('about.mascotTitle')}</h3>
                <p className="text-body-sm text-muted-foreground">
                  {t('about.mascotDesc')}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center flex-shrink-0">
                <ChevronRight className="w-4 h-4 text-foreground" />
              </div>
            </div>
          </section>
        </Link>

        {/* 위치 정보 */}
        <section className="card-base p-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-title-md text-foreground mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-secondary flex items-center justify-center">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            {t('about.directions')}
          </h3>
          <div className="space-y-3 text-body-sm">
            <div className="flex items-start gap-3">
              <Navigation className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-caption text-foreground">{t('about.address')}</p>
                <p className="text-muted-foreground">{t('about.addressValue')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
              <div>
                <p className="text-caption text-foreground">{t('about.subway')}</p>
                <p className="text-muted-foreground">{t('about.subwayValue')}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="8" width="18" height="12" rx="2" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
              </svg>
              <div>
                <p className="text-caption text-foreground">{t('about.bus')}</p>
                <p className="text-muted-foreground">{t('about.busValue')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 운영 시간 */}
        <section className="card-base p-5 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <h3 className="text-title-md text-foreground mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-secondary flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            {t('about.operatingInfo')}
          </h3>
          <div className="space-y-2 text-body-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('about.hours')}</span>
              <span className="text-caption text-foreground">{t('about.hoursValue')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('about.closedDays')}</span>
              <span className="text-caption text-foreground">{t('about.closedDaysValue')}</span>
            </div>
          </div>
          <p className="text-caption-sm text-muted-foreground mt-3 p-2.5 bg-secondary rounded-[8px]">
            {t('about.hoursNote')}
          </p>
        </section>

        {/* 터치수원 연결 */}
        <section className="bg-gradient-to-br from-primary/8 to-primary/4 rounded-[14px] p-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-[14px] bg-primary/15 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-title-md text-foreground">{t('about.makeReservation')}</h3>
              <p className="text-badge text-muted-foreground">{t('about.touchSuwonEasy')}</p>
            </div>
          </div>
          <a
            href={TOUCH_SUWON_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full h-12 text-body-md rounded-[8px]">
              {t('touchSuwon.goTo')}
            </Button>
          </a>
        </section>
      </div>
    </div>
  )
}
