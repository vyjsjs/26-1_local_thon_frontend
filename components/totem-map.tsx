'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SHOPS } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'

interface TotemMapProps {
  stamps?: Record<string, { isCollected: boolean }>
  className?: string
  onTotemClick?: (shopId: string) => void
}

// 실제 행궁동 공방거리 거리 디자인 기준 좌표 (SVG viewBox 360 x 480)
// 거리(STREETS)를 먼저 그리고, 각 가게를 그 거리 위 정확한 위치에 배치한다.
const VIEW = { w: 360, h: 480 }

// 가게/입구 토템의 지도상 위치 (구글맵 실제 배치 기준)
const MAP_POS: Record<string, { x: number; y: number }> = {
  entrance: { x: 200, y: 70 },   // 행궁로 북단 (0번 = 대표 마스코트 토템)
  'shop-1': { x: 203, y: 150 },  // 경애공방
  'shop-2': { x: 178, y: 196 },  // 영화당
  'shop-3': { x: 80, y: 214 },   // 장금이 공방 (행궁로26번길)
  'shop-4': { x: 210, y: 300 },  // 갤러리풍경
  'shop-5': { x: 210, y: 196 },  // 나녕공방
  'shop-6': { x: 236, y: 278 },  // 카페레퓨즈
  'shop-7': { x: 256, y: 348 },  // 막걸리계보
  'shop-8': { x: 243, y: 176 },  // 꽃을 담다, 종이노리
  'shop-9': { x: 243, y: 202 },  // 향기도예
  'shop-10': { x: 210, y: 240 }, // 스튜디오 로티니
  'shop-11': { x: 205, y: 170 }, // 행궁다과
  'shop-12': { x: 284, y: 236 }, // 이춘섭 명인 전통복식연구소
  'shop-13': { x: 236, y: 304 }, // 메리골드
}

// 녹지(화성행궁 일대 공원) — 좌측/좌상단
const GREENS = [
  'M 0 150 L 78 158 L 70 250 L 120 360 L 95 480 L 0 480 Z',
  'M 0 0 L 210 0 L 190 40 Q 120 60 70 105 L 0 145 Z',
]

// 거리(도로) — 실제 행궁동 도로망 약식
const STREET_MAIN = 'M 200 48 L 203 150 L 206 175 L 210 198 L 210 242 Q 213 268 230 300 L 256 352 L 250 396' // 행궁로
const STREETS = [
  'M 45 196 L 80 214 L 150 206 L 206 198',          // 행궁로26번길 (서측 → 장금이)
  'M 95 235 L 120 300 L 195 332 L 226 302',         // 서측 하단 골목
  'M 80 214 L 95 290',                              // 서측 세로 골목
  'M 210 196 L 243 188 L 284 236 L 300 232',        // 동측 골목 (나녕·종이노리·향기·이춘섭 → 정조로)
  'M 206 196 L 178 196',                            // 영화당 진입
  'M 210 240 L 236 278 L 256 348',                  // 스튜디오 → 카페 → 막걸리
  'M 236 278 L 236 304 L 210 300',                  // 카페 → 메리골드 → 갤러리
  'M 200 398 L 256 404 L 300 412',                  // 정조로777번길
]
const STREET_JEONGJO = 'M 300 8 Q 296 120 300 232 Q 304 330 296 430' // 정조로
// 우측/하단 잔가지 (지도 질감)
const STREET_THIN = [
  'M 300 120 L 345 118',
  'M 300 205 L 348 210',
  'M 256 352 L 300 360',
  'M 150 352 L 200 362',
  'M 120 300 L 90 360',
]

function ShopMarker({
  n, collected, hovered, selected,
}: { n: number; collected: boolean; hovered: boolean; selected: boolean }) {
  const r = hovered || selected ? 12 : 10.5
  return (
    <>
      {selected && (
        <circle r={r + 6} fill="none" stroke="#F6A623" strokeWidth="2" strokeDasharray="4 2"
          className="animate-spin" style={{ animationDuration: '8s' }} />
      )}
      <circle r={r} fill={collected ? '#F6A623' : '#cdd6de'} stroke="#ffffff" strokeWidth="2.5"
        className="transition-all duration-200" style={{ filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,0.18))' }} />
      <text y="1" textAnchor="middle" dominantBaseline="middle"
        fill={collected ? '#ffffff' : '#7c8893'} fontSize="11" fontWeight="700">{n}</text>
      {collected && (
        <g transform="translate(9, -9)">
          <circle r="5.5" fill="#2bb673" stroke="#ffffff" strokeWidth="1.5" />
          <path d="M -2.4 0 L -0.6 1.8 L 2.4 -1.8" fill="none" stroke="#ffffff" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </>
  )
}

export function TotemMap({ stamps = {}, className, onTotemClick }: TotemMapProps) {
  const router = useRouter()
  const { lang, t } = useI18n()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleTotemClick = useCallback((shopId: string) => {
    setSelectedId(shopId)
    onTotemClick?.(shopId)
  }, [onTotemClick])

  const selectedShop = selectedId ? SHOPS.find(s => s.id === selectedId) : null
  const ent = MAP_POS.entrance

  return (
    <div className={cn('relative', className)}>
      <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="w-full h-auto" style={{ background: '#eceff3' }}>
        {/* 녹지 */}
        {GREENS.map((d, i) => <path key={`g${i}`} d={d} fill="#c8e2c2" opacity="0.9" />)}

        {/* 정조로 (큰 도로) */}
        <path d={STREET_JEONGJO} stroke="#ccd5dd" strokeWidth="13" strokeLinecap="round" fill="none" />
        {/* 잔가지 */}
        {STREET_THIN.map((d, i) => (
          <path key={`t${i}`} d={d} stroke="#d4dce3" strokeWidth="6" strokeLinecap="round" fill="none" />
        ))}
        {/* 골목 */}
        {STREETS.map((d, i) => (
          <path key={`s${i}`} d={d} stroke="#cfd8e0" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        ))}
        {/* 행궁로 (메인) */}
        <path d={STREET_MAIN} stroke="#c4ced7" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* 도로명 */}
        <text x="170" y="252" fill="#9aa4ad" fontSize="9" fontWeight="600">행궁로</text>
        <text x="306" y="150" fill="#9aa4ad" fontSize="9" fontWeight="600" transform="rotate(90 306 150)">정조로</text>

        {/* 입구 토템 = 0번 (대표 마스코트, 클릭 시 마스코트 소개) */}
        <g
          transform={`translate(${ent.x}, ${ent.y})`}
          className="cursor-pointer"
          onClick={() => router.push('/about/mascot')}
        >
          <circle r="17" fill="var(--primary)" opacity="0.18" className="animate-marker-pulse" />
          <circle r="11.5" fill="var(--primary)" stroke="#ffffff" strokeWidth="2.5"
            style={{ filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,0.2))' }} />
          <text y="1" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="11" fontWeight="700">0</text>
          <text y="26" textAnchor="middle" fill="var(--foreground)" fontSize="9" fontWeight="600">
            {t('common.entrance')}
          </text>
        </g>

        {/* 공방 토템 */}
        {SHOPS.map((shop, index) => {
          const pos = MAP_POS[shop.id]
          if (!pos) return null
          const collected = stamps[shop.id]?.isCollected ?? false
          return (
            <g
              key={shop.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredId(shop.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleTotemClick(shop.id)}
            >
              <ShopMarker
                n={index + 1}
                collected={collected}
                hovered={hoveredId === shop.id}
                selected={selectedId === shop.id}
              />
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
                    stamps[selectedShop.id]?.isCollected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
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
          <span className="w-3.5 h-3.5 rounded-full" style={{ background: 'var(--primary)' }} />
          <span className="text-foreground font-medium">0 · {t('common.entrance')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full" style={{ background: '#F6A623' }} />
          <span className="text-foreground font-medium">{t('map.legend.collected')}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full" style={{ background: '#cdd6de' }} />
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
                isCollected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
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
