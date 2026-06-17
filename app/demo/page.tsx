'use client'

import { useState, useCallback, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SHOPS, getDemoUserId, type Shop } from '@/lib/data'
import { useStamps } from '@/hooks/use-stamps'
import { useDemoMode } from '@/lib/demo-mode'
import { useI18n } from '@/lib/i18n'
import { StampProgress } from '@/components/stamp-grid'
import { MascotAura } from '@/components/mascot-image'
import { LanguageToggle } from '@/components/language-toggle'
import { cn } from '@/lib/utils'
import { Nfc, RotateCcw, ChevronLeft, Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

function DemoContent() {
  const router = useRouter()
  const { lang, t } = useI18n()
  const { enterDemoMode } = useDemoMode()
  const [demoUserId] = useState(() => getDemoUserId())
  const { stamps, collect, reset, collectedCount, totalCount, isLoading } = useStamps(demoUserId)
  const [tappingShop, setTappingShop] = useState<Shop | null>(null)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  // 데모 페이지에 들어오면 전역 데모 모드 ON → 이후 모든 페이지 이동에 데모 유지
  useEffect(() => {
    enterDemoMode()
  }, [enterDemoMode])

  const handleShopTap = useCallback(async (shop: Shop) => {
    if (tappingShop) return
    setTappingShop(shop)
    await new Promise(resolve => setTimeout(resolve, 1100))
    await collect(shop.id)
    setTappingShop(null)
    router.push(`/stamp-success?shop=${shop.id}&from=demo`)
  }, [tappingShop, collect, router])

  const handleReset = useCallback(async () => {
    setIsResetting(true)
    await reset()
    setIsResetting(false)
    setShowResetConfirm(false)
  }, [reset])

  return (
    <div className="min-h-screen pb-8 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
          <Link
            href="/"
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Link>
          <div className="flex-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-badge">
              <Sparkles className="w-3 h-3" />
              {t('demo.badge')}
            </span>
          </div>
          <LanguageToggle compact />
          <button
            onClick={() => setShowResetConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-accent transition-colors text-caption text-muted-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t('demo.reset')}
          </button>
        </div>
      </header>

      <div className="px-4 py-5 space-y-5">
        {/* 진행 현황 */}
        <section className="card-base p-5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-title-md text-foreground">{t('demo.progress')}</h2>
            <span className="text-caption text-primary">{collectedCount} / {totalCount}</span>
          </div>
          <StampProgress collected={collectedCount} total={totalCount} />
        </section>

        {/* 안내 */}
        <p className="text-body-sm text-muted-foreground text-center animate-fade-in-up">
          {t('demo.subtitle')}
        </p>

        {/* 공방 그리드 */}
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[140px] rounded-[14px] bg-secondary animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
            {SHOPS.map((shop) => {
              const collected = stamps[shop.id]?.isCollected ?? false
              return (
                <button
                  key={shop.id}
                  onClick={() => handleShopTap(shop)}
                  disabled={!!tappingShop}
                  className={cn(
                    'relative rounded-[14px] p-3 text-left transition-all active:scale-95',
                    'card-base card-interactive overflow-hidden',
                    collected && 'ring-2 ring-primary ring-offset-1 ring-offset-background',
                    tappingShop?.id === shop.id && 'scale-95'
                  )}
                >
                  {/* 마스코트 이미지 */}
                  <MascotAura
                    src={shop.mascotImage}
                    alt={lang === 'en' ? shop.nameEn : shop.name}
                    collected={collected}
                    sizes="120px"
                    className="w-full aspect-square mb-2.5"
                  />

                  {/* 가게 정보 */}
                  <p className="text-caption text-foreground truncate">
                    {lang === 'en' ? shop.nameEn : shop.name}
                  </p>
                  <p className="text-badge text-muted-foreground mt-0.5">
                    {lang === 'en' ? shop.categoryEn : shop.category}
                  </p>

                  {/* 상태 배지 */}
                  <div className={cn(
                    'absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-badge',
                    collected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/80 text-muted-foreground'
                  )}>
                    {collected ? (
                      <>
                        <Check className="w-3 h-3" />
                        {t('demo.alreadyCollected')}
                      </>
                    ) : (
                      <>
                        <Nfc className="w-3 h-3" />
                        {t('demo.tapToCollect')}
                      </>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* NFC 태깅 애니메이션 오버레이 */}
      {tappingShop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
          <div className="text-center animate-in fade-in zoom-in-95 duration-300">
            {/* 파동 링 */}
            <div className="relative mx-auto mb-8 w-36 h-36">
              <div className="absolute inset-0 rounded-full bg-primary/15 animate-ping" style={{ animationDuration: '1.2s' }} />
              <div className="absolute inset-3 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '1.2s', animationDelay: '0.2s' }} />
              <div className="absolute inset-6 rounded-full bg-primary/25 animate-ping" style={{ animationDuration: '1.2s', animationDelay: '0.4s' }} />
              <div className="relative w-full h-full rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <Nfc className="w-14 h-14 text-primary" />
              </div>
            </div>

            {/* 마스코트 */}
            <MascotAura
              src={tappingShop.mascotImage}
              alt={lang === 'en' ? tappingShop.nameEn : tappingShop.name}
              collected
              animate
              sizes="80px"
              className="w-20 h-20 mx-auto mb-4"
            />
            <p className="text-title-md text-foreground">
              {lang === 'en' ? tappingShop.nameEn : tappingShop.name}
            </p>
            <p className="text-body-sm text-muted-foreground mt-1">{t('demo.nfcTapping')}</p>
          </div>
        </div>
      )}

      {/* 리셋 확인 다이얼로그 */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/30 backdrop-blur-sm">
          <div className="bg-card rounded-[20px] p-6 shadow-xl max-w-xs w-full border border-border animate-in zoom-in-95 fade-in duration-200">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-destructive" />
            </div>
            <h3 className="text-title-md text-foreground text-center mb-2">{t('demo.reset')}</h3>
            <p className="text-body-sm text-muted-foreground text-center mb-6">
              {t('demo.resetConfirm')}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-11 rounded-[8px]"
                onClick={() => setShowResetConfirm(false)}
                disabled={isResetting}
              >
                취소
              </Button>
              <Button
                className="flex-1 h-11 rounded-[8px] bg-destructive hover:bg-destructive/90"
                onClick={handleReset}
                disabled={isResetting}
              >
                {isResetting ? '초기화 중...' : t('demo.reset')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-20 h-20 rounded-[20px] bg-secondary animate-pulse" />
      </div>
    }>
      <DemoContent />
    </Suspense>
  )
}
