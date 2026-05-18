'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { SHOPS } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Check, Sparkles, Trophy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

function StampSuccessContent() {
  const searchParams = useSearchParams()
  const { collectedCount, totalCount } = useStamps()
  const { lang, t } = useI18n()
  const [showConfetti, setShowConfetti] = useState(true)
  
  const shopId = searchParams.get('shop')
  const shop = SHOPS.find(s => s.id === shopId)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-body-sm text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  const progressPercent = Math.round((collectedCount / totalCount) * 100)
  const isComplete = collectedCount === totalCount

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                backgroundColor: ['#ff385c', '#00a699', '#428bff', '#ffb400', '#92174d'][i % 5],
                animation: `confetti-fall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* 마스코트 이미지 */}
        <div className="relative mb-8 animate-bounce-in">
          <div className="w-40 h-40 rounded-[20px] overflow-hidden bg-card shadow-lg border border-border">
            <Image
              src={shop.mascotImage}
              alt={lang === 'en' ? shop.nameEn : shop.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg animate-bounce">
            <Check className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-[#ffb400] flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-[#7a5200]" />
          </div>
        </div>

        {/* 가게 이름 */}
        <h2 className="text-display-lg text-foreground mb-1 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {lang === 'en' ? shop.nameEn : shop.name}
        </h2>

        {/* 획득 완료 텍스트 */}
        <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-display-xl text-primary mb-2">{t('stampSuccess.title')}</h1>
          <p className="text-body-sm text-muted-foreground">{t('stampSuccess.subtitle')}</p>
        </div>

        {/* 진행률 */}
        <div className="w-full max-w-xs mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-caption-sm text-muted-foreground">{t('stampSuccess.progress')}</span>
            <span className="text-caption text-foreground">{collectedCount} / {totalCount}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {isComplete && (
            <div className="flex items-center justify-center gap-2 mt-3 text-primary">
              <Trophy className="w-4 h-4" />
              <span className="text-caption text-primary">{t('stamps.congratulations')}</span>
            </div>
          )}
        </div>

        {/* 버튼들 */}
        <div className="w-full max-w-xs space-y-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button 
            asChild
            className="w-full h-12 text-body-md font-medium rounded-[8px]"
          >
            <Link href="/stamps">{t('stampSuccess.viewMyStamps')}</Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="w-full h-12 text-body-md font-medium rounded-[8px]"
          >
            <Link href={`/shop/${shop.id}`}>{t('stampSuccess.continueTour')}</Link>
          </Button>
        </div>

        {/* 로그인 유도 */}
        <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <Link 
            href="/login" 
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary hover:bg-accent transition-colors"
          >
            <span className="text-body-sm text-foreground">{t('stampSuccess.loginPrompt')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function StampSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-20 h-20 rounded-[20px] bg-secondary animate-pulse" />
      </div>
    }>
      <StampSuccessContent />
    </Suspense>
  )
}
