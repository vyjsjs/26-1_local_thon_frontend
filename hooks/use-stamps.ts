'use client'

import { useEffect, useState, useCallback } from 'react'
import { type Shop, type Stamp, SHOPS, getUserId } from '@/lib/data'
import { registerUser, collectStampApi, fetchStamps, resetStampsApi } from '@/lib/api'
import { useDemoMode } from '@/lib/demo-mode'

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

// overrideUserId: 특정 사용자 ID를 강제할 때 전달(예: /demo, /stamp-success).
// 전달하지 않으면 전역 데모 모드 여부에 따라 자동으로 demo-/일반 사용자 ID를 사용한다.
export function useStamps(overrideUserId?: string) {
  const { isDemoMode, demoUserId, isHydrated } = useDemoMode()
  const [stamps, setStamps] = useState<Record<string, Stamp>>(() => buildStampMap([]))
  const [isLoading, setIsLoading] = useState(true)

  // 유효 user id 결정 우선순위:
  //  1) 명시적 override 가 최우선
  //  2) 전역 데모 모드가 켜져 있으면 demoUserId
  //  3) 그 외에는 null → effect 안에서 getUserId()(일반 사용자)로 계산
  const effectiveUserId = overrideUserId ?? (isDemoMode ? demoUserId : null)

  useEffect(() => {
    // 데모 상태 확정 전에는 조회 보류 (실 사용자 데이터가 잠깐 보이는 것 방지)
    if (!isHydrated) return

    let cancelled = false
    setIsLoading(true)
    setStamps(buildStampMap([]))

    async function load() {
      const userId = effectiveUserId ?? getUserId()
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
  }, [isHydrated, effectiveUserId])

  const collect = useCallback(async (shopId: string): Promise<boolean> => {
    const userId = effectiveUserId ?? getUserId()
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
  }, [effectiveUserId])

  // 스탬프 전체 초기화 — 실제 DB(Supabase)에서 삭제 후 로컬 상태도 비움.
  // 데모 모드 전용(백엔드가 demo- prefix 만 허용). 같은 user_id 를 유지한다.
  const reset = useCallback(async (): Promise<boolean> => {
    const userId = effectiveUserId ?? getUserId()
    try {
      await resetStampsApi(userId)
      setStamps(buildStampMap([]))
      return true
    } catch (err) {
      console.error('[useStamps] 스탬프 초기화 실패:', err)
      return false
    }
  }, [effectiveUserId])

  const isCollected = useCallback((shopId: string) => {
    return stamps[shopId]?.isCollected ?? false
  }, [stamps])

  const collectedCount = Object.values(stamps).filter(s => s.isCollected).length
  const totalCount = SHOPS.length

  return {
    stamps,
    isLoading,
    collect,
    reset,
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
