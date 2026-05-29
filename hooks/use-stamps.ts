'use client'

import { useEffect, useState, useCallback } from 'react'
import { type Shop, type Stamp, SHOPS, getUserId } from '@/lib/data'
import { registerUser, collectStampApi, fetchStamps } from '@/lib/api'

// 백엔드에서 받은 수집 목록을 전체 가게 기준 스탬프 맵으로 변환
// (수집 안 된 가게도 isCollected:false 로 채워 UI 가 전체를 그릴 수 있게 함)
function buildStampMap(collected: { shopId: string; collectedAt: Date | null }[]): Record<string, Stamp> {
  const collectedMap = new Map(collected.map(c => [c.shopId, c.collectedAt]))
  const map: Record<string, Stamp> = {}
  SHOPS.forEach(shop => {
    const isCollected = collectedMap.has(shop.id)
    map[shop.id] = {
      shopId: shop.id,
      collectedAt: isCollected ? (collectedMap.get(shop.id) ?? new Date()) : null,
      isCollected,
    }
  })
  return map
}

export function useStamps() {
  const [stamps, setStamps] = useState<Record<string, Stamp>>(() => buildStampMap([]))
  const [isLoading, setIsLoading] = useState(true)

  // 마운트 시 백엔드에서 현재 스탬프 현황 로드
  useEffect(() => {
    let cancelled = false

    async function load() {
      const userId = getUserId()
      // 신규 사용자 등록 (멱등) — 조회를 막지 않도록 await 하지 않음
      registerUser(userId).catch(() => {})

      try {
        const data = await fetchStamps(userId)
        if (cancelled) return
        setStamps(buildStampMap(
          data.stamps.map(s => ({
            shopId: s.shop_id,
            collectedAt: s.collected_at ? new Date(s.collected_at) : new Date(),
          }))
        ))
      } catch (err) {
        // 백엔드 연결 실패 시 전체 미수집 상태 유지 (앱이 죽지 않도록)
        console.error('[useStamps] 스탬프 조회 실패:', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // shopId 로 스탬프 수집. 백엔드는 nfc_id 를 받으므로 'shop-1' → 'nfc-shop-1' 로 변환.
  // 반환값: 이번에 새로 수집했으면 true, 이미 수집했거나 실패면 false.
  const collect = useCallback(async (shopId: string): Promise<boolean> => {
    const userId = getUserId()
    const nfcId = `nfc-${shopId}`
    try {
      const res = await collectStampApi(userId, nfcId)
      // 신규/중복 모두 로컬 상태는 수집됨으로 갱신
      setStamps(prev => ({
        ...prev,
        [shopId]: { shopId, collectedAt: new Date(), isCollected: true },
      }))
      return res.success
    } catch (err) {
      console.error('[useStamps] 스탬프 수집 실패:', err)
      return false
    }
  }, [])

  const isCollected = useCallback((shopId: string) => {
    return stamps[shopId]?.isCollected ?? false
  }, [stamps])

  const collectedCount = Object.values(stamps).filter(s => s.isCollected).length
  const totalCount = SHOPS.length

  return {
    stamps,
    isLoading,
    collect,
    isCollected,
    collectedCount,
    totalCount,
  }
}

export function useNfcTag() {
  const [lastTaggedNfcId, setLastTaggedNfcId] = useState<string | null>(null)

  // 데모용: URL 파라미터에서 NFC ID 읽기
  useEffect(() => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    const nfcId = params.get('nfc')
    if (nfcId) {
      setLastTaggedNfcId(nfcId)
    }
  }, [])

  // 데모용: 수동으로 NFC 태깅 시뮬레이션
  const simulateNfcTag = useCallback((nfcId: string) => {
    setLastTaggedNfcId(nfcId)
  }, [])

  return {
    lastTaggedNfcId,
    simulateNfcTag,
  }
}

export function getShopById(shopId: string): Shop | undefined {
  return SHOPS.find(shop => shop.id === shopId)
}
