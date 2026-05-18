'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SHOPS } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { Plus, X, Nfc, Home, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface NfcSimulatorProps {
  onTag: (nfcId: string) => void
  className?: string
}

export function NfcSimulator({ onTag, className }: NfcSimulatorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { lang, t } = useI18n()

  return (
    <div className={cn('fixed bottom-24 right-4 z-40', className)}>
      {/* 시뮬레이터 패널 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-card border border-border rounded-[14px] shadow-xl overflow-hidden animate-slide-up">
          <div className="px-4 py-3 bg-secondary border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[8px] bg-primary/10 flex items-center justify-center">
                <Nfc className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-caption text-foreground">{t('nfc.title')}</h3>
                <p className="text-badge text-muted-foreground">{t('nfc.subtitle')}</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-accent transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <div className="p-3 space-y-2 max-h-72 overflow-y-auto hide-scrollbar">
            {/* 입구 토템 */}
            <button
              onClick={() => {
                onTag('nfc-entrance')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 p-3 rounded-[8px] bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-[8px] bg-primary/15 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left flex-1">
                <p className="text-caption text-primary">{t('nfc.entrance')}</p>
                <p className="text-badge text-muted-foreground">{t('nfc.goHome')}</p>
              </div>
            </button>

            <div className="h-px bg-border my-2" />

            {/* 공방 토템들 */}
            {SHOPS.map((shop) => (
              <button
                key={shop.id}
                onClick={() => {
                  onTag(shop.nfcId)
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-[8px] hover:bg-secondary transition-colors"
              >
                <div className="w-9 h-9 rounded-[8px] overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={shop.mascotImage}
                    alt={lang === 'en' ? shop.nameEn : shop.name}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-caption text-foreground truncate">
                    {lang === 'en' ? shop.nameEn : shop.name}
                  </p>
                  <p className="text-badge text-muted-foreground">
                    {lang === 'en' ? shop.categoryEn : shop.category}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 토글 버튼 */}
      <Button
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'rounded-full w-14 h-14 shadow-lg transition-all',
          isOpen 
            ? 'bg-secondary text-foreground hover:bg-accent rotate-45' 
            : 'bg-primary text-primary-foreground hover:bg-[#e00b41]'
        )}
      >
        <Plus className="w-6 h-6" />
        <span className="sr-only">{t('nfc.title')}</span>
      </Button>
    </div>
  )
}

interface StampCollectedToastProps {
  shopName: string
  mascotImage: string
  isVisible: boolean
  onClose: () => void
}

export function StampCollectedToast({ 
  shopName, 
  mascotImage, 
  isVisible, 
  onClose 
}: StampCollectedToastProps) {
  const { t } = useI18n()
  
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-foreground/30 backdrop-blur-sm">
      <div className="bg-card rounded-[20px] p-8 shadow-xl text-center animate-in zoom-in-95 fade-in duration-300 max-w-xs w-full border border-border">
        <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-accent/20 blur-xl" />
        
        <div className="relative mb-5">
          <div className="w-28 h-28 mx-auto rounded-[14px] bg-gradient-to-br from-primary/20 to-accent/20 p-1">
            <div className="w-full h-full rounded-[10px] overflow-hidden animate-stamp-collect">
              <Image 
                src={mascotImage} 
                alt={shopName}
                width={104}
                height={104}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg animate-bounce">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>
        
        <h3 className="text-display-sm text-primary mb-1.5">{t('shop.stampGet')}</h3>
        <p className="text-body-sm text-muted-foreground mb-5">
          <span className="text-caption text-foreground">{shopName}</span> {t('shop.stampCollectedMsg')}
        </p>
        <Button onClick={onClose} className="w-full h-12 text-body-md rounded-[8px]">
          {t('common.confirm')}
        </Button>
      </div>
    </div>
  )
}
