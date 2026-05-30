import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { BottomNav } from '@/components/bottom-nav'
import { DemoModeBanner } from '@/components/demo-mode-banner'
import { I18nProvider } from '@/lib/i18n'
import { DemoModeProvider } from '@/lib/demo-mode'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '수원 공방거리 스탬프 투어 | Suwon Craft Street Stamp Tour',
  description: '수원 행궁동 공방거리를 탐험하고 스탬프를 모아보세요! Explore Suwon Craft Street and collect stamps!',
  generator: 'v0.app',
  keywords: ['수원', '공방거리', '스탬프투어', '행궁동', '체험', '공방', '터치수원', 'Suwon', 'Craft Street', 'Stamp Tour'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: '수원 공방거리 스탬프 투어 | Suwon Craft Street Stamp Tour',
    description: '수원 행궁동 공방거리를 탐험하고 스탬프를 모아보세요!',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#D4885A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-background" data-scroll-behavior="smooth">
      <body className="font-sans antialiased min-h-screen pb-20">
        <I18nProvider>
          <DemoModeProvider>
            <main className="max-w-md mx-auto">
              {children}
            </main>
            <DemoModeBanner />
            <BottomNav />
          </DemoModeProvider>
        </I18nProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
