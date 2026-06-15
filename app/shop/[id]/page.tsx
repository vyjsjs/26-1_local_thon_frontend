'use client'

import { Suspense } from 'react'
import { use, useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SHOPS, getShopByNfcId } from '@/lib/data'
import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { TouchSuwonButton } from '@/components/touch-suwon-button'
import { LanguageToggle } from '@/components/language-toggle'
import { cn } from '@/lib/utils'
import {
  ChevronLeft, MapPin, Clock, Check, Sparkles,
  Phone, CalendarCheck, Tag, Wrench, Quote,
} from 'lucide-react'

interface ShopPageProps {
  params: Promise<{ id: string }>
}

function ShopContent({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { collect, isCollected } = useStamps()
  const { lang, t } = useI18n()

  const [justCollected, setJustCollected] = useState(false)

  const shop = SHOPS.find(s => s.id === id)

  const handleNfcTag = useCallback(async (nfcId: string) => {
    if (nfcId === 'nfc-entrance') {
      router.push('/')
      return
    }

    const taggedShop = getShopByNfcId(nfcId)
    if (taggedShop) {
      if (taggedShop.id === id) setJustCollected(true)
      await collect(taggedShop.id)
      router.push(`/stamp-success?shop=${taggedShop.id}`)
    }
  }, [collect, router, id])

  useEffect(() => {
    const nfcId = searchParams.get('nfc')
    if (nfcId) {
      handleNfcTag(nfcId)
      window.history.replaceState({}, '', `/shop/${id}`)
    }
  }, [searchParams, handleNfcTag, id])

  if (!shop) {
    notFound()
  }

  const collected = isCollected(shop.id)
  const shopName = lang === 'en' ? shop.nameEn : shop.name
  const shopCategory = lang === 'en' ? shop.categoryEn : shop.category
  const shopAddress = lang === 'en' ? shop.addressEn : shop.address
  const mainMessage = lang === 'en' ? shop.mainMessageEn : shop.mainMessage
  const tagline = lang === 'en' ? shop.taglineEn : shop.tagline
  const reservation = lang === 'en' ? shop.reservationMethodEn : shop.reservationMethod
  const businessHours = lang === 'en' ? shop.businessHoursEn : shop.businessHours
  const services = lang === 'en' ? shop.servicesEn : shop.services
  const priceRange = lang === 'en' ? shop.priceRangeEn : shop.priceRange

  // 연락처/예약/영업시간 — 가게에 정보가 있는 항목만 노출
  const infoRows = [
    shop.phone && { icon: Phone, label: t('shop.contact'), value: shop.phone },
    reservation && { icon: CalendarCheck, label: t('shop.reservation'), value: reservation },
    businessHours && { icon: Clock, label: t('shop.businessHours'), value: businessHours },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string }[]

  const referenceImages = shop.referenceImages ?? []

  return (
    <div className="min-h-screen pb-28 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-title-md text-foreground truncate">{shopName}</h1>
            <p className="text-badge text-muted-foreground">{shopCategory}</p>
          </div>
          <LanguageToggle compact />
          {collected && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10">
              <Check className="w-3.5 h-3.5 text-primary" />
              <span className="text-badge text-primary">{t('common.collected')}</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-5">
        {/* 1. 스탬프 획득 카드 (마스코트 + 가게명 + 메인 메시지) */}
        <section className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-secondary via-accent to-secondary p-5 animate-fade-in-up">
          <div className="flex items-center gap-5">
            <div className={cn(
              'relative w-28 h-28 rounded-[14px] overflow-hidden shadow-lg flex-shrink-0 transition-all',
              justCollected && 'animate-stamp-collect animate-stamp-glow',
              collected ? 'ring-2 ring-primary ring-offset-2 ring-offset-secondary' : ''
            )}>
              <Image
                src={shop.mascotImage}
                alt={`${shopName} ${lang === 'en' ? 'mascot' : '마스코트'}`}
                width={112}
                height={112}
                className={cn(
                  'w-full h-full object-cover',
                  !collected && 'grayscale opacity-60'
                )}
                priority
              />
              {collected && (
                <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn(
                  'inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-badge',
                  collected ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                )}>
                  {collected ? (
                    <>
                      <Sparkles className="w-3 h-3" />
                      {t('shop.stampCollected')}
                    </>
                  ) : t('common.notCollected')}
                </span>
              </div>
              <h2 className="text-display-sm text-foreground mb-1 text-balance">{shopName}</h2>
              <p className="text-badge text-muted-foreground">{shopCategory}</p>
            </div>
          </div>

          {/* 메인 메시지 */}
          {mainMessage && (
            <blockquote className="mt-4 flex gap-2.5 rounded-[14px] bg-card/70 backdrop-blur-sm p-4">
              <Quote className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-body-sm text-foreground leading-relaxed text-balance">
                {mainMessage}
              </p>
            </blockquote>
          )}
        </section>

        {/* 2. 셀링 포인트 한 줄 */}
        {tagline && (
          <section className="card-base p-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-caption text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              {t('shop.sellingPoint')}
            </h3>
            <p className="text-title-md text-foreground leading-snug text-balance">
              {tagline}
            </p>
          </section>
        )}

        {/* 3. 위치 + 연락처 / 예약 방식 / 영업 시간 */}
        <section className="card-base p-4 space-y-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-[8px] bg-secondary flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-caption text-foreground mb-0.5">{t('common.location')}</p>
              <p className="text-body-sm text-muted-foreground leading-relaxed">{shopAddress}</p>
            </div>
          </div>

          {infoRows.length > 0 && (
            <div className="space-y-4 pt-1 border-t border-border">
              {infoRows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 first:pt-3">
                  <div className="w-9 h-9 rounded-[8px] bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-caption text-foreground mb-0.5">{label}</p>
                    <p className="text-body-sm text-muted-foreground leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. 제공 서비스 */}
        {services && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              {t('shop.services')}
            </h3>
            <div className="card-base p-4">
              <p className="text-body-sm text-muted-foreground leading-relaxed">{services}</p>
            </div>
          </section>
        )}

        {/* 5. 가격대 */}
        {priceRange && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" />
              {t('shop.priceRange')}
            </h3>
            <div className="card-base p-4">
              <p className="text-body-sm text-muted-foreground leading-relaxed whitespace-pre-line">{priceRange}</p>
            </div>
          </section>
        )}

        {/* 6. 참고 이미지 */}
        {referenceImages.length > 0 && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-title-md text-foreground mb-3">{t('shop.referenceImages')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {referenceImages.map((src, i) => (
                <div key={src} className="relative aspect-square rounded-[14px] overflow-hidden bg-secondary">
                  <Image
                    src={src}
                    alt={`${shopName} ${i + 1}`}
                    fill
                    sizes="(max-width: 448px) 50vw, 224px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. 다른 공방 둘러보기 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <h3 className="text-title-md text-foreground mb-3">{t('shop.otherShops')}</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            {SHOPS.filter(s => s.id !== shop.id).slice(0, 6).map((otherShop) => {
              const otherCollected = isCollected(otherShop.id)
              return (
                <Link
                  key={otherShop.id}
                  href={`/shop/${otherShop.id}`}
                  className="flex-shrink-0 w-24"
                >
                  <div className={cn(
                    'w-20 h-20 mx-auto rounded-[14px] overflow-hidden mb-2 transition-all',
                    otherCollected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'opacity-60'
                  )}>
                    <Image
                      src={otherShop.mascotImage}
                      alt={lang === 'en' ? otherShop.nameEn : otherShop.name}
                      width={80}
                      height={80}
                      className={cn(
                        'w-full h-full object-cover',
                        !otherCollected && 'grayscale'
                      )}
                    />
                  </div>
                  <p className="text-caption-sm font-medium text-center text-foreground line-clamp-1">
                    {lang === 'en' ? otherShop.nameEn : otherShop.name}
                  </p>
                  <p className="text-badge text-center text-muted-foreground line-clamp-1">
                    {lang === 'en' ? otherShop.categoryEn : otherShop.category}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 z-40 glass border-t border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          {shop.hasExperience ? (
            <TouchSuwonButton shopId={shop.id} className="w-full" />
          ) : (
            <div className="text-center">
              <p className="text-body-sm text-muted-foreground mb-2">
                {t('shop.noExperienceBottom')}
              </p>
              <Link
                href="/stamps"
                className="inline-flex items-center gap-1 text-primary text-caption hover:text-primary/80 transition-colors"
              >
                {t('shop.browseOther')}
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default function ShopPage({ params }: ShopPageProps) {
  const { id } = use(params)

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 rounded-[14px] bg-secondary animate-pulse" />
          <p className="text-body-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <ShopContent id={id} />
    </Suspense>
  )
}
