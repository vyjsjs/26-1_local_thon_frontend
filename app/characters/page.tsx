'use client'

import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { LanguageToggle } from '@/components/language-toggle'
import { BottomNav } from '@/components/bottom-nav'
import { CharacterGallery } from '@/components/character-gallery'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function CharactersPage() {
  const { stamps, collectedCount, isLoading } = useStamps()
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

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/about/mascot"
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </Link>
            <span className="text-title-md text-foreground">{t('gallery.title')}</span>
          </div>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-4 py-6">
        <CharacterGallery stamps={stamps} collectedCount={collectedCount} />
      </div>

      <BottomNav />
    </div>
  )
}
