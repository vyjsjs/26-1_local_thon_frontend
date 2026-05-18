'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function ApiTest() {
  const [resultMessage, setResultMessage] = useState('아직 데이터가 없습니다.')

  const handleFetchData = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      if (!apiUrl) {
        setResultMessage('.env에 NEXT_PUBLIC_API_URL이 설정되어 있지 않습니다.')
        return
      }

      const response = await fetch(`${apiUrl}/api/test`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      setResultMessage(data.message)
    } catch (error) {
      console.error('연결 실패:', error)
      setResultMessage('백엔드 연결에 실패했습니다.')
    }
  }

  return (
    <div className="p-10 flex flex-col items-start gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">API 연동 테스트</h1>

      <Button onClick={handleFetchData}>데이터 가져오기</Button>

      <div className="p-4 bg-muted rounded-md w-full">
        결과: {resultMessage}
      </div>
    </div>
  )
}
