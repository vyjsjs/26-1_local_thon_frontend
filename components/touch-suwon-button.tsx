'use client'

import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { TOUCH_SUWON_LINK, getTouchSuwonReservationLink } from '@/lib/data'
import { Smartphone, ExternalLink, Info } from 'lucide-react'

interface TouchSuwonButtonProps {
  shopId?: string
  className?: string
  variant?: 'primary' | 'secondary'
}

export function TouchSuwonButton({ shopId, className, variant = 'primary' }: TouchSuwonButtonProps) {
  const { t } = useI18n()
  const link = shopId ? getTouchSuwonReservationLink(shopId) : TOUCH_SUWON_LINK

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex items-center justify-center gap-2.5 h-12 px-6 rounded-[8px] text-body-md font-medium transition-all active:scale-98 overflow-hidden',
        variant === 'primary'
          ? 'bg-primary text-primary-foreground hover:bg-[#e00b41]'
          : 'bg-secondary text-secondary-foreground hover:bg-accent',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
      
      <Smartphone className="w-5 h-5" />
      <span>{t('touchSuwon.button')}</span>
      <ExternalLink className="w-4 h-4 opacity-60" />
    </a>
  )
}

interface NoExperienceNoticeProps {
  className?: string
}

export function NoExperienceNotice({ className }: NoExperienceNoticeProps) {
  const { t } = useI18n()
  
  return (
    <div className={cn(
      'relative overflow-hidden rounded-[14px] bg-secondary p-5',
      className
    )}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[8px] bg-muted flex items-center justify-center flex-shrink-0">
          <Info className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-caption text-foreground mb-1">
            {t('shop.noExperience')}
          </p>
          <p className="text-body-sm text-muted-foreground leading-relaxed">
            {t('shop.noExperienceDesc')}
          </p>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-primary/5 blur-xl" />
    </div>
  )
}
