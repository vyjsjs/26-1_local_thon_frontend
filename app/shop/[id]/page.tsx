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
import { TouchSuwonButton, NoExperienceNotice } from '@/components/touch-suwon-button'
import { NfcSimulator, StampCollectedToast } from '@/components/nfc-simulator'
import { LanguageToggle } from '@/components/language-toggle'
import { cn } from '@/lib/utils'
import { ChevronLeft, MapPin, Clock, Check, Sparkles, ShoppingBag } from 'lucide-react'

interface ShopPageProps {
  params: Promise<{ id: string }>
}

function ShopContent({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { stamps, collect, isCollected } = useStamps()
  const { lang, t } = useI18n()
  
  const [showCollectedToast, setShowCollectedToast] = useState(false)
  const [collectedShop, setCollectedShop] = useState<{ name: string; image: string } | null>(null)
  const [justCollected, setJustCollected] = useState(false)

  const shop = SHOPS.find(s => s.id === id)

  const handleNfcTag = useCallback((nfcId: string) => {
    if (nfcId === 'nfc-entrance') {
      router.push('/')
      return
    }

    const taggedShop = getShopByNfcId(nfcId)
    if (taggedShop) {
      const success = collect(taggedShop.id)
      if (success) {
        setCollectedShop({ 
          name: lang === 'en' ? taggedShop.nameEn : taggedShop.name, 
          image: taggedShop.mascotImage 
        })
        setShowCollectedToast(true)
        if (taggedShop.id === id) {
          setJustCollected(true)
        }
      }
      if (taggedShop.id !== id) {
        setTimeout(() => {
          router.push(`/shop/${taggedShop.id}`)
        }, 500)
      }
    }
  }, [collect, router, id, lang])

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
  const shopDesc = lang === 'en' ? shop.descriptionEn : shop.description
  const shopCategory = lang === 'en' ? shop.categoryEn : shop.category
  const shopAddress = lang === 'en' ? shop.addressEn : shop.address
  const mascotDesc = lang === 'en' ? shop.mascotDescriptionEn : shop.mascotDescription

  return (
    <div className="min-h-screen pb-28 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center gap-3">
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

      <div className="px-4 py-6 space-y-5">
        {/* 마스코트 히어로 */}
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
              <h2 className="text-display-sm text-foreground mb-1.5 text-balance">{shopName}</h2>
              <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-2">
                {shopDesc}
              </p>
            </div>
          </div>
        </section>

        {/* 마스코트 소개 */}
        <section className="card-base p-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-caption text-foreground mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t('shop.thisMascot')}
          </h3>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            {mascotDesc}
          </p>
        </section>

        {/* 위치 */}
        <section className="card-base p-4 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-[8px] bg-secondary flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-caption text-foreground mb-0.5">{t('common.location')}</p>
              <p className="text-body-sm text-muted-foreground">{shopAddress}</p>
            </div>
          </div>
        </section>

        {/* 체험 프로그램 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            {t('shop.experienceProgram')}
          </h3>
          {shop.hasExperience ? (
            <div className="space-y-3">
              {shop.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="card-base p-4 card-interactive"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-caption text-foreground">
                      {lang === 'en' ? exp.nameEn : exp.name}
                    </h4>
                    <span className="text-caption text-primary">
                      {exp.price.toLocaleString()}{lang === 'en' ? ' KRW' : '원'}
                    </span>
                  </div>
                  <p className="text-body-sm text-muted-foreground mb-3 leading-relaxed">
                    {lang === 'en' ? exp.descriptionEn : exp.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-badge text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t('common.duration')} {lang === 'en' ? exp.durationEn : exp.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <NoExperienceNotice />
          )}
        </section>

        {/* 메뉴/상품 */}
        {shop.menu.length > 0 && (
          <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
            <h3 className="text-title-md text-foreground mb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-primary" />
              {shop.hasExperience ? t('shop.menuProducts') : t('shop.featuredProducts')}
            </h3>
            <div className="card-base overflow-hidden divide-y divide-border">
              {shop.menu.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4"
                >
                  <div>
                    <p className="text-caption text-foreground">
                      {lang === 'en' ? item.nameEn : item.name}
                    </p>
                    <p className="text-badge text-muted-foreground mt-0.5">
                      {lang === 'en' ? item.descriptionEn : item.description}
                    </p>
                  </div>
                  <span className="text-caption text-primary flex-shrink-0 ml-4">
                    {item.price.toLocaleString()}{lang === 'en' ? ' KRW' : '원'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 다른 공방 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-title-md text-foreground mb-3">{t('shop.otherShops')}</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 hide-scrollbar">
            {SHOPS.filter(s => s.id !== shop.id).slice(0, 5).map((otherShop) => {
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
                  <p className="text-badge text-center text-muted-foreground">
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

      <NfcSimulator onTag={handleNfcTag} />

      {collectedShop && (
        <StampCollectedToast
          shopName={collectedShop.name}
          mascotImage={collectedShop.image}
          isVisible={showCollectedToast}
          onClose={() => setShowCollectedToast(false)}
        />
      )}
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
