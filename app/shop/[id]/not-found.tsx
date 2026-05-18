import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-muted flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">
          <span className="block">Page Not Found</span>
          <span className="block text-lg text-muted-foreground font-normal">페이지를 찾을 수 없습니다</span>
        </h1>
        <p className="text-muted-foreground mb-6">
          The requested workshop does not exist.<br/>
          요청하신 공방 정보가 존재하지 않습니다.
        </p>
        <Link href="/">
          <Button>Go Home / 홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
