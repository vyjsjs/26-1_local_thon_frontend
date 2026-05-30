'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { StampGrid, StampProgress } from '@/components/stamp-grid'
import { LanguageToggle } from '@/components/language-toggle'
import { SHOPS, getShopByNfcId } from '@/lib/data'
import { ChevronRight, MapPin, Sparkles } from 'lucide-react'

export function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { stamps, collect, collectedCount, totalCount, isLoading } = useStamps()
  const { lang, t } = useI18n()
  const [demoTapCount, setDemoTapCount] = useState(0)
  const [showDemoButton, setShowDemoButton] = useState(false)

  // 로고 5번 탭 → 데모 모드 진입 버튼 노출
  const handleLogoTap = useCallback(() => {
    setDemoTapCount(prev => {
      const next = prev + 1
      if (next >= 5) {
        setShowDemoButton(true)
        return 0
      }
      return next
    })
  }, [])

  const handleNfcTag = useCallback(async (nfcId: string) => {
    if (nfcId === 'nfc-entrance') {
      return
    }

    const shop = getShopByNfcId(nfcId)
    if (shop) {
      const success = await collect(shop.id)
      if (success) {
        router.push(`/stamp-success?shop=${shop.id}`)
      } else {
        router.push(`/shop/${shop.id}`)
      }
    }
  }, [collect, router])

  useEffect(() => {
    const nfcId = searchParams.get('nfc')
    if (nfcId) {
      handleNfcTag(nfcId)
      window.history.replaceState({}, '', '/')
    }
  }, [searchParams, handleNfcTag])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 rounded-[14px] bg-secondary animate-pulse" />
          <p className="text-muted-foreground text-body-sm">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-4 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleLogoTap}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-[8px] bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-title-md text-foreground">{t('home.title')}</span>
          </button>
          <div className="flex items-center gap-2">
            {showDemoButton && (
              <Link
                href="/demo"
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-primary/10 text-primary text-badge hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>{t('demo.badge')}</span>
              </Link>
            )}
            <LanguageToggle compact />
            <Link 
              href="/map" 
              className="flex items-center gap-1 text-body-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span>{t('home.map')}</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* 히어로 섹션 */}
        <section className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-primary/8 via-secondary to-accent p-5 animate-fade-in-up">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-badge text-primary mb-1">{t('home.suwonHaenggung')}</p>
              <h1 className="text-display-sm text-foreground mb-2 text-balance">
                {t('home.stampTour')}
              </h1>
              <p className="text-body-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {t('home.stampTourDesc')}
              </p>
            </div>
            <div className="w-24 h-24 rounded-[14px] overflow-hidden bg-card shadow-lg animate-float flex-shrink-0">
              <Image
                src="/mascots/main-mascot.svg"
                alt={lang === 'en' ? 'Craft Street Mascot' : '공방거리 마스코트'}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl" />
        </section>

        {/* 스탬프 현황 카드 */}
        <section className="card-base p-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-title-md text-foreground">{t('home.myStamps')}</h2>
              <p className="text-caption-sm text-muted-foreground mt-0.5">
                {collectedCount === 0 
                  ? t('home.firstStamp')
                  : `${totalCount - collectedCount}${t('home.stampsLeft')}`}
              </p>
            </div>
            <Link 
              href="/stamps" 
              className="flex items-center gap-0.5 text-caption text-primary hover:text-primary/80 transition-colors"
            >
              {t('common.viewAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <StampProgress 
            collected={collectedCount} 
            total={totalCount} 
            className="mb-5" 
          />
          <StampGrid 
            shops={SHOPS} 
            stamps={stamps} 
            maxVisible={8}
            compact
          />
        </section>

        {/* 빠른 액션 버튼 */}
        <section className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Link 
            href="/map" 
            className="group card-base p-4 card-interactive"
          >
            <div className="w-10 h-10 rounded-[8px] bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
              <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <h3 className="text-title-md text-foreground">{t('home.totemMap')}</h3>
            <p className="text-caption-sm text-muted-foreground mt-0.5">{t('home.totemLocation')}</p>
          </Link>
          <Link 
            href="/about/mascot" 
            className="group card-base p-4 card-interactive"
          >
            <div className="w-10 h-10 rounded-[8px] bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
              <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </div>
            <h3 className="text-title-md text-foreground">{t('home.mascot')}</h3>
            <p className="text-caption-sm text-muted-foreground mt-0.5">{t('home.characterIntro')}</p>
          </Link>
        </section>

        {/* 공방거리 소개 */}
        <section className="card-base overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="aspect-[2/1] relative bg-gradient-to-br from-muted to-secondary">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <svg className="mx-auto mb-2 opacity-40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <p className="text-caption-sm opacity-60">{t('home.streetPhoto')}</p>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-title-md text-foreground mb-1">{t('home.craftStreetIntro')}</h3>
                <p className="text-body-sm text-muted-foreground line-clamp-2">
                  {t('home.craftStreetDesc')}
                </p>
              </div>
              <Link 
                href="/about"
                className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </Link>
            </div>
          </div>
        </section>

        {/* 공방 미리보기 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-title-md text-foreground">{t('home.browseShops')}</h2>
            <Link 
              href="/characters" 
              className="text-caption text-primary hover:text-primary/80 transition-colors"
            >
              {t('common.viewAll')}
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            {SHOPS.slice(0, 6).map((shop) => (
              <Link
                key={shop.id}
                href={`/shop/${shop.id}`}
                className="flex-shrink-0 w-[100px]"
              >
                <div className="w-[100px] h-[100px] rounded-[14px] overflow-hidden bg-muted mb-2 shadow-sm">
                  <Image
                    src={shop.mascotImage}
                    alt={lang === 'en' ? shop.nameEn : shop.name}
                    width={100}
                    height={100}
                    className={`w-full h-full object-cover transition-all ${
                      stamps[shop.id]?.isCollected ? '' : 'stamp-uncollected'
                    }`}
                  />
                </div>
                <p className="text-caption-sm font-medium text-foreground text-center line-clamp-1">
                  {lang === 'en' ? shop.nameEn : shop.name}
                </p>
                <p className="text-badge text-muted-foreground text-center">
                  {lang === 'en' ? shop.categoryEn : shop.category}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}
