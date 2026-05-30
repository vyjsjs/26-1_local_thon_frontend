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

// overrideUserId: 데모 모드에서 전달. undefined이면 일반 사용자 ID 사용.
export function useStamps(overrideUserId?: string) {
  const [stamps, setStamps] = useState<Record<string, Stamp>>(() => buildStampMap([]))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setStamps(buildStampMap([]))

    async function load() {
      const userId = overrideUserId ?? getUserId()
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
        console.error('[useStamps] 스탬프 조회 실패:', err)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [overrideUserId])

  const collect = useCallback(async (shopId: string): Promise<boolean> => {
    const userId = overrideUserId ?? getUserId()
    const nfcId = `nfc-${shopId}`
    try {
      const res = await collectStampApi(userId, nfcId)
      setStamps(prev => ({
        ...prev,
        [shopId]: { shopId, collectedAt: new Date(), isCollected: true },
      }))
      return res.success
    } catch (err) {
      console.error('[useStamps] 스탬프 수집 실패:', err)
      return false
    }
  }, [overrideUserId])

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
