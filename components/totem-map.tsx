'use client'

import { useState, useCallback } from 'react'
import { SHOPS, ENTRANCE_TOTEM } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Navigation } from 'lucide-react'

interface TotemMapProps {
  stamps?: Record<string, { isCollected: boolean }>
  className?: string
  onTotemClick?: (shopId: string) => void
}

// 실제 행궁동 공방거리 좌표 범위에 맞춰 조정 (카카오맵 미사용, SVG 약식 지도)
const MAP_CONFIG = {
  width: 360,
  height: 420,
  padding: 30,
  minLat: 37.2805,
  maxLat: 37.2840,
  minLng: 127.0133,
  maxLng: 127.0165,
}

function latLngToXY(lat: number, lng: number) {
  const x = ((lng - MAP_CONFIG.minLng) / (MAP_CONFIG.maxLng - MAP_CONFIG.minLng)) * (MAP_CONFIG.width - MAP_CONFIG.padding * 2) + MAP_CONFIG.padding
  const y = ((MAP_CONFIG.maxLat - lat) / (MAP_CONFIG.maxLat - MAP_CONFIG.minLat)) * (MAP_CONFIG.height - MAP_CONFIG.padding * 2) + MAP_CONFIG.padding
  return { x, y }
}

export function TotemMap({ stamps = {}, className, onTotemClick }: TotemMapProps) {
  const { lang, t } = useI18n()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleTotemClick = useCallback((shopId: string) => {
    setSelectedId(shopId)
    if (onTotemClick) {
      onTotemClick(shopId)
    }
  }, [onTotemClick])

  const entrancePos = latLngToXY(ENTRANCE_TOTEM.coordinates.lat, ENTRANCE_TOTEM.coordinates.lng)
  const selectedShop = selectedId ? SHOPS.find(s => s.id === selectedId) : null

  return (
    <div className={cn('relative bg-gradient-to-b from-secondary/30 to-secondary/60', className)}>
      <svg
        viewBox={`0 0 ${MAP_CONFIG.width} ${MAP_CONFIG.height}`}
        className="w-full h-auto"
      >
        {/* 배경 패턴 */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* 메인 거리 */}
        <path
          d={`M ${MAP_CONFIG.padding} ${MAP_CONFIG.height * 0.55} 
              Q ${MAP_CONFIG.width * 0.3} ${MAP_CONFIG.height * 0.5}
              ${MAP_CONFIG.width * 0.5} ${MAP_CONFIG.height * 0.45}
              T ${MAP_CONFIG.width - MAP_CONFIG.padding} ${MAP_CONFIG.height * 0.4}`}
          stroke="var(--primary)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
        />
        <path
          d={`M ${MAP_CONFIG.width * 0.5} ${MAP_CONFIG.padding} 
              L ${MAP_CONFIG.width * 0.5} ${MAP_CONFIG.height - MAP_CONFIG.padding}`}
          stroke="var(--muted-foreground)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.1"
        />

        {/* 입구 토템 */}
        <g transform={`translate(${entrancePos.x}, ${entrancePos.y})`}>
          <circle r="22" fill="var(--primary)" className="animate-marker-pulse" />
          <circle r="16" fill="var(--primary-foreground)" />
          <Navigation className="text-primary" x="-8" y="-8" width="16" height="16" />
          <text
            y="36"
            textAnchor="middle"
            fill="var(--foreground)"
            fontSize="10"
            fontWeight="600"
          >
            {t('common.entrance')}
          </text>
        </g>

        {/* 공방 토템들 */}
        {SHOPS.map((shop, index) => {
          const pos = latLngToXY(shop.coordinates.lat, shop.coordinates.lng)
          const isCollected = stamps[shop.id]?.isCollected ?? false
          const isHovered = hoveredId === shop.id
          const isSelected = selectedId === shop.id

          return (
            <g
              key={shop.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId(shop.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleTotemClick(shop.id)}
            >
              {isSelected && (
                <circle
                  r="24"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="animate-spin"
                  style={{ animationDuration: '8s' }}
                />
              )}
              
              <circle
                r={isHovered || isSelected ? 18 : 16}
                fill={isCollected ? 'var(--primary)' : 'var(--muted)'}
                stroke={isCollected ? 'var(--primary-foreground)' : 'var(--border)'}
                strokeWidth="2"
                className="transition-all duration-200"
              />
              
              <text
                y="1"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isCollected ? 'var(--primary-foreground)' : 'var(--muted-foreground)'}
                fontSize="11"
                fontWeight="700"
              >
                {index + 1}
              </text>

              {isCollected && (
                <g transform="translate(10, -10)">
                  <circle r="7" fill="var(--primary-foreground)" />
                  <Check x="-4" y="-4" width="8" height="8" className="text-primary" strokeWidth={3} />
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {/* 선택된 공방 카드 */}
      {selectedShop && (
        <div className="absolute bottom-3 left-3 right-3 animate-slide-up">
          <Link href={`/shop/${selectedShop.id}`}>
            <div className="bg-card rounded-xl p-3 shadow-lg border border-border flex items-center gap-3">
              <div className={cn(
                'w-12 h-12 rounded-lg overflow-hidden flex-shrink-0',
                !stamps[selectedShop.id]?.isCollected && 'opacity-50 grayscale'
              )}>
                <Image
                  src={selectedShop.mascotImage}
                  alt={lang === 'en' ? selectedShop.nameEn : selectedShop.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={cn(
                    'text-[10px] font-medium px-1.5 py-0.5 rounded',
                    stamps[selectedShop.id]?.isCollected 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {stamps[selectedShop.id]?.isCollected ? t('common.collected') : t('common.notCollected')}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {lang === 'en' ? selectedShop.categoryEn : selectedShop.category}
                  </span>
                </div>
                <p className="font-semibold text-sm text-foreground truncate">
                  {lang === 'en' ? selectedShop.nameEn : selectedShop.name}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* 범례 */}
      <div className="absolute top-3 left-3 bg-card/95 backdrop-blur-sm rounded-lg p-2.5 text-xs space-y-1.5 shadow-sm border border-border">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-primary-foreground" />
          <span className="text-foreground font-medium">{t('map.legend.collected')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-muted border-2 border-border" />
          <span className="text-muted-foreground">{t('map.legend.notCollected')}</span>
        </div>
      </div>
    </div>
  )
}

interface TotemListMapProps {
  stamps?: Record<string, { isCollected: boolean }>
  className?: string
}

export function TotemListMap({ stamps = {}, className }: TotemListMapProps) {
  const { lang, t } = useI18n()
  
  return (
    <div className={cn('space-y-2', className)}>
      {SHOPS.map((shop, index) => {
        const isCollected = stamps[shop.id]?.isCollected ?? false
        return (
          <Link
            key={shop.id}
            href={`/shop/${shop.id}`}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl transition-all card-interactive',
              isCollected ? 'bg-primary/5 border border-primary/20' : 'bg-card border border-border'
            )}
          >
            <div
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors',
                isCollected 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {index + 1}
            </div>
            <div className={cn(
              'w-10 h-10 rounded-lg overflow-hidden flex-shrink-0',
              !isCollected && 'grayscale opacity-50'
            )}>
              <Image
                src={shop.mascotImage}
                alt={lang === 'en' ? shop.nameEn : shop.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn(
                'font-medium text-sm truncate',
                isCollected ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {lang === 'en' ? shop.nameEn : shop.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {lang === 'en' ? shop.categoryEn : shop.category}
              </p>
            </div>
            {isCollected && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
              </div>
            )}
          </Link>
        )
      })}
    </div>
  )
}
