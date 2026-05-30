'use client'

import { useRouter } from 'next/navigation'
import { useDemoMode } from '@/lib/demo-mode'
import { useI18n } from '@/lib/i18n'
import { Sparkles, X } from 'lucide-react'

// 데모 모드가 켜져 있는 동안 모든 페이지 상단 중앙에 떠 있는 표시 + 종료 버튼.
// 이 버튼을 눌러야만 데모 모드가 끝나고 홈(일반 사용자)으로 돌아간다.
export function DemoModeBanner() {
  const { isDemoMode, exitDemoMode } = useDemoMode()
  const { t } = useI18n()
  const router = useRouter()

  if (!isDemoMode) return null

  const handleExit = () => {
    exitDemoMode()
    router.push('/')
  }

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full bg-primary text-primary-foreground shadow-lg">
      <Sparkles className="w-3.5 h-3.5" />
      <span className="text-badge font-medium whitespace-nowrap">{t('demo.active')}</span>
      <button
        onClick={handleExit}
        className="flex items-center gap-1 ml-1 pl-2 pr-2.5 py-1 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
      >
        <X className="w-3 h-3" />
        <span className="text-badge font-medium whitespace-nowrap">{t('demo.exit')}</span>
      </button>
    </div>
  )
}
