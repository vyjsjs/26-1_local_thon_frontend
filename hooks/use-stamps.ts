'use client'

import { useEffect, useState, useCallback } from 'react'
import { type Shop, type Stamp, getStamps, collectStamp, SHOPS } from '@/lib/data'

export function useStamps() {
  const [stamps, setStamps] = useState<Record<string, Stamp>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadedStamps = getStamps()
    setStamps(loadedStamps)
    setIsLoading(false)
  }, [])

  const collect = useCallback((shopId: string) => {
    const collected = collectStamp(shopId)
    if (collected) {
      setStamps(prev => ({
        ...prev,
        [shopId]: collected
      }))
      return true
    }
    return false
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
