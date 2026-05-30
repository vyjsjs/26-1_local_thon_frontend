// 백엔드(FastAPI + Supabase) 스탬프/사용자 API 클라이언트
// NEXT_PUBLIC_API_URL 환경변수로 백엔드 주소 설정 (기본: 로컬 8000)

const API_BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000').replace(/\/$/, '')

export interface CollectResult {
  success: boolean
  shop_id: string
  already_collected: boolean
}

export interface StampApiItem {
  shop_id: string
  collected_at: string | null
}

export interface StampListResult {
  user_id: string
  stamps: StampApiItem[]
  collected_count: number
  total_count: number
}

// 신규 사용자 등록 (멱등). 실패해도 치명적이지 않으므로 호출부에서 무시 가능.
export async function registerUser(userId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  })
  if (!res.ok) throw new Error(`사용자 등록 실패: ${res.status}`)
}

// NFC 태깅 → 스탬프 수집. 백엔드는 nfc_id 기준으로 처리.
export async function collectStampApi(userId: string, nfcId: string): Promise<CollectResult> {
  const res = await fetch(`${API_BASE}/api/stamps/collect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, nfc_id: nfcId }),
  })
  if (!res.ok) throw new Error(`스탬프 수집 실패: ${res.status}`)
  return res.json()
}

// 사용자 스탬프 현황 조회
export async function fetchStamps(userId: string): Promise<StampListResult> {
  const res = await fetch(`${API_BASE}/api/stamps/${encodeURIComponent(userId)}`, {
    method: 'GET',
  })
  if (!res.ok) throw new Error(`스탬프 조회 실패: ${res.status}`)
  return res.json()
}
