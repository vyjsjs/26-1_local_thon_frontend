'use client'

import { Suspense } from 'react'
import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { StampProgress, StampCard } from '@/components/stamp-grid'
import { CharacterGallery } from '@/components/character-gallery'
import { LanguageToggle } from '@/components/language-toggle'
import { SHOPS } from '@/lib/data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Grid3X3, Sparkles, Trophy, Info } from 'lucide-react'

function StampsContent() {
  const { stamps, collectedCount, totalCount, isLoading } = useStamps()
  const { t } = useI18n()

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

  const isComplete = collectedCount === totalCount

  return (
    <div className="min-h-screen pb-4 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="w-8" />
          <h1 className="text-title-md text-center text-foreground">{t('stamps.title')}</h1>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-4 py-6 space-y-5">
        {/* 진행 상황 카드 */}
        <section className={`relative overflow-hidden rounded-[14px] p-5 animate-fade-in-up ${
          isComplete 
            ? 'bg-gradient-to-br from-primary/10 via-accent to-primary/5' 
            : 'card-base'
        }`}>
          {isComplete && (
            <div className="absolute top-3 right-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
            </div>
          )}
          <StampProgress 
            collected={collectedCount} 
            total={totalCount} 
          />
          <p className={`text-center text-body-sm mt-4 ${isComplete ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
            {isComplete
              ? t('stamps.congratulations')
              : `${totalCount - collectedCount}${t('stamps.stampsRemaining')}`
            }
          </p>
        </section>

        {/* 탭 — 캐릭터 도감(기본) / 스탬프 목록 */}
        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="w-full h-11 p-1 bg-secondary rounded-[8px]">
            <TabsTrigger
              value="collection"
              className="flex-1 h-full rounded-[4px] data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5 text-caption"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('gallery.title')}</span>
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex-1 h-full rounded-[4px] data-[state=active]:bg-card data-[state=active]:shadow-sm gap-1.5 text-caption"
            >
              <Grid3X3 className="w-4 h-4" />
              <span>{t('stamps.grid')}</span>
            </TabsTrigger>
          </TabsList>

          {/* 캐릭터 도감 (우선 노출) */}
          <TabsContent value="collection" className="mt-4 animate-fade-in-up">
            <CharacterGallery stamps={stamps} collectedCount={collectedCount} showIntro={false} />
          </TabsContent>

          {/* 스탬프 목록 */}
          <TabsContent value="list" className="mt-4 space-y-4 animate-fade-in-up">
            {/* 수집 완료 */}
            {collectedCount > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h3 className="text-caption text-foreground">
                    {t('stamps.collectedSection')} ({collectedCount})
                  </h3>
                </div>
                <div className="space-y-2">
                  {SHOPS.filter(shop => stamps[shop.id]?.isCollected).map((shop) => (
                    <StampCard
                      key={shop.id}
                      shop={shop}
                      isCollected={true}
                      showDetails
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 미수집 */}
            {collectedCount < totalCount && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                  <h3 className="text-caption text-muted-foreground">
                    {t('stamps.notCollectedSection')} ({totalCount - collectedCount})
                  </h3>
                </div>
                <div className="space-y-2">
                  {SHOPS.filter(shop => !stamps[shop.id]?.isCollected).map((shop) => (
                    <StampCard
                      key={shop.id}
                      shop={shop}
                      isCollected={false}
                      showDetails
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* 안내 */}
        <section className="bg-secondary rounded-[14px] p-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[8px] bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-caption text-foreground mb-1.5">{t('stamps.howToCollect')}</h3>
              <ol className="text-caption-sm text-muted-foreground space-y-1 leading-relaxed">
                <li>{t('stamps.step1')}</li>
                <li>{t('stamps.step2')}</li>
                <li>{t('stamps.step3')}</li>
              </ol>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function StampsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 rounded-[14px] bg-secondary animate-pulse" />
          <p className="text-body-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <StampsContent />
    </Suspense>
  )
}
