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
import { ReservationButton } from '@/components/reservation-button'
import { LanguageToggle } from '@/components/language-toggle'
import { MascotAura } from '@/components/mascot-image'
import { cn } from '@/lib/utils'
import {
  ChevronLeft, MapPin, Clock, Check, Sparkles,
  Phone, CalendarCheck, Tag, Wrench, Quote, Image as ImageIcon,
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
  const shopDesc = lang === 'en' ? shop.descriptionEn : shop.description
  const mainMessage = lang === 'en' ? shop.mainMessageEn : shop.mainMessage
  const tagline = lang === 'en' ? shop.taglineEn : shop.tagline
  const reservation = lang === 'en' ? shop.reservationMethodEn : shop.reservationMethod
  const businessHours = lang === 'en' ? shop.businessHoursEn : shop.businessHours
  const services = lang === 'en' ? shop.servicesEn : shop.services
  const priceRange = lang === 'en' ? shop.priceRangeEn : shop.priceRange

  const infoRows = [
    shop.phone && { icon: Phone, label: t('shop.contact'), value: shop.phone },
    reservation && { icon: CalendarCheck, label: t('shop.reservation'), value: reservation },
    businessHours && { icon: Clock, label: t('shop.businessHours'), value: businessHours },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string }[]

  const referenceImages = shop.referenceImages ?? []
  const coverImage = shop.coverImage ?? referenceImages[0]
  // 참고 이미지가 아직 없을 때도 레이아웃이 보이도록 플레이스홀더 타일 노출
  const galleryTiles = referenceImages.length > 0 ? referenceImages : [null, null, null, null]

  return (
    <div className="min-h-screen pb-28 bg-background">
      <div className="max-w-md mx-auto relative">
        {/* 커버 영역 — sticky 패럴랙스: 스크롤하면 아래 시트가 위로 덮으며 사진이 가려짐 */}
        <div className="sticky top-0 z-0 h-72 w-full overflow-hidden bg-gradient-to-br from-secondary via-accent to-secondary">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={shopName}
              fill
              priority
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover"
            />
          ) : (
            // 커버 이미지 미등록 시 마스코트 워터마크 배경
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={shop.mascotImage}
                alt=""
                width={180}
                height={180}
                className="opacity-20 blur-[1px]"
                priority
              />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />

          {/* 플로팅 컨트롤 */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center shadow-sm"
            aria-label="back"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {collected && (
              <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full glass shadow-sm">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-badge text-primary">{t('common.collected')}</span>
              </div>
            )}
            <div className="glass rounded-full shadow-sm">
              <LanguageToggle compact />
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-10 rounded-t-[36px] bg-background px-4 pt-5 pb-6 space-y-5 shadow-[0_-12px_30px_-12px_rgba(0,0,0,0.18)]">
          {/* 1. 마스코트 + 가게명 + 설명 (커버 위로 끌어올린 카드) */}
          <section className="-mt-16 relative animate-fade-in-up">
            <div className="flex items-end gap-4">
              <MascotAura
                src={shop.mascotImage}
                alt={`${shopName} ${lang === 'en' ? 'mascot' : '마스코트'}`}
                collected={collected}
                alwaysColor
                animate={justCollected}
                priority
                sizes="152px"
                className="w-[150px] h-[150px] flex-shrink-0"
              />
              <div className="flex-1 min-w-0 pb-1.5">
                {collected && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-badge mb-1.5 bg-primary/15 text-primary">
                    <Sparkles className="w-3 h-3" />{t('shop.stampCollected')}
                  </span>
                )}
                <h1 className="text-display-sm text-foreground leading-tight text-balance">{shopName}</h1>
                <p className="text-badge text-muted-foreground mt-0.5">{shopCategory}</p>
              </div>
            </div>

            {shopDesc && (
              <p className="text-body-sm text-muted-foreground leading-relaxed mt-3">{shopDesc}</p>
            )}

            {mainMessage && (
              <blockquote className="mt-3 flex gap-2.5 rounded-[14px] bg-secondary p-4">
                <Quote className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-body-sm text-foreground leading-relaxed text-balance">{mainMessage}</p>
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
              <p className="text-title-md text-foreground leading-snug text-balance">{tagline}</p>
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

          {/* 4. 참고 이미지 */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              {t('shop.referenceImages')}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {galleryTiles.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-[12px] overflow-hidden bg-secondary flex items-center justify-center">
                  {src ? (
                    <Image
                      src={src}
                      alt={`${shopName} ${i + 1}`}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-muted-foreground/40" />
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 5. 제공 서비스 */}
          {services && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
                <Wrench className="w-4 h-4 text-primary" />
                {t('shop.services')}
              </h3>
              <div className="card-base p-4">
                <p className="text-body-sm text-muted-foreground leading-relaxed">{services}</p>
              </div>
            </section>
          )}

          {/* 6. 가격대 */}
          {priceRange && (
            <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                {t('shop.priceRange')}
              </h3>
              <div className="card-base p-4">
                <p className="text-body-sm text-muted-foreground leading-relaxed whitespace-pre-line">{priceRange}</p>
              </div>
            </section>
          )}

          {/* 7. 다른 공방 둘러보기 */}
          <section className="animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            <h3 className="text-title-md text-foreground mb-3">{t('shop.otherShops')}</h3>
            <div className="flex gap-3 overflow-x-auto pt-4 pb-3 -mx-4 px-4 hide-scrollbar">
              {SHOPS.filter(s => s.id !== shop.id).slice(0, 6).map((otherShop) => {
                const otherCollected = isCollected(otherShop.id)
                return (
                  <Link key={otherShop.id} href={`/shop/${otherShop.id}`} className="flex-shrink-0 w-24">
                    <MascotAura
                      src={otherShop.mascotImage}
                      alt={lang === 'en' ? otherShop.nameEn : otherShop.name}
                      collected={otherCollected}
                      sizes="80px"
                      className="w-20 h-20 mx-auto mb-2"
                    />
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
      </div>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-16 left-0 right-0 z-40 glass border-t border-border rounded-t-[24px]">
        <div className="max-w-md mx-auto px-4 py-4">
          <ReservationButton shop={shop} className="w-full" />
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
