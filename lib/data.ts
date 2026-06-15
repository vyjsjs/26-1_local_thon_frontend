// 수원 공방거리 데이터 (실제 가게 데이터 — 행궁동 공방거리)
// Real shop data for Suwon Craft Street (Haenggung-dong)

export interface Shop {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  category: string
  categoryEn: string
  address: string
  addressEn: string
  mascotImage: string
  mascotDescription: string
  mascotDescriptionEn: string
  coordinates: {
    lat: number
    lng: number
  }
  hasExperience: boolean
  experiences: Experience[]
  menu: MenuItem[]
  nfcId: string
  totemLocation: 'entrance' | 'storefront' | 'alley'

  // --- 실제 데이터 확장 필드 (모두 optional) ---
  mainMessage?: string            // 스탬프 카드의 메인 메시지(인용구)
  mainMessageEn?: string
  tagline?: string               // 셀링 포인트 한 줄
  taglineEn?: string
  phone?: string                 // 가게 연락처
  reservationMethod?: string     // 예약 방식
  reservationMethodEn?: string
  businessHours?: string         // 영업 시간
  businessHoursEn?: string
  services?: string              // 제공 서비스
  servicesEn?: string
  priceRange?: string            // 가격대
  priceRangeEn?: string
  // 참고 이미지: public/shops/{shopId}/1.jpg, 2.jpg ... 규칙으로 파일을 넣고 경로를 채우면 갤러리에 노출됨.
  // 파일이 아직 없으면 빈 배열로 두면 갤러리 섹션이 숨겨진다.
  referenceImages?: string[]

  // 예약 연결 방식 (하단 버튼 동작)
  //  'naver'  → bookingUrl(네이버 지도 예약 링크)로 연결, 버튼 "네이버 예약하기"
  //  'map'    → naverMapUrl(네이버 지도 가게정보)로 연결, 버튼 "네이버 지도에서 보기"
  //  'choice' → 전화번호 복사 / 네이버 지도 연결 중 선택 (naverMapUrl + phone 필요)
  //  'phone'  → (레거시) phone 으로 tel: 연결
  reservationType?: 'naver' | 'phone' | 'map' | 'choice'
  bookingUrl?: string   // 네이버 예약 링크 (reservationType === 'naver')
  naverMapUrl?: string  // 네이버 지도 링크 (reservationType === 'map' | 'choice')
}

export interface Experience {
  id: string
  name: string
  nameEn: string
  price: number
  duration: string
  durationEn: string
  description: string
  descriptionEn: string
}

export interface MenuItem {
  id: string
  name: string
  nameEn: string
  price: number
  description: string
  descriptionEn: string
}

export interface Stamp {
  shopId: string
  collectedAt: Date | null
  isCollected: boolean
}

export const TOUCH_SUWON_LINK = 'https://www.touchsuwon.com'
export const TOUCH_SUWON_RESERVATION_BASE = 'https://www.touchsuwon.com/reservation'

// 실제 공방 데이터 (13개)
export const SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: '경애공방',
    nameEn: 'Gyeongae Workshop',
    description: '12년 경력의 원석·비즈 핸드메이드 악세서리 공방입니다.',
    descriptionEn: 'A handmade gemstone & bead accessory workshop with 12 years of experience.',
    category: '원석 공예',
    categoryEn: 'Gemstone Crafts',
    address: '경기도 수원시 팔달구 남창동 72-1, 1층',
    addressEn: '72-1 Namchang-dong, Paldal-gu, Suwon-si, Gyeonggi-do (1F)',
    mascotImage: '/mascots/placeholder-1.svg',
    mascotDescription: '반짝이는 원석을 들고 있는 경애공방 마스코트',
    mascotDescriptionEn: "Gyeongae Workshop's mascot holding a sparkling gemstone",
    coordinates: { lat: 37.2839, lng: 127.0150 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-1',
    totemLocation: 'storefront',
    mainMessage: '12년 내공의 핸드메이드 원석 악세사리를 직접 만들고 소장하세요!',
    mainMessageEn: 'Make and keep your own handmade gemstone accessories, crafted with 12 years of expertise!',
    tagline: '탄생석으로 나만의 원석 악세사리를 만들어보세요!',
    taglineEn: 'Create your own gemstone accessory with your birthstone!',
    phone: '031-258-3870 / 010-3134-3870',
    reservationMethod: '전화 예약 및 현장 예약',
    reservationMethodEn: 'Phone reservation or walk-in',
    businessHours: '오전 11시 ~ 오후 6시 (연중무휴)',
    businessHoursEn: '11:00 AM – 6:00 PM (open every day)',
    services: '원석과 비즈를 사용한 악세서리 판매 및 공예 체험 (목걸이·팔찌·귀걸이·브로치·키링·리본 공예 등)',
    servicesEn: 'Sale of gemstone & bead accessories and craft experiences (necklaces, bracelets, earrings, brooches, keyrings, ribbon crafts, etc.)',
    priceRange: '5,000 ~ 50,000원 (원석에 따라 가격 문의)',
    priceRangeEn: 'KRW 5,000 ~ 50,000 (price varies by gemstone)',
    referenceImages: ['/shops/shop-1/1.png', '/shops/shop-1/2.png', '/shops/shop-1/3.png', '/shops/shop-1/4.png', '/shops/shop-1/5.png', '/shops/shop-1/6.png'],
    reservationType: 'choice',
    naverMapUrl: 'https://map.naver.com/p/search/%EA%B2%BD%EC%95%A0%EA%B3%B5%EB%B0%A9/place/36813157?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151516&locale=ko&svcName=map_pcv5&searchText=%EA%B2%BD%EC%95%A0%EA%B3%B5%EB%B0%A9',
  },
  {
    id: 'shop-11',
    name: '행궁다과',
    nameEn: 'Haenggung Dagwa',
    description: '전통 다과와 한식 디저트를 즐기는 행궁동 떡카페입니다.',
    descriptionEn: 'A Haenggung-dong rice-cake café for traditional sweets and Korean desserts.',
    category: '전통 다과',
    categoryEn: 'Traditional Dessert Café',
    address: '경기도 수원시 팔달구 행궁로 25, 2층',
    addressEn: '25 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do (2F)',
    mascotImage: '/mascots/placeholder-3.svg',
    mascotDescription: '다과상을 차린 행궁다과 마스코트',
    mascotDescriptionEn: "Haenggung Dagwa's mascot setting a traditional tea table",
    coordinates: { lat: 37.2838, lng: 127.0145 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-11',
    totemLocation: 'storefront',
    mainMessage: '전통 다과와 한식 디저트를 즐기는 행궁동 떡카페.',
    mainMessageEn: 'A Haenggung-dong rice-cake café to enjoy traditional sweets and Korean desserts.',
    tagline: '전통 다과부터 빙수까지, 전통 음식 수업도 운영!',
    taglineEn: 'From traditional sweets to bingsu — traditional cooking classes too!',
    phone: '031-251-9030 (수업 문의 010-8225-9030)',
    reservationMethod: '카카오채널·전화 문의 (수업은 문자 문의 권장)',
    reservationMethodEn: 'Inquire via KakaoTalk channel or phone (text for classes)',
    businessHours: '월·수·목·금·일 10:00–21:00 / 토 10:00–22:00 / 화요일 휴무',
    businessHoursEn: 'Mon·Wed·Thu·Fri·Sun 10:00–21:00 / Sat 10:00–22:00 / Closed Tue',
    services: '전통차, 다과상, 빙수, 약과, 떡, 선물세트, 다과상 주문, 전통 음식 수업',
    servicesEn: 'Traditional tea, sweets platters, bingsu, yakgwa, rice cakes, gift sets, platter orders, traditional cooking classes',
    priceRange: '다과상 약 15,000원 / 빙수 약 15,000원 / 아이스아메리카노 약 3,500원',
    priceRangeEn: 'Sweets platter ~KRW 15,000 / bingsu ~KRW 15,000 / iced americano ~KRW 3,500',
    referenceImages: ['/shops/shop-11/1.png', '/shops/shop-11/2.png', '/shops/shop-11/3.png', '/shops/shop-11/4.png', '/shops/shop-11/5.png'],
    reservationType: 'map',
    naverMapUrl: 'https://map.naver.com/p/search/%ED%96%89%EA%B6%81%EB%8B%A4%EA%B3%BC/place/1943527844?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151526&locale=ko&svcName=map_pcv5&searchText=%ED%96%89%EA%B6%81%EB%8B%A4%EA%B3%BC',
  },
  {
    id: 'shop-8',
    name: '꽃을 담다, 종이노리',
    nameEn: 'Kkoteul Damda, Jongi Nori',
    description: '종이와 빛으로 만드는 따뜻한 수공예 체험 공간입니다.',
    descriptionEn: 'A warm handcraft space creating works with paper and light.',
    category: '종이공예',
    categoryEn: 'Paper Craft',
    address: '경기도 수원시 팔달구 행궁로 31-3',
    addressEn: '31-3 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-8.svg',
    mascotDescription: '종이꽃과 등불을 든 종이노리 마스코트',
    mascotDescriptionEn: "Jongi Nori's mascot holding a paper flower and a lantern",
    coordinates: { lat: 37.2829, lng: 127.0154 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-8',
    totemLocation: 'storefront',
    mainMessage: '종이와 빛으로 만드는 따뜻한 수공예 체험 공간.',
    mainMessageEn: 'A warm handcraft experience space made with paper and light.',
    tagline: '종이와 빛으로 만드는 따뜻한 수공예 체험!',
    taglineEn: 'Warm handcraft experiences made with paper and light!',
    phone: '0507-1391-2465',
    reservationMethod: '전화 예약 또는 인스타그램·네이버 문의',
    reservationMethodEn: 'Phone reservation or inquiry via Instagram/Naver',
    businessHours: '사전 예약 시 영업시간 외·휴무일 픽업 가능 (방문 전 문의)',
    businessHoursEn: 'Pickup available outside hours/holidays with advance booking (inquire before visiting)',
    services: '종이공예, 전등공예, 체험 프로그램',
    servicesEn: 'Paper crafts, lamp crafts, hands-on programs',
    priceRange: '주문형 상품 — 예산·디자인·꽃 종류별 상담 필요',
    priceRangeEn: 'Made-to-order — consultation needed by budget, design, and flower type',
    referenceImages: ['/shops/shop-8/1.png', '/shops/shop-8/2.png'],
    reservationType: 'naver',
    bookingUrl: 'https://map.naver.com/p/entry/place/1890723931?c=15.00,0,0,0,dh&placePath=/ticket?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151519&locale=ko&svcName=map_pcv5&entry=bmp',
  },
  {
    id: 'shop-5',
    name: '나녕공방',
    nameEn: 'Nanyeong Cloisonné Workshop',
    description: '한국명인과 함께하는 칠보공예 공방입니다.',
    descriptionEn: 'A cloisonné (chilbo) craft workshop led by a Korean master artisan.',
    category: '칠보공예',
    categoryEn: 'Cloisonné Craft',
    address: '경기도 수원시 팔달구 행궁로 29',
    addressEn: '29 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-5.svg',
    mascotDescription: '영롱한 칠보 메달을 든 나녕공방 마스코트',
    mascotDescriptionEn: "Nanyeong Workshop's mascot holding a glistening cloisonné medal",
    coordinates: { lat: 37.2832, lng: 127.0151 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-5',
    totemLocation: 'storefront',
    mainMessage: '한국명인 칠보공예가 김난영 대표와 함께 나만의 칠보 공예 작품을 만들어보세요.',
    mainMessageEn: 'Create your own cloisonné artwork with master artisan Kim Nan-young.',
    tagline: '도자칠보공예 자격과정과 칠보공예 전문과정 수강도 가능!',
    taglineEn: 'Certification and professional cloisonné courses also available!',
    phone: '031-252-6027',
    reservationMethod: '전화 예약 및 현장 예약',
    reservationMethodEn: 'Phone reservation or walk-in',
    businessHours: '10:00 ~ 17:00 (연중무휴)',
    businessHoursEn: '10:00 – 17:00 (open every day)',
    services: '칠보 메달 목걸이, 방명록 칠보공예, 그릇, 칠보 악세사리 등 / 자격·전문과정 운영',
    servicesEn: 'Cloisonné medal necklaces, guestbook cloisonné, bowls, accessories, etc. / certification & pro courses',
    priceRange: '재료에 따라 체험비 1만원부터',
    priceRangeEn: 'Experience fees from KRW 10,000 depending on materials',
    referenceImages: ['/shops/shop-5/1.png', '/shops/shop-5/2.png', '/shops/shop-5/3.png'],
    reservationType: 'map',
    naverMapUrl: 'https://map.naver.com/p/search/%EB%82%98%EB%85%95%EA%B3%B5%EB%B0%A9/place/38251686?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151518&locale=ko&svcName=map_pcv5&searchText=%EB%82%98%EB%85%95%EA%B3%B5%EB%B0%A9',
  },
  {
    id: 'shop-2',
    name: '영화당',
    nameEn: 'Younghwadang Self Snap Studio',
    description: '소중한 순간을 직접 담는 셀프 스냅 사진 스튜디오입니다.',
    descriptionEn: 'A self-snap photo studio where you capture your own precious moments.',
    category: '사진 스튜디오',
    categoryEn: 'Photo Studio',
    address: '경기도 수원시 팔달구 행궁로 29, 3층',
    addressEn: '29 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do (3F)',
    mascotImage: '/mascots/placeholder-2.svg',
    mascotDescription: '카메라를 든 영화당 마스코트',
    mascotDescriptionEn: "Younghwadang's mascot holding a camera",
    coordinates: { lat: 37.2834, lng: 127.0153 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-2',
    totemLocation: 'storefront',
    mainMessage: '셀프 스냅 스튜디오 영화당에서 소중한 사람들과의 순간을 기록해보세요.',
    mainMessageEn: 'Record moments with your loved ones at Younghwadang self-snap studio.',
    tagline: '네이버 영수증 리뷰 작성 시 종이 액자 1인 1매 증정!',
    taglineEn: 'Get one paper frame per person when you write a Naver receipt review!',
    phone: '010-2475-3175',
    reservationMethod: '100% 예약제 (네이버 예약)',
    reservationMethodEn: 'Reservation only (via Naver)',
    businessHours: '월·수 10:00–20:00 / 목·금 08:00–20:00 / 일 10:00–22:00 / 화 휴무',
    businessHoursEn: 'Mon·Wed 10:00–20:00 / Thu·Fri 08:00–20:00 / Sun 10:00–22:00 / Closed Tue',
    services: '셀프 스냅 사진 스튜디오, 한복 대여 서비스 포함',
    servicesEn: 'Self-snap photo studio with hanbok rental included',
    priceRange: '1인 30,000원~ (한복 포함 50,000원), 2~4인 단체 구성 별도',
    priceRangeEn: 'From KRW 30,000 per person (KRW 50,000 with hanbok); group rates for 2–4 people',
    referenceImages: ['/shops/shop-2/1.png', '/shops/shop-2/2.png', '/shops/shop-2/3.png', '/shops/shop-2/4.png'],
    reservationType: 'naver',
    bookingUrl: 'https://map.naver.com/p/search/%ED%96%89%EA%B6%81%EB%8F%99%20%EC%98%81%ED%99%94%EB%8B%B9/place/1098190608?c=14.89,0,0,0,dh&isCorrectAnswer=true&placePath=/ticket?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151510&locale=ko&svcName=map_pcv5&searchText=%ED%96%89%EA%B6%81%EB%8F%99%20%EC%98%81%ED%99%94%EB%8B%B9&entry=bmp',
  },
  {
    id: 'shop-9',
    name: '향기도예',
    nameEn: 'Hyanggi Pottery',
    description: '손작업의 온기가 은은하게 남는 도예 공방입니다.',
    descriptionEn: 'A pottery workshop where the warmth of handwork gently lingers.',
    category: '도예',
    categoryEn: 'Pottery',
    address: '경기도 수원시 팔달구 행궁로 29',
    addressEn: '29 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-1.svg',
    mascotDescription: '물레 앞에 앉은 향기도예 마스코트',
    mascotDescriptionEn: "Hyanggi Pottery's mascot sitting at a potter's wheel",
    coordinates: { lat: 37.2830, lng: 127.0156 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-9',
    totemLocation: 'storefront',
    mainMessage: '손작업의 온기가 은은하게 남는 도예 공방.',
    mainMessageEn: 'A pottery workshop where the warmth of handwork gently remains.',
    tagline: '전사컵부터 물레 체험까지, 손으로 빚는 나만의 도자기!',
    taglineEn: 'From transfer cups to wheel throwing — your own handmade pottery!',
    phone: '010-6215-1329',
    reservationMethod: '전화 또는 네이버·인스타그램 DM 문의',
    reservationMethodEn: 'Inquiry via phone or Naver/Instagram DM',
    businessHours: '방문 전 문의 필요',
    businessHoursEn: 'Please inquire before visiting',
    services: '도자기·그릇·머그컵·인테리어 소품 판매 및 도예 체험 (전사컵·물레 체험 등)',
    servicesEn: 'Sale of ceramics, bowls, mugs, interior items, and pottery experiences (transfer cups, wheel throwing, etc.)',
    priceRange: '전사컵 15,000원 / 작은 접시 20,000원 / 중간 접시 30,000원 / 물레체험 25,000원 (물레 예약 필수)',
    priceRangeEn: 'Transfer cup KRW 15,000 / small plate KRW 20,000 / medium plate KRW 30,000 / wheel experience KRW 25,000 (wheel by reservation)',
    referenceImages: ['/shops/shop-9/1.png', '/shops/shop-9/2.png', '/shops/shop-9/3.png', '/shops/shop-9/4.png'],
    reservationType: 'map',
    naverMapUrl: 'https://map.naver.com/p/entry/place/36786018?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151519&locale=ko&svcName=map_pcv5',
  },
  {
    id: 'shop-10',
    name: '스튜디오 로티니',
    nameEn: 'Studio Rotiny',
    description: '행궁동에서 만나는 감성 라탄공예 원데이클래스 스튜디오입니다.',
    descriptionEn: 'An aesthetic rattan-craft one-day class studio in Haenggung-dong.',
    category: '라탄공예',
    categoryEn: 'Rattan Craft',
    address: '경기도 수원시 팔달구 행궁로 34, 1층',
    addressEn: '34 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do (1F)',
    mascotImage: '/mascots/placeholder-2.svg',
    mascotDescription: '라탄 바구니를 든 스튜디오 로티니 마스코트',
    mascotDescriptionEn: "Studio Rotiny's mascot holding a rattan basket",
    coordinates: { lat: 37.2825, lng: 127.0155 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-10',
    totemLocation: 'storefront',
    mainMessage: '행궁동에서 만나는 감성 라탄공예 원데이클래스.',
    mainMessageEn: 'An aesthetic rattan-craft one-day class in Haenggung-dong.',
    tagline: '원데이부터 자격증반까지, 감성 라탄공예 클래스!',
    taglineEn: 'Aesthetic rattan-craft classes — from one-day to certification!',
    phone: '0507-1488-5043',
    reservationMethod: '카카오채널·인스타그램 DM·전화·네이버 예약',
    reservationMethodEn: 'Reserve via KakaoTalk channel, Instagram DM, phone, or Naver',
    businessHours: '평일 10:00–16:00 / 토 11:00–19:00 / 일 14:00–19:00',
    businessHoursEn: 'Weekdays 10:00–16:00 / Sat 11:00–19:00 / Sun 14:00–19:00',
    services: '라탄공예 소품샵, 원데이클래스, 정규반, 자격증반, 단체 클래스',
    servicesEn: 'Rattan-craft shop, one-day class, regular courses, certification course, group classes',
    priceRange: '원데이 35,000~90,000원 / 티코스터 만들기 10,000원 / 취미반 148,000~157,000원 / 정규반 초급 350,000·중급 500,000원 / 자격증반 1,650,000원',
    priceRangeEn: 'One-day KRW 35,000–90,000 / coaster KRW 10,000 / hobby KRW 148,000–157,000 / regular beginner 350,000·intermediate 500,000 / certification KRW 1,650,000',
    referenceImages: ['/shops/shop-10/1.png', '/shops/shop-10/2.png', '/shops/shop-10/3.png', '/shops/shop-10/4.png'],
    reservationType: 'naver',
    bookingUrl: 'https://map.naver.com/p/entry/place/1175003881?c=14.89,0,0,0,dh&placePath=/ticket?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151511&locale=ko&svcName=map_pcv5&entry=bmp',
  },
  {
    id: 'shop-12',
    name: '이춘섭 명인 전통복식연구소',
    nameEn: 'Master Lee Chun-seop Hanbok Institute',
    description: '화성행궁 옆에서 만나는 전통 한복과 복식 문화 연구소입니다.',
    descriptionEn: 'A traditional hanbok and costume institute next to Hwaseong Haenggung.',
    category: '한복·전통복식',
    categoryEn: 'Hanbok',
    address: '경기도 수원시 팔달구 정조로801번길 24',
    addressEn: '24 Jeongjo-ro 801beon-gil, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-4.svg',
    mascotDescription: '명인 한복을 차려입은 마스코트',
    mascotDescriptionEn: "A mascot dressed in master-crafted hanbok",
    coordinates: { lat: 37.2832, lng: 127.0163 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-12',
    totemLocation: 'storefront',
    mainMessage: '화성행궁 옆에서 만나는 전통 한복과 복식 문화.',
    mainMessageEn: 'Traditional hanbok and costume culture, right beside Hwaseong Haenggung.',
    tagline: '명인이 전하는 전통 한복과 복식 문화 체험!',
    taglineEn: "Experience traditional hanbok and costume culture from a master artisan!",
    phone: '0507-1351-1796',
    reservationMethod: '전화 문의 및 페이스북·인스타그램',
    reservationMethodEn: 'Inquiry via phone, Facebook, or Instagram',
    businessHours: '10:00 ~ 18:00',
    businessHoursEn: '10:00 – 18:00',
    services: '한복 대여, 전통복식 체험, 전통 한복 소개',
    servicesEn: 'Hanbok rental, traditional costume experience, traditional hanbok introduction',
    priceRange: '최소 1시간 10,000원부터 (작품·구성에 따라 상이)',
    priceRangeEn: 'From KRW 10,000 per hour (varies by piece and styling)',
    referenceImages: ['/shops/shop-12/1.png', '/shops/shop-12/2.png', '/shops/shop-12/3.png'],
    reservationType: 'map',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1444932415?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151528&locale=ko&svcName=map_pcv5',
  },
  {
    id: 'shop-3',
    name: '장금이 공방',
    nameEn: 'Janggeumi Hanbok Workshop',
    description: '우리 멋과 예를 잇는 한복 체험·대여 공방입니다.',
    descriptionEn: 'A hanbok experience & rental workshop carrying on Korean beauty and etiquette.',
    category: '한복 체험',
    categoryEn: 'Hanbok',
    address: '경기도 수원시 팔달구 행궁로26번길 36',
    addressEn: '36 Haenggung-ro 26beon-gil, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-3.svg',
    mascotDescription: '고운 한복을 입은 장금이 공방 마스코트',
    mascotDescriptionEn: "Janggeumi Workshop's mascot wearing a graceful hanbok",
    coordinates: { lat: 37.2828, lng: 127.0130 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-3',
    totemLocation: 'storefront',
    mainMessage: '뿌리 깊은 우리 멋과 예를 잇는 곳, 한복을 입고 우리 것의 아름다움을 느껴보세요.',
    mainMessageEn: 'Wear a hanbok and feel the beauty of our deep-rooted tradition.',
    tagline: '반려견 한복 대여 가능 — 소형견부터 대형견까지!',
    taglineEn: 'Pet hanbok rental available — from small to large dogs!',
    phone: '070-7783-3175',
    reservationMethod: '10인 이상 단체 방문 시 전화 예약',
    reservationMethodEn: 'Phone reservation required for groups of 10+',
    businessHours: '10:00 ~ 18:00 (매주 화요일 휴무)',
    businessHoursEn: '10:00 – 18:00 (Closed Tuesdays)',
    services: '한복 체험 및 대여 (반려견 한복 포함)',
    servicesEn: 'Hanbok experience and rental (including pet hanbok)',
    priceRange: '1시간 30분 30,000원 / 2시간 35,000원 / 3시간 45,000원 / 종일 60,000원 / 1박2일 70,000원',
    priceRangeEn: '1.5h KRW 30,000 / 2h KRW 35,000 / 3h KRW 45,000 / all-day KRW 60,000 / 2 days KRW 70,000',
    referenceImages: ['/shops/shop-3/1.png', '/shops/shop-3/2.png', '/shops/shop-3/3.png', '/shops/shop-3/4.png'],
    reservationType: 'naver',
    bookingUrl: 'https://map.naver.com/p/search/%EC%9E%A5%EA%B8%88%EC%9D%B4%EA%B3%B5%EB%B0%A9/place/37829618?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/ticket?fromPanelNum=1&additionalHeight=76&timestamp=202606151514&locale=ko&svcName=map_pcv5&searchText=%EC%9E%A5%EA%B8%88%EC%9D%B4%EA%B3%B5%EB%B0%A9',
  },
  {
    id: 'shop-6',
    name: '카페레퓨즈',
    nameEn: 'Café Refuge',
    description: '직접 로스팅한 원두로 내리는 핸드드립 커피와 수제 디저트 카페입니다.',
    descriptionEn: 'A café serving hand-drip coffee from house-roasted beans and handmade desserts.',
    category: '카페',
    categoryEn: 'Café',
    address: '경기도 수원시 팔달구 행궁로 41-1',
    addressEn: '41-1 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-6.svg',
    mascotDescription: '따뜻한 커피잔을 든 카페레퓨즈 마스코트',
    mascotDescriptionEn: "Café Refuge's mascot holding a warm cup of coffee",
    coordinates: { lat: 37.2818, lng: 127.0159 },
    hasExperience: false,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-6',
    totemLocation: 'storefront',
    mainMessage: '마음의 피난처, 생각의 안식처 — 카페 레퓨즈',
    mainMessageEn: 'A refuge for the heart, a rest for the mind — Café Refuge.',
    tagline: '살라미 초콜릿 등 다양한 재료를 수제로 만듭니다!',
    taglineEn: 'Various ingredients, including salami chocolate, made by hand!',
    phone: '010-5865-3871',
    reservationMethod: '별도 예약 불필요',
    reservationMethodEn: 'No reservation needed',
    businessHours: '12:00 ~ 24:00 (매주 목요일 휴무)',
    businessHoursEn: '12:00 – 24:00 (Closed Thursdays)',
    services: '직접 로스팅한 원두로 내리는 핸드드립 커피와 음료, 수제 디저트',
    servicesEn: 'Hand-drip coffee from house-roasted beans, other drinks, and handmade desserts',
    priceRange: '크림레퓨즈 7,500원 / 레퓨즈페너 7,000원 / 콘파냐 5,500원',
    priceRangeEn: 'Cream Refuge KRW 7,500 / Refugespänner KRW 7,000 / Conpanna KRW 5,500',
    referenceImages: ['/shops/shop-6/1.png', '/shops/shop-6/2.png', '/shops/shop-6/3.png', '/shops/shop-6/4.png'],
    reservationType: 'map',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1107351645?c=14.89,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151512&locale=ko&svcName=map_pcv5',
  },
  {
    id: 'shop-4',
    name: '갤러리풍경',
    nameEn: 'Gallery Punggyeong',
    description: '예술 작품 감상과 아동 도예 체험을 함께 즐기는 공간입니다.',
    descriptionEn: 'A space to enjoy art appreciation alongside children’s pottery experiences.',
    category: '도예',
    categoryEn: 'Pottery',
    address: '경기도 수원시 팔달구 남창동 120-1',
    addressEn: '120-1 Namchang-dong, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-4.svg',
    mascotDescription: '붓과 흙을 든 갤러리풍경 마스코트',
    mascotDescriptionEn: "Gallery Punggyeong's mascot with a brush and clay",
    coordinates: { lat: 37.2814, lng: 127.0156 },
    hasExperience: true,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-4',
    totemLocation: 'storefront',
    mainMessage: '예술 작품 감상과 나만의 특별한 공예 체험을 동시에 즐기는 곳, 갤러리 풍경입니다.',
    mainMessageEn: 'Gallery Punggyeong — where you enjoy art and your own special craft experience together.',
    tagline: '《꿈을 빚는 어린이 도예》 저자가 직접 운영하는 아동 전문 도예 체험',
    taglineEn: "Children's pottery run by the author of 'Children's Pottery That Shapes Dreams'.",
    phone: '010-6420-6696 / 010-3896-1696',
    reservationMethod: '전화 예약 및 현장 예약 (사전 전화 문의 권장)',
    reservationMethodEn: 'Phone reservation or walk-in (advance call recommended)',
    businessHours: '오후 1시 오픈 (연중무휴, 일정 변동 가능)',
    businessHoursEn: 'Opens 1:00 PM (open every day; schedule may vary)',
    services: '도예, 손가방·스텐실 꾸미기, 컬러 비즈, 우드 캐릭터 공룡 액자 등 아동 공예 체험',
    servicesEn: "Children's crafts: pottery, bag & stencil decorating, color beads, wooden dinosaur character frames, etc.",
    priceRange: '체험 종류에 따라 상이 (예약 시 문의)',
    priceRangeEn: 'Varies by experience (inquire when booking)',
    referenceImages: ['/shops/shop-4/1.png', '/shops/shop-4/2.png', '/shops/shop-4/3.png', '/shops/shop-4/4.png'],
    reservationType: 'choice',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1072012130?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151517&locale=ko&svcName=map_pcv5',
  },
  {
    id: 'shop-13',
    name: '메리골드',
    nameEn: 'Marigold',
    description: '행궁동 공방거리의 감성 소품·선물 편집 공간입니다.',
    descriptionEn: 'A curated gift & lifestyle shop on Haenggung-dong Craft Street.',
    category: '소품샵',
    categoryEn: 'Gift Shop',
    address: '경기도 수원시 팔달구 행궁로 44, 1층',
    addressEn: '44 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do (1F)',
    mascotImage: '/mascots/placeholder-5.svg',
    mascotDescription: '선물 꾸러미를 든 메리골드 마스코트',
    mascotDescriptionEn: "Marigold's mascot holding a bundle of gifts",
    coordinates: { lat: 37.2813, lng: 127.0153 },
    hasExperience: false,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-13',
    totemLocation: 'alley',
    mainMessage: '행궁동 공방거리의 감성 소품·선물 편집 공간.',
    mainMessageEn: 'A curated gift & lifestyle space on Haenggung-dong Craft Street.',
    tagline: '연보라색 매장에서 만나는 감성 소품과 선물!',
    taglineEn: 'Aesthetic goods and gifts in a lavender-toned shop!',
    reservationMethod: '인스타그램 DM 문의',
    reservationMethodEn: 'Inquiry via Instagram DM',
    businessHours: '월–금 13:00–19:00 / 토–일 13:00–20:00',
    businessHoursEn: 'Mon–Fri 13:00–19:00 / Sat–Sun 13:00–20:00',
    services: '감성 소품 판매, 선물용 제품, 택배 가능',
    servicesEn: 'Aesthetic goods, gift items, delivery available',
    priceRange: '제품별 상이 (인스타그램에서 가격·재고 문의)',
    priceRangeEn: 'Varies by item (inquire price/stock via Instagram)',
    referenceImages: ['/shops/shop-13/1.png', '/shops/shop-13/2.png', '/shops/shop-13/3.png', '/shops/shop-13/4.png', '/shops/shop-13/5.png'],
    reservationType: 'map',
    naverMapUrl: 'https://map.naver.com/p/entry/place/1334533119?c=15.00,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151514&locale=ko&svcName=map_pcv5',
  },
  {
    id: 'shop-7',
    name: '막걸리계보',
    nameEn: 'Makgeolli Gyebo',
    description: '숨겨진 골목의 가성비 좋은 막걸리·한식 안주 맛집입니다.',
    descriptionEn: 'A hidden-alley makgeolli pub with great-value Korean dishes.',
    category: '전통주점',
    categoryEn: 'Makgeolli Pub',
    address: '경기도 수원시 팔달구 남창동 133-2, 1층',
    addressEn: '133-2 Namchang-dong, Paldal-gu, Suwon-si, Gyeonggi-do (1F)',
    mascotImage: '/mascots/placeholder-7.svg',
    mascotDescription: '막걸리 잔을 든 막걸리계보 마스코트',
    mascotDescriptionEn: "Makgeolli Gyebo's mascot holding a bowl of makgeolli",
    coordinates: { lat: 37.2805, lng: 127.0166 },
    hasExperience: false,
    experiences: [],
    menu: [],
    nfcId: 'nfc-shop-7',
    totemLocation: 'alley',
    mainMessage: '숨겨진 골목에서 만나는 가성비 좋은 막걸리 맛집, 기본 안주부터 메인까지 완벽한 조합.',
    mainMessageEn: 'A value-packed makgeolli spot in a hidden alley — a perfect pairing from sides to mains.',
    tagline: '숨겨진 골목의 가성비 막걸리 맛집!',
    taglineEn: 'A great-value makgeolli spot in a hidden alley!',
    phone: '0507-1445-0052',
    reservationMethod: '예약 가능 (네이버 예약)',
    reservationMethodEn: 'Reservation available (via Naver)',
    businessHours: '16:00 ~ 24:00 (라스트오더 23:30, 매주 월요일 휴무)',
    businessHoursEn: '16:00 – 24:00 (last order 23:30, Closed Mondays)',
    services: '막걸리, 한식 안주, 김치찜보쌈, 김치찌개 등',
    servicesEn: 'Makgeolli, Korean side dishes, kimchi-jjim bossam, kimchi stew, etc.',
    priceRange: '김치찜보쌈 13,900원 / 청송사과막걸리 6,000원 / 소고기육전 16,900원 (2인 기준 약 34,000원)',
    priceRangeEn: 'Kimchi-jjim bossam KRW 13,900 / Cheongsong apple makgeolli KRW 6,000 / beef jeon KRW 16,900 (~KRW 34,000 for 2)',
    referenceImages: ['/shops/shop-7/1.png', '/shops/shop-7/2.png', '/shops/shop-7/3.png', '/shops/shop-7/4.png'],
    reservationType: 'naver',
    bookingUrl: 'https://map.naver.com/p/search/%EB%A7%89%EA%B1%B8%EB%A6%AC%EA%B3%84%EB%B3%B4/place/1605255181?c=15.00,0,0,0,dh&isCorrectAnswer=true&placePath=/booking?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202606151513&locale=ko&svcName=map_pcv5&searchText=%EB%A7%89%EA%B1%B8%EB%A6%AC%EA%B3%84%EB%B3%B4&entry=bmp',
  },
]

// 거리 초입 토템
export const ENTRANCE_TOTEM = {
  id: 'entrance-totem',
  name: '공방거리 입구',
  nameEn: 'Craft Street Entrance',
  nfcId: 'nfc-entrance',
  coordinates: { lat: 37.2842, lng: 127.0148 },
  totemLocation: 'entrance' as const,
}

// 사용자 ID 생성
export function getUserId(): string {
  if (typeof window === 'undefined') return 'ssr-user'

  let userId = localStorage.getItem('gongbang-user-id')
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('gongbang-user-id', userId)
  }
  return userId
}

// 데모 모드 전용 사용자 ID (Supabase에 demo- prefix로 저장)
export function getDemoUserId(): string {
  if (typeof window === 'undefined') return 'demo-ssr'

  let userId = localStorage.getItem('gongbang-demo-user-id')
  if (!userId) {
    userId = `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('gongbang-demo-user-id', userId)
  }
  return userId
}

// 데모 스탬프 초기화는 Supabase 에서 실제 삭제로 처리한다.
// → useStamps(demoUserId).reset() (DELETE /api/stamps/{demoUserId})
// 같은 demo- user_id 를 유지하므로 별도 ID 재발급은 하지 않는다.

export function getShopByNfcId(nfcId: string): Shop | null {
  return SHOPS.find(shop => shop.nfcId === nfcId) || null
}

export function getTouchSuwonReservationLink(shopId: string): string {
  return `${TOUCH_SUWON_RESERVATION_BASE}?shop=${shopId}`
}
