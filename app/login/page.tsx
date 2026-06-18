'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStamps } from '@/hooks/use-stamps'
import { useI18n } from '@/lib/i18n'
import { getUserId } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/language-toggle'
import { ArrowLeft, User, Stamp, LogOut, Check, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { collectedCount, totalCount } = useStamps()
  const { t } = useI18n()
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const id = getUserId()
    setUserId(id)
    const loggedIn = localStorage.getItem('gongbang-logged-in') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  const handleDemoLogin = () => {
    localStorage.setItem('gongbang-logged-in', 'true')
    setIsLoggedIn(true)
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
    }, 2000)
  }

  const handleLogout = () => {
    localStorage.setItem('gongbang-logged-in', 'false')
    setIsLoggedIn(false)
  }

  const handleGuestContinue = () => {
    router.push('/stamps')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 glass border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-foreground" />
            </Link>
            <span className="text-title-md text-foreground">{t('login.title')}</span>
          </div>
          <LanguageToggle compact />
        </div>
      </header>

      <div className="px-6 py-8">
        {/* 성공 메시지 */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm">
            <div className="bg-card rounded-[20px] p-6 shadow-xl text-center animate-bounce-in border border-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-success" />
              </div>
              <p className="text-title-md text-foreground">{t('login.welcome')}</p>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          /* 로그인된 상태 */
          <div className="space-y-6 animate-fade-in-up">
            {/* 프로필 카드 */}
            <div className="bg-gradient-to-br from-primary/8 via-primary/5 to-accent rounded-[20px] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-caption-sm text-muted-foreground">{t('login.loggedInAs')}</p>
                  <p className="text-title-md text-foreground">Demo User</p>
                </div>
              </div>

              {/* 사용자 ID */}
              <div className="card-base p-4 mb-4">
                <p className="text-badge text-muted-foreground mb-1">{t('login.userId')}</p>
                <p className="font-mono text-caption-sm text-foreground break-all">{userId}</p>
              </div>

              {/* 스탬프 현황 */}
              <div className="card-base p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Stamp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-badge text-muted-foreground">{t('login.stampCount')}</p>
                      <p className="text-title-md text-foreground">{collectedCount} / {totalCount}</p>
                    </div>
                  </div>
                  <Link href="/stamps">
                    <Button variant="outline" size="sm" className="rounded-full text-caption">
                      {t('common.viewAll')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 로그아웃 버튼 */}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full h-12 text-body-md rounded-[8px] border-destructive/30 text-destructive hover:bg-destructive/5"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t('login.logout')}
            </Button>

            {/* 스탬프 페이지로 이동 */}
            <Button
              asChild
              className="w-full h-12 text-body-md font-medium rounded-[8px]"
            >
              <Link href="/stamps">{t('stampSuccess.viewMyStamps')}</Link>
            </Button>
          </div>
        ) : (
          /* 로그인 안된 상태 */
          <div className="space-y-6 animate-fade-in-up">
            {/* 소개 */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-display-sm text-foreground mb-2">{t('login.title')}</h1>
              <p className="text-body-sm text-muted-foreground">{t('login.subtitle')}</p>
            </div>

            {/* 현재 사용자 ID 표시 */}
            <div className="bg-secondary rounded-[14px] p-4">
              <p className="text-badge text-muted-foreground mb-1">{t('login.currentUser')}</p>
              <p className="font-mono text-caption-sm text-foreground break-all">{userId}</p>
            </div>

            {/* 데모 로그인 버튼 */}
            <div className="space-y-3">
              <Button 
                onClick={handleDemoLogin}
                className="w-full h-14 text-body-md font-medium rounded-[8px]"
              >
                <User className="w-5 h-5 mr-2" />
                {t('login.demoLogin')}
              </Button>
              <p className="text-caption-sm text-center text-muted-foreground">{t('login.demoDesc')}</p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-badge text-muted-foreground">or</span>
              </div>
            </div>

            {/* 게스트 계속하기 */}
            <div className="space-y-3">
              <Button 
                variant="outline"
                onClick={handleGuestContinue}
                className="w-full h-14 text-body-md font-medium rounded-[8px]"
              >
                {t('login.guestMode')}
              </Button>
              <p className="text-caption-sm text-center text-muted-foreground">{t('login.guestDesc')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
