'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import type { Shop } from '@/lib/data'
import { CalendarCheck, MapPin, ExternalLink, Copy, Check } from 'lucide-react'

// 네이버 지도 검색 링크 (장소 링크가 없을 때 가게명+주소로 검색 폴백)
function naverSearch(query: string) {
  return `https://map.naver.com/p/search/${encodeURIComponent(query)}`
}

// 표시·복사용 첫 번째 전화번호
function firstPhone(phone?: string) {
  if (!phone) return ''
  return phone.split('/')[0].trim()
}

interface ReservationButtonProps {
  shop: Shop
  className?: string
}

export function ReservationButton({ shop, className }: ReservationButtonProps) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const type = shop.reservationType ?? 'map'
  const fallback = naverSearch(`${shop.name} ${shop.address}`)

  const baseBtn =
    'group relative flex items-center justify-center gap-2 h-12 px-5 rounded-[16px] text-body-md font-medium transition-all active:scale-98 overflow-hidden'
  const shine = (
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
  )

  // 전화 복사 / 네이버 지도 중 선택
  if (type === 'choice') {
    const phone = firstPhone(shop.phone)
    const mapUrl = shop.naverMapUrl || fallback
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(phone)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      } catch {
        /* 클립보드 미지원 시 무시 */
      }
    }
    return (
      <div className={cn('flex gap-2', className)}>
        <button
          onClick={handleCopy}
          className={cn(baseBtn, 'flex-1 bg-secondary text-secondary-foreground hover:bg-accent')}
        >
          {copied ? <Check className="w-5 h-5 text-primary" /> : <Copy className="w-5 h-5" />}
          <span>{copied ? t('shop.copied') : t('shop.copyPhone')}</span>
        </button>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseBtn, 'flex-1 bg-primary text-primary-foreground hover:bg-[#e00b41]')}
        >
          {shine}
          <MapPin className="w-5 h-5" />
          <span>{t('shop.naverMapShort')}</span>
        </a>
      </div>
    )
  }

  // 단일 버튼 (naver / map)
  const isNaver = type === 'naver'
  const href = isNaver ? (shop.bookingUrl || fallback) : (shop.naverMapUrl || fallback)
  const label = isNaver ? t('shop.reserveNaver') : t('shop.viewNaverMap')
  const Icon = isNaver ? CalendarCheck : MapPin

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseBtn, 'bg-primary text-primary-foreground hover:bg-[#e00b41]', className)}
    >
      {shine}
      <Icon className="w-5 h-5" />
      <span>{label}</span>
      <ExternalLink className="w-4 h-4 opacity-60" />
    </a>
  )
}
