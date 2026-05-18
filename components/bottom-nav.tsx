'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import { Home, Stamp, Map, Info, User } from 'lucide-react'

export function BottomNav() {
  const pathname = usePathname()
  const { t } = useI18n()

  const NAV_ITEMS = [
    { href: '/', labelKey: 'nav.home', icon: Home },
    { href: '/stamps', labelKey: 'nav.stamps', icon: Stamp },
    { href: '/map', labelKey: 'nav.map', icon: Map },
    { href: '/about', labelKey: 'nav.about', icon: Info },
    { href: '/login', labelKey: 'nav.mypage', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-1.5 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center gap-0.5 px-4 py-2 rounded-[8px] transition-all',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <span className="absolute inset-0 bg-primary/8 rounded-[8px]" />
              )}
              <Icon className={cn(
                'w-5 h-5 relative z-10 transition-transform',
                isActive && 'scale-110'
              )} />
              <span className={cn(
                'text-badge relative z-10',
                isActive && 'font-semibold'
              )}>
                {t(item.labelKey)}
              </span>
            </Link>
          )
        })}
      </div>
      <div className="h-safe-bottom bg-transparent" />
    </nav>
  )
}
