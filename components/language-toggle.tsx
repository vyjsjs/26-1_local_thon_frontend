'use client'

import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  className?: string
  compact?: boolean
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
  const { lang, setLang } = useI18n()

  return (
    <button
      onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
      className={cn(
        'flex items-center gap-1.5 transition-all active:scale-95',
        compact 
          ? 'px-2 py-1 rounded-md bg-secondary/80 hover:bg-secondary' 
          : 'px-2.5 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary',
        className
      )}
      aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      <Globe className={cn('text-muted-foreground', compact ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      <span className={cn(
        'font-medium text-foreground',
        compact ? 'text-[10px]' : 'text-xs'
      )}>
        {lang === 'ko' ? 'EN' : '한'}
      </span>
    </button>
  )
}
