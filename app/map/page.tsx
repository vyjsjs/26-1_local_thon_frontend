'use client'

import { Suspense } from 'react'
import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { TotemMap, TotemListMap } from '@/components/totem-map'
import { LanguageToggle } from '@/components/language-toggle'
import { MapPin, Info } from 'lucide-react'

function MapContent() {
  const { stamps, isLoading } = useStamps()
  const { t } = useI18n()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
          <p className="text-muted-foreground text-sm">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-4">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border/50">
        <div className="px-5 py-3.5 flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">{t('map.title')}</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('map.suwonHaenggung')}</span>
            </div>
            <LanguageToggle compact />
          </div>
        </div>
      </header>

      <div className="px-5 py-5 space-y-4">
        {/* 지도 */}
        <section className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm animate-fade-in-up">
          <TotemMap stamps={stamps} />
        </section>

        {/* 안내 */}
        <section className="flex items-start gap-3 p-4 bg-primary/5 rounded-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Info className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-0.5">{t('map.findTotem')}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('map.findTotemDesc')}
            </p>
          </div>
        </section>

        {/* 공방 목록 */}
        <section className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {t('map.shopList')}
          </h3>
          <TotemListMap stamps={stamps} />
        </section>
      </div>
    </div>
  )
}

export default function MapPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    }>
      <MapContent />
    </Suspense>
  )
}
