'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { getDemoUserId } from '@/lib/data'

// 전역 데모 모드 상태.
// 한 번 진입하면 페이지 이동(투어 계속하기, 하단 네비 등)에도 유지되고,
// "데모 모드 종료" 버튼을 눌러야만 일반 사용자 모드로 돌아간다.
const DEMO_MODE_KEY = 'gongbang-demo-mode'

interface DemoModeContextValue {
  isDemoMode: boolean
  isHydrated: boolean        // localStorage 읽기 완료 여부 (SSR/첫 렌더 보호)
  demoUserId: string | null  // 데모 모드일 때 사용할 demo- prefix user_id
  enterDemoMode: () => void
  exitDemoMode: () => void
}

const DemoModeContext = createContext<DemoModeContextValue>({
  isDemoMode: false,
  isHydrated: false,
  demoUserId: null,
  enterDemoMode: () => {},
  exitDemoMode: () => {},
})

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [demoUserId, setDemoUserId] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // 새로고침/직접 접속 시 localStorage 에서 데모 상태 복원
  useEffect(() => {
    const active = localStorage.getItem(DEMO_MODE_KEY) === 'true'
    if (active) {
      setDemoUserId(getDemoUserId())
      setIsDemoMode(true)
    }
    setIsHydrated(true)
  }, [])

  const enterDemoMode = useCallback(() => {
    const id = getDemoUserId()
    localStorage.setItem(DEMO_MODE_KEY, 'true')
    setDemoUserId(id)
    setIsDemoMode(true)
  }, [])

  const exitDemoMode = useCallback(() => {
    localStorage.setItem(DEMO_MODE_KEY, 'false')
    setIsDemoMode(false)
  }, [])

  return (
    <DemoModeContext.Provider
      value={{ isDemoMode, isHydrated, demoUserId, enterDemoMode, exitDemoMode }}
    >
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  return useContext(DemoModeContext)
}
