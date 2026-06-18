'use client'

import Image from 'next/image'
import { useI18n } from '@/lib/i18n'
import { X, Search, Nfc, Check, Map, HelpCircle } from 'lucide-react'

interface GuideModalProps {
  open: boolean
  onClose: () => void
}

export function GuideModal({ open, onClose }: GuideModalProps) {
  const { t } = useI18n()
  if (!open) return null

  const steps = [
    { icon: Search, title: t('guide.step1Title'), desc: t('guide.step1Desc') },
    { icon: Nfc, title: t('guide.step2Title'), desc: t('guide.step2Desc') },
    { icon: Check, title: t('guide.step3Title'), desc: t('guide.step3Desc') },
    { icon: Map, title: t('guide.step4Title'), desc: t('guide.step4Desc') },
  ]

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto bg-card rounded-t-[24px] p-6 pb-8 animate-slide-up max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
          aria-label="close"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-16 h-16 flex-shrink-0">
            <Image
              src="/mascots/jeongnyangi-full.png"
              alt=""
              width={64}
              height={64}
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>
          <div>
            <h2 className="text-display-sm text-foreground flex items-center gap-1.5">
              {t('guide.title')}
              <HelpCircle className="w-4 h-4 text-primary flex-shrink-0" />
            </h2>
            <p className="text-body-sm text-muted-foreground">{t('guide.subtitle')}</p>
          </div>
        </div>

        {/* 단계 */}
        <div className="space-y-3 mb-6">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-[12px] bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="text-caption text-foreground mb-0.5">{s.title}</h3>
                  <p className="text-body-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full h-12 rounded-[8px] bg-primary text-primary-foreground text-body-md font-medium hover:bg-[#e00b41] transition-colors active:scale-98"
        >
          {t('guide.start')}
        </button>
      </div>
    </div>
  )
}
