'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'ko' | 'en'

interface I18nContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

// 공통 번역 (페이지/컴포넌트 텍스트)
const translations: Record<Language, Record<string, string>> = {
  ko: {
    // 공통
    'common.loading': '불러오는 중...',
    'common.viewAll': '전체보기',
    'common.viewMore': '더보기',
    'common.collected': '획득',
    'common.notCollected': '미수집',
    'common.collectedComplete': '획득완료',
    'common.complete': '완료',
    'common.confirm': '확인',
    'common.back': '뒤로',
    'common.location': '위치',
    'common.category': '카테고리',
    'common.price': '원',
    'common.duration': '소요시간',
    'common.entrance': '입구',
    'common.salesOnly': '판매 전용',
    'common.experiences': '체험',
    'common.experienceAvailable': '체험 가능',

    // 홈
    'home.title': '공방거리',
    'home.map': '지도',
    'home.suwonHaenggung': '수원 행궁동',
    'home.stampTour': '공방거리 스탬프 투어',
    'home.stampTourDesc': '토템을 찾아 NFC를 태깅하고\n귀여운 스탬프를 모아보세요',
    'home.myStamps': '나의 스탬프',
    'home.firstStamp': '첫 스탬프를 모아보세요!',
    'home.stampsLeft': '개 남았어요',
    'home.totemMap': '토템 지도',
    'home.totemLocation': '토템 위치 확인',
    'home.mascot': '마스코트',
    'home.characterIntro': '캐릭터 소개',
    'home.craftStreetIntro': '공방거리 소개',
    'home.craftStreetDesc': '수원 행궁동, 전통과 현대가 어우러진 수공예 문화의 중심지',
    'home.browseShops': '공방 둘러보기',
    'home.streetPhoto': '공방거리 전경',

    // 스탬프
    'stamps.title': '나의 스탬프',
    'stamps.congratulations': '축하합니다! 모든 스탬프를 수집했어요!',
    'stamps.stampsRemaining': '개의 스탬프가 남았어요',
    'stamps.grid': '스탬프',
    'stamps.map': '지도',
    'stamps.collectedSection': '수집 완료',
    'stamps.notCollectedSection': '미수집',
    'stamps.howToCollect': '스탬프 수집 방법',
    'stamps.step1': '1. 공방거리의 토템을 찾아보세요',
    'stamps.step2': '2. 토템의 NFC를 스마트폰으로 태깅하세요',
    'stamps.step3': '3. 자동으로 스탬프가 수집됩니다!',
    'stamps.shopList': '공방 목록',

    // 가게 상세
    'shop.stampCollected': '스탬프 획득',
    'shop.thisMascot': '이 가게의 마스코트',
    'shop.experienceProgram': '체험 프로그램',
    'shop.noExperience': '체험 프로그램이 없는 공방입니다',
    'shop.noExperienceDesc': '이 공방에서는 완성된 수공예품을 구매하실 수 있습니다. 방문하여 장인의 작품을 직접 감상해보세요!',
    'shop.menuProducts': '메뉴 / 상품',
    'shop.featuredProducts': '대표 상품',
    'shop.otherShops': '다른 공방 둘러보기',
    'shop.noExperienceBottom': '이 공방은 체험 프로그램이 없습니다',
    'shop.browseOther': '다른 공방 둘러보기',
    'shop.stampGet': '스탬프 획득!',
    'shop.stampCollectedMsg': '스탬프를 수집했습니다',
    'shop.sellingPoint': '이 가게의 한 줄',
    'shop.contact': '가게 연락처',
    'shop.reservation': '예약 방식',
    'shop.businessHours': '영업 시간',
    'shop.services': '제공 서비스',
    'shop.priceRange': '가격대',
    'shop.referenceImages': '참고 이미지',
    'shop.reserveNaver': '네이버 예약하기',
    'shop.reservePhone': '전화로 예약·문의',
    'shop.viewNaverMap': '네이버 지도에서 보기',
    'shop.copyPhone': '전화번호 복사',
    'shop.copied': '복사됨',
    'shop.naverMapShort': '네이버 지도',

    // 지도
    'map.title': '토템 지도',
    'map.suwonHaenggung': '수원 행궁동',
    'map.findTotem': '토템을 찾아보세요',
    'map.findTotemDesc': '지도의 마커를 터치하면 해당 공방 정보를 확인할 수 있어요. 토템의 NFC를 태깅하면 스탬프가 자동으로 수집됩니다!',
    'map.shopList': '공방 목록',
    'map.legend.collected': '수집 완료',
    'map.legend.notCollected': '미수집',

    // 소개
    'about.title': '공방거리 소개',
    'about.suwonHaenggung': '수원 행궁동',
    'about.craftStreet': '공방거리',
    'about.mainTitle': '전통과 현대가 어우러진\n수공예 문화의 중심지',
    'about.desc1': '수원 화성의 정문인 장안문에서 화성행궁으로 이어지는 행궁동 일대에는 다양한 공방들이 모여 있는 공방거리가 형성되어 있습니다.',
    'about.desc2': '한복, 도예, 원석·칠보·라탄 공예, 전통 다과 등 다양한 분야의 장인들이 정성을 다해 작품을 만들고, 그 기술을 전하고 있습니다.',
    'about.mascotTitle': '공방거리 마스코트',
    'about.mascotDesc': '귀여운 마스코트들을 만나보세요',
    'about.directions': '찾아오시는 길',
    'about.address': '주소',
    'about.addressValue': '경기도 수원시 팔달구 행궁로 일대',
    'about.subway': '지하철',
    'about.subwayValue': '수원역에서 버스 이용 (약 15분)',
    'about.bus': '버스',
    'about.busValue': '화성행궁 정류장 하차',
    'about.operatingInfo': '운영 안내',
    'about.hours': '운영 시간',
    'about.hoursValue': '10:00 - 18:00',
    'about.closedDays': '휴무일',
    'about.closedDaysValue': '월요일 (일부 공방 제외)',
    'about.hoursNote': '각 공방별 운영 시간이 다를 수 있으니 방문 전 확인해주세요.',
    'about.makeReservation': '체험 예약하기',
    'about.touchSuwonEasy': '터치수원 앱에서 간편하게',
    'about.mapCtaTitle': '공방거리 길찾기',
    'about.mapCtaDesc': '네이버 지도로 행궁동 공방거리를 확인하세요',
    'about.mapCtaButton': '네이버 지도에서 보기',

    // 마스코트
    'mascot.title': '마스코트 소개',
    'mascot.mascotName': '정냥이',
    'mascot.mainMascot': '공방거리 마스코트',
    'mascot.mainDesc': "행궁동이 그리워 고양이로 환생한 조선의 왕 '정냥이'! 역사와 예술이 살아 숨 쉬는 행궁동 공방 골목으로 그대를 초대하오.",
    'mascot.storyTitle': '정냥이 이야기',
    'mascot.story': "예술과 문화를 사랑한 조선의 왕, 정조. 행궁동 공방거리의 온기가 그리워 현대의 귀여운 길고양이 '정냥이'로 환생했습니다.\n\n평범한 골목 고양이 같지만, 붉은 곤룡포와 근엄한 표정! 공방거리의 묘왕(猫王)과 함께 역사와 예술이 살아 숨 쉬는 특별한 로컬 예술 여행을 시작해 보세요.",
    'mascot.whatIsTotem': '토템이란?',
    'mascot.totemDesc': '공방거리 곳곳에 설치된 3D 조형물로, 마스코트를 형상화했습니다. 각 토템에는 NFC 태그가 내장되어 있어, 스마트폰으로 태깅하면 해당 공방의 정보와 스탬프를 획득할 수 있습니다.',
    'mascot.byShop': '공방별 마스코트',
    'mascot.designCredit': '공방별 마스코트는 정냥이가 각 공방의 색을 입은 변형 캐릭터예요.',
    'mascot.startTour': '스탬프 투어 시작하기',

    // 터치수원
    'touchSuwon.button': '터치수원 예약바로가기',
    'touchSuwon.goTo': '터치수원 바로가기',

    // NFC 시뮬레이터
    'nfc.title': 'NFC 시뮬레이터',
    'nfc.subtitle': '데모 태깅 테스트',
    'nfc.entrance': '공방거리 입구',
    'nfc.goHome': '홈으로 이동',

    // 하단 네비게이션
    'nav.home': '홈',
    'nav.stamps': '스탬프',
    'nav.map': '지도',
    'nav.about': '소개',
    'nav.mypage': 'MY',

    // 캐릭터 갤러리
    'gallery.title': '모든 캐릭터',
    'gallery.subtitle': '공방거리의 귀여운 캐릭터들을 만나보세요',
    'gallery.totalCharactersPrefix': '총',
    'gallery.totalCharactersSuffix': '종 캐릭터',
    'gallery.collected': '개 수집',

    // 스탬프 획득 완료 화면
    'stampSuccess.title': '스탬프 획득완료!',
    'stampSuccess.subtitle': '축하합니다! 새로운 스탬프를 획득했어요',
    'stampSuccess.loginPrompt': '로그인하여 스탬프 더 모으기',
    'stampSuccess.viewMyStamps': '내 스탬프 보기',
    'stampSuccess.continueTour': '투어 계속하기',
    'stampSuccess.progress': '진행률',

    // 데모 모드
    'demo.badge': '데모 모드',
    'demo.subtitle': '공방을 탭하여 NFC 태깅을 시연해보세요',
    'demo.reset': '리셋',
    'demo.resetConfirm': '스탬프를 전부 초기화할까요?',
    'demo.nfcTapping': 'NFC 태깅 중...',
    'demo.tapToCollect': '탭하여 태깅',
    'demo.alreadyCollected': '수집 완료',
    'demo.enterDemo': '데모 모드 시작',
    'demo.backToDemo': '데모로 돌아가기',
    'demo.progress': '데모 진행',
    'demo.active': '데모 모드',
    'demo.exit': '종료',

    // 로그인
    'login.title': '로그인',
    'login.subtitle': '스탬프를 저장하고 관리하세요',
    'login.guestMode': '게스트로 계속하기',
    'login.guestDesc': '기기에 스탬프가 저장됩니다',
    'login.demoLogin': '데모 로그인',
    'login.demoDesc': '테스트 계정으로 로그인',
    'login.userId': '사용자 ID',
    'login.currentUser': '현재 사용자',
    'login.stampCount': '수집한 스탬프',
    'login.logout': '로그아웃',
    'login.welcome': '환영합니다!',
    'login.loggedInAs': '로그인됨',

    // 이용 안내(온보딩)
    'guide.open': '이용 안내',
    'guide.title': '공방거리 스탬프 투어',
    'guide.subtitle': '행궁동 공방거리를 즐기는 방법',
    'guide.step1Title': '토템을 찾으세요',
    'guide.step1Desc': '공방거리 곳곳과 가게 앞에 놓인 토템(조형물)을 찾아보세요.',
    'guide.step2Title': 'NFC 태깅',
    'guide.step2Desc': '스마트폰을 토템에 갖다 대면 해당 공방 페이지가 자동으로 열려요.',
    'guide.step3Title': '스탬프 수집',
    'guide.step3Desc': '방문한 공방의 스탬프가 자동으로 모이고, 컬러로 채워집니다.',
    'guide.step4Title': '지도·마스코트',
    'guide.step4Desc': '지도에서 위치를 확인하고, 입구(0번)를 누르면 대표 마스코트를 만나요.',
    'guide.start': '시작하기',
  },
  en: {
    // 공통
    'common.loading': 'Loading...',
    'common.viewAll': 'View All',
    'common.viewMore': 'View More',
    'common.collected': 'Collected',
    'common.notCollected': 'Not Collected',
    'common.collectedComplete': 'Collected',
    'common.complete': 'Complete',
    'common.confirm': 'OK',
    'common.back': 'Back',
    'common.location': 'Location',
    'common.category': 'Category',
    'common.price': 'KRW',
    'common.duration': 'Duration',
    'common.entrance': 'Entrance',
    'common.salesOnly': 'Sales Only',
    'common.experiences': 'Experiences',
    'common.experienceAvailable': 'Experience Available',

    // 홈
    'home.title': 'Craft Street',
    'home.map': 'Map',
    'home.suwonHaenggung': 'Suwon Haenggung-dong',
    'home.stampTour': 'Craft Street Stamp Tour',
    'home.stampTourDesc': 'Find totems, tap NFC tags,\nand collect cute stamps!',
    'home.myStamps': 'My Stamps',
    'home.firstStamp': 'Collect your first stamp!',
    'home.stampsLeft': ' stamps left',
    'home.totemMap': 'Totem Map',
    'home.totemLocation': 'Find Totem Locations',
    'home.mascot': 'Mascots',
    'home.characterIntro': 'Character Guide',
    'home.craftStreetIntro': 'About Craft Street',
    'home.craftStreetDesc': 'Suwon Haenggung-dong, the heart of traditional and modern craftsmanship',
    'home.browseShops': 'Browse Workshops',
    'home.streetPhoto': 'Craft Street View',

    // 스탬프
    'stamps.title': 'My Stamps',
    'stamps.congratulations': 'Congratulations! You collected all stamps!',
    'stamps.stampsRemaining': ' stamps remaining',
    'stamps.grid': 'Stamps',
    'stamps.map': 'Map',
    'stamps.collectedSection': 'Collected',
    'stamps.notCollectedSection': 'Not Collected',
    'stamps.howToCollect': 'How to Collect Stamps',
    'stamps.step1': '1. Find totems along Craft Street',
    'stamps.step2': '2. Tap the NFC tag with your phone',
    'stamps.step3': '3. Your stamp is automatically collected!',
    'stamps.shopList': 'Workshop List',

    // 가게 상세
    'shop.stampCollected': 'Stamp Collected',
    'shop.thisMascot': 'This Shop\'s Mascot',
    'shop.experienceProgram': 'Experience Programs',
    'shop.noExperience': 'No experience programs available',
    'shop.noExperienceDesc': 'This workshop sells finished handcraft products. Visit to appreciate the artisan\'s work in person!',
    'shop.menuProducts': 'Menu / Products',
    'shop.featuredProducts': 'Featured Products',
    'shop.otherShops': 'Browse Other Workshops',
    'shop.noExperienceBottom': 'This workshop has no experience programs',
    'shop.browseOther': 'Browse Other Workshops',
    'shop.stampGet': 'Stamp Collected!',
    'shop.stampCollectedMsg': 'stamp has been collected',
    'shop.sellingPoint': 'In One Line',
    'shop.contact': 'Contact',
    'shop.reservation': 'Reservation',
    'shop.businessHours': 'Business Hours',
    'shop.services': 'Services',
    'shop.priceRange': 'Price Range',
    'shop.referenceImages': 'Photos',
    'shop.reserveNaver': 'Book on Naver',
    'shop.reservePhone': 'Call to Book / Ask',
    'shop.viewNaverMap': 'View on Naver Map',
    'shop.copyPhone': 'Copy Phone',
    'shop.copied': 'Copied',
    'shop.naverMapShort': 'Naver Map',

    // 지도
    'map.title': 'Totem Map',
    'map.suwonHaenggung': 'Suwon Haenggung-dong',
    'map.findTotem': 'Find the Totems',
    'map.findTotemDesc': 'Tap markers on the map to see workshop info. Tap the NFC tag on a totem to automatically collect a stamp!',
    'map.shopList': 'Workshop List',
    'map.legend.collected': 'Collected',
    'map.legend.notCollected': 'Not Collected',

    // 소개
    'about.title': 'About Craft Street',
    'about.suwonHaenggung': 'Suwon Haenggung-dong',
    'about.craftStreet': 'Craft Street',
    'about.mainTitle': 'Where tradition meets\nmodern craftsmanship',
    'about.desc1': 'The Haenggung-dong area, stretching from Janganmun Gate to Hwaseong Haenggung Palace, is home to a vibrant craft street with diverse workshops.',
    'about.desc2': 'Master artisans in hanbok, pottery, gemstone, cloisonné, and rattan crafts, as well as traditional desserts, create and share their skills here.',
    'about.mascotTitle': 'Craft Street Mascots',
    'about.mascotDesc': 'Meet our cute mascots!',
    'about.directions': 'How to Get Here',
    'about.address': 'Address',
    'about.addressValue': 'Haenggung-ro area, Paldal-gu, Suwon-si, Gyeonggi-do',
    'about.subway': 'Subway',
    'about.subwayValue': 'Bus from Suwon Station (approx. 15 min)',
    'about.bus': 'Bus',
    'about.busValue': 'Get off at Hwaseong Haenggung stop',
    'about.operatingInfo': 'Operating Hours',
    'about.hours': 'Hours',
    'about.hoursValue': '10:00 AM - 6:00 PM',
    'about.closedDays': 'Closed',
    'about.closedDaysValue': 'Mondays (some workshops excluded)',
    'about.hoursNote': 'Hours may vary by workshop. Please check before visiting.',
    'about.makeReservation': 'Make a Reservation',
    'about.touchSuwonEasy': 'Easy booking via Touch Suwon app',
    'about.mapCtaTitle': 'Find Craft Street',
    'about.mapCtaDesc': 'See Haenggung-dong Craft Street on Naver Map',
    'about.mapCtaButton': 'View on Naver Map',

    // 마스코트
    'mascot.title': 'Mascot Guide',
    'mascot.mascotName': 'Jeongnyangi',
    'mascot.mainMascot': 'Craft Street Mascot',
    'mascot.mainDesc': 'Jeongnyangi — a Joseon king reborn as a cat, longing for Haenggung-dong! Let me invite you to the craft alleys where history and art come alive.',
    'mascot.storyTitle': "Jeongnyangi's Story",
    'mascot.story': 'King Jeongjo of Joseon loved art and culture. Missing the warmth of Haenggung-dong Craft Street, he was reborn as a cute modern alley cat, "Jeongnyangi."\n\nHe may look like an ordinary alley cat, but note the red royal robe and dignified face! Begin a special local art journey where history and art breathe, together with the Cat King of Craft Street.',
    'mascot.whatIsTotem': 'What is a Totem?',
    'mascot.totemDesc': '3D sculptures installed throughout Craft Street, representing the mascots. Each totem has an embedded NFC tag that lets you get workshop info and collect stamps by tapping with your phone.',
    'mascot.byShop': 'Mascots by Workshop',
    'mascot.designCredit': 'Each workshop mascot is Jeongnyangi reimagined in the colors of that workshop.',
    'mascot.startTour': 'Start Stamp Tour',

    // 터치수원
    'touchSuwon.button': 'Book via Touch Suwon',
    'touchSuwon.goTo': 'Go to Touch Suwon',

    // NFC 시뮬레이터
    'nfc.title': 'NFC Simulator',
    'nfc.subtitle': 'Demo Tag Test',
    'nfc.entrance': 'Craft Street Entrance',
    'nfc.goHome': 'Go to Home',

    // 하단 네비게이션
    'nav.home': 'Home',
    'nav.stamps': 'Stamps',
    'nav.map': 'Map',
    'nav.about': 'About',
    'nav.mypage': 'MY',

    // 캐릭터 갤러리
    'gallery.title': 'All Characters',
    'gallery.subtitle': 'Meet the cute characters of Craft Street',
    'gallery.totalCharactersPrefix': '',
    'gallery.totalCharactersSuffix': 'Characters Total',
    'gallery.collected': ' collected',

    // 스탬프 획득 완료 화면
    'stampSuccess.title': 'Stamp Collected!',
    'stampSuccess.subtitle': 'Congratulations! You earned a new stamp',
    'stampSuccess.loginPrompt': 'Log in to collect more stamps',
    'stampSuccess.viewMyStamps': 'View My Stamps',
    'stampSuccess.continueTour': 'Continue Tour',
    'stampSuccess.progress': 'Progress',

    // 데모 모드
    'demo.badge': 'Demo Mode',
    'demo.subtitle': 'Tap a workshop to simulate NFC tagging',
    'demo.reset': 'Reset',
    'demo.resetConfirm': 'Reset all demo stamps?',
    'demo.nfcTapping': 'NFC Tapping...',
    'demo.tapToCollect': 'Tap to Tag',
    'demo.alreadyCollected': 'Collected',
    'demo.enterDemo': 'Start Demo Mode',
    'demo.backToDemo': 'Back to Demo',
    'demo.progress': 'Demo Progress',
    'demo.active': 'Demo Mode',
    'demo.exit': 'Exit',

    // 로그인
    'login.title': 'Login',
    'login.subtitle': 'Save and manage your stamps',
    'login.guestMode': 'Continue as Guest',
    'login.guestDesc': 'Stamps saved on this device',
    'login.demoLogin': 'Demo Login',
    'login.demoDesc': 'Log in with test account',
    'login.userId': 'User ID',
    'login.currentUser': 'Current User',
    'login.stampCount': 'Stamps Collected',
    'login.logout': 'Logout',
    'login.welcome': 'Welcome!',
    'login.loggedInAs': 'Logged in as',

    // Onboarding guide
    'guide.open': 'How to Use',
    'guide.title': 'Craft Street Stamp Tour',
    'guide.subtitle': 'How to enjoy Haenggung-dong Craft Street',
    'guide.step1Title': 'Find the Totems',
    'guide.step1Desc': 'Look for totems (sculptures) along the street and in front of shops.',
    'guide.step2Title': 'Tap NFC',
    'guide.step2Desc': 'Tap your phone on a totem and the shop page opens automatically.',
    'guide.step3Title': 'Collect Stamps',
    'guide.step3Desc': 'Stamps for visited shops are collected automatically and turn to color.',
    'guide.step4Title': 'Map & Mascot',
    'guide.step4Desc': 'Check locations on the map, and tap the entrance (0) to meet the mascot.',
    'guide.start': 'Get Started',
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('ko')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('gongbang-lang') as Language | null
    if (saved && (saved === 'ko' || saved === 'en')) {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('gongbang-lang', newLang)
  }

  const t = (key: string): string => {
    return translations[lang][key] || key
  }

  // SSR 중에는 기본값 사용
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ lang: 'ko', setLang, t: (key) => translations.ko[key] || key }}>
        {children}
      </I18nContext.Provider>
    )
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
