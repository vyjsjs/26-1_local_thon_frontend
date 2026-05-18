'use client'

import { Suspense } from 'react'
import { HomeContent } from '@/components/home-content'

export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted animate-pulse" />
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
