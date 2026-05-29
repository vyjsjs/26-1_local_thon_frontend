// 수원 공방거리 데모 데이터
// Demo data for Suwon Craft Street

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

// 데모용 공방 데이터 (14개)
export const SHOPS: Shop[] = [
  {
    id: 'shop-1',
    name: '수원떡방',
    nameEn: 'Suwon Rice Cake House',
    description: '30년 전통의 떡 공방입니다. 정성 가득한 수제 떡을 만들어보세요.',
    descriptionEn: 'A rice cake workshop with 30 years of tradition. Make your own handmade rice cakes with care.',
    category: '전통 떡',
    categoryEn: 'Traditional Rice Cake',
    address: '경기도 수원시 팔달구 행궁로 12',
    addressEn: '12 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-1.svg',
    mascotDescription: '떡을 들고 있는 귀여운 토끼 마스코트',
    mascotDescriptionEn: 'A cute rabbit mascot holding rice cakes',
    coordinates: { lat: 37.2866, lng: 127.0175 },
    hasExperience: true,
    experiences: [
      { id: 'exp-1-1', name: '전통 송편 만들기', nameEn: 'Traditional Songpyeon Making', price: 15000, duration: '60분', durationEn: '60 min', description: '계절 재료로 정성스러운 송편을 만듭니다', descriptionEn: 'Make songpyeon with seasonal ingredients' },
      { id: 'exp-1-2', name: '절편 꾸미기', nameEn: 'Jeolpyeon Decorating', price: 12000, duration: '45분', durationEn: '45 min', description: '아이와 함께하는 절편 꾸미기 체험', descriptionEn: 'Decorate jeolpyeon with your children' },
    ],
    menu: [
      { id: 'menu-1-1', name: '오색송편 세트', nameEn: 'Five-Color Songpyeon Set', price: 18000, description: '5가지 맛 송편 선물세트', descriptionEn: 'Gift set with 5 flavors of songpyeon' },
      { id: 'menu-1-2', name: '인절미', nameEn: 'Injeolmi', price: 8000, description: '고소한 콩고물 인절미', descriptionEn: 'Savory soybean powder rice cake' },
    ],
    nfcId: 'nfc-shop-1',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-2',
    name: '달빛한복',
    nameEn: 'Moonlight Hanbok',
    description: '전통과 현대가 어우러진 한복을 제작하고 체험할 수 있는 공방입니다.',
    descriptionEn: 'A workshop where you can create and experience hanbok that blends tradition with modernity.',
    category: '한복',
    categoryEn: 'Hanbok',
    address: '경기도 수원시 팔달구 행궁로 15',
    addressEn: '15 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-2.svg',
    mascotDescription: '한복을 입고 있는 고양이 마스코트',
    mascotDescriptionEn: 'A cat mascot wearing hanbok',
    coordinates: { lat: 37.2870, lng: 127.0180 },
    hasExperience: true,
    experiences: [
      { id: 'exp-2-1', name: '한복 대여 & 포토', nameEn: 'Hanbok Rental & Photo', price: 25000, duration: '120분', durationEn: '120 min', description: '전통 한복을 입고 행궁 투어', descriptionEn: 'Tour Haenggung Palace in traditional hanbok' },
      { id: 'exp-2-2', name: '노리개 만들기', nameEn: 'Norigae Making', price: 18000, duration: '60분', durationEn: '60 min', description: '나만의 노리개 제작 체험', descriptionEn: 'Create your own traditional ornament' },
    ],
    menu: [
      { id: 'menu-2-1', name: '생활한복', nameEn: 'Casual Hanbok', price: 150000, description: '일상에서 편하게 입는 생활한복', descriptionEn: 'Comfortable everyday hanbok' },
    ],
    nfcId: 'nfc-shop-2',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-3',
    name: '도담도담 도자기',
    nameEn: 'Dodam Pottery',
    description: '흙의 감촉으로 마음을 다스리는 도자기 공방입니다.',
    descriptionEn: 'A pottery workshop where you can calm your mind through the touch of clay.',
    category: '도자기',
    categoryEn: 'Pottery',
    address: '경기도 수원시 팔달구 행궁로 18',
    addressEn: '18 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-3.svg',
    mascotDescription: '도자기를 만드는 다람쥐 마스코트',
    mascotDescriptionEn: 'A squirrel mascot making pottery',
    coordinates: { lat: 37.2872, lng: 127.0185 },
    hasExperience: true,
    experiences: [
      { id: 'exp-3-1', name: '물레 체험', nameEn: 'Wheel Throwing', price: 30000, duration: '90분', durationEn: '90 min', description: '물레로 나만의 그릇 만들기', descriptionEn: 'Create your own bowl on the pottery wheel' },
      { id: 'exp-3-2', name: '핸드페인팅', nameEn: 'Hand Painting', price: 20000, duration: '60분', durationEn: '60 min', description: '기성 도자기에 그림 그리기', descriptionEn: 'Paint on ready-made ceramics' },
    ],
    menu: [
      { id: 'menu-3-1', name: '수제 찻잔 세트', nameEn: 'Handmade Tea Cup Set', price: 45000, description: '작가의 찻잔과 받침 세트', descriptionEn: 'Artist tea cup and saucer set' },
    ],
    nfcId: 'nfc-shop-3',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-4',
    name: '행궁 목공소',
    nameEn: 'Haenggung Woodcraft',
    description: '나무 향기 가득한 목공예 공방입니다.',
    descriptionEn: 'A woodcraft workshop filled with the scent of wood.',
    category: '목공예',
    categoryEn: 'Woodcraft',
    address: '경기도 수원시 팔달구 행궁로 22',
    addressEn: '22 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-4.svg',
    mascotDescription: '톱을 들고 있는 곰 마스코트',
    mascotDescriptionEn: 'A bear mascot holding a saw',
    coordinates: { lat: 37.2868, lng: 127.0190 },
    hasExperience: true,
    experiences: [
      { id: 'exp-4-1', name: '우드버닝 체험', nameEn: 'Wood Burning', price: 22000, duration: '60분', durationEn: '60 min', description: '나무에 그림 그리기', descriptionEn: 'Draw designs on wood with heat' },
      { id: 'exp-4-2', name: '미니 가구 만들기', nameEn: 'Mini Furniture Making', price: 35000, duration: '120분', durationEn: '120 min', description: '작은 수납함 제작', descriptionEn: 'Make a small storage box' },
    ],
    menu: [
      { id: 'menu-4-1', name: '원목 도마', nameEn: 'Solid Wood Cutting Board', price: 38000, description: '천연 옻칠 마감 도마', descriptionEn: 'Cutting board with natural lacquer finish' },
    ],
    nfcId: 'nfc-shop-4',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-5',
    name: '바람개비 염색방',
    nameEn: 'Pinwheel Dye Studio',
    description: '천연 염색의 아름다움을 배울 수 있는 공방입니다.',
    descriptionEn: 'A workshop where you can learn the beauty of natural dyeing.',
    category: '천연염색',
    categoryEn: 'Natural Dyeing',
    address: '경기도 수원시 팔달구 행궁로 25',
    addressEn: '25 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-5.svg',
    mascotDescription: '염색 천을 들고 있는 여우 마스코트',
    mascotDescriptionEn: 'A fox mascot holding dyed fabric',
    coordinates: { lat: 37.2875, lng: 127.0178 },
    hasExperience: true,
    experiences: [
      { id: 'exp-5-1', name: '쪽 염색 체험', nameEn: 'Indigo Dyeing', price: 28000, duration: '90분', durationEn: '90 min', description: '전통 쪽빛 손수건 염색', descriptionEn: 'Dye a handkerchief with traditional indigo' },
    ],
    menu: [
      { id: 'menu-5-1', name: '천연염색 스카프', nameEn: 'Natural Dyed Scarf', price: 55000, description: '100% 실크 천연염색 스카프', descriptionEn: '100% silk naturally dyed scarf' },
    ],
    nfcId: 'nfc-shop-5',
    totemLocation: 'alley',
  },
  {
    id: 'shop-6',
    name: '행궁 찻집',
    nameEn: 'Haenggung Tea House',
    description: '전통차와 다과를 즐길 수 있는 찻집입니다. 체험 프로그램은 없지만 편안한 휴식 공간을 제공합니다.',
    descriptionEn: 'A tea house where you can enjoy traditional tea and sweets. No experience programs, but offers a relaxing space.',
    category: '전통 찻집',
    categoryEn: 'Traditional Tea House',
    address: '경기도 수원시 팔달구 행궁로 28',
    addressEn: '28 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-6.svg',
    mascotDescription: '찻잔을 들고 있는 새 마스코트',
    mascotDescriptionEn: 'A bird mascot holding a tea cup',
    coordinates: { lat: 37.2878, lng: 127.0172 },
    hasExperience: false,
    experiences: [],
    menu: [
      { id: 'menu-6-1', name: '대추차', nameEn: 'Jujube Tea', price: 7000, description: '달콤한 대추차', descriptionEn: 'Sweet jujube tea' },
      { id: 'menu-6-2', name: '한과 세트', nameEn: 'Korean Cookie Set', price: 12000, description: '전통 한과 5종', descriptionEn: '5 types of traditional Korean cookies' },
      { id: 'menu-6-3', name: '녹차', nameEn: 'Green Tea', price: 6000, description: '보성 녹차', descriptionEn: 'Boseong green tea' },
    ],
    nfcId: 'nfc-shop-6',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-7',
    name: '수원 기념품점',
    nameEn: 'Suwon Souvenir Shop',
    description: '수원 화성과 공방거리의 다양한 기념품을 판매합니다. 체험은 없지만 특별한 선물을 찾을 수 있습니다.',
    descriptionEn: 'Sells various souvenirs from Hwaseong Fortress and Craft Street. No experience programs, but you can find special gifts.',
    category: '기념품',
    categoryEn: 'Souvenirs',
    address: '경기도 수원시 팔달구 행궁로 30',
    addressEn: '30 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-7.svg',
    mascotDescription: '선물 상자를 들고 있는 강아지 마스코트',
    mascotDescriptionEn: 'A puppy mascot holding a gift box',
    coordinates: { lat: 37.2863, lng: 127.0183 },
    hasExperience: false,
    experiences: [],
    menu: [
      { id: 'menu-7-1', name: '화성 미니어처', nameEn: 'Hwaseong Miniature', price: 25000, description: '수원 화성 미니어처 모형', descriptionEn: 'Hwaseong Fortress miniature model' },
      { id: 'menu-7-2', name: '마스코트 인형', nameEn: 'Mascot Plush', price: 15000, description: '공방거리 마스코트 인형', descriptionEn: 'Craft Street mascot plush toy' },
      { id: 'menu-7-3', name: '엽서 세트', nameEn: 'Postcard Set', price: 5000, description: '수원 풍경 엽서 10장', descriptionEn: '10 postcards of Suwon scenery' },
    ],
    nfcId: 'nfc-shop-7',
    totemLocation: 'alley',
  },
  {
    id: 'shop-8',
    name: '소소한 공방',
    nameEn: 'Little Things Workshop',
    description: '소소하지만 특별한 수공예품을 만드는 공방입니다.',
    descriptionEn: 'A workshop creating small but special handcrafted items.',
    category: '수공예',
    categoryEn: 'Handcraft',
    address: '경기도 수원시 팔달구 행궁로 32',
    addressEn: '32 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-8.svg',
    mascotDescription: '바느질하는 햄스터 마스코트',
    mascotDescriptionEn: 'A hamster mascot sewing',
    coordinates: { lat: 37.2880, lng: 127.0188 },
    hasExperience: true,
    experiences: [
      { id: 'exp-8-1', name: '가죽 키링 만들기', nameEn: 'Leather Keyring Making', price: 15000, duration: '45분', durationEn: '45 min', description: '나만의 가죽 키링 제작', descriptionEn: 'Create your own leather keyring' },
      { id: 'exp-8-2', name: '미니어처 만들기', nameEn: 'Miniature Making', price: 25000, duration: '90분', durationEn: '90 min', description: '작은 소품 미니어처 제작', descriptionEn: 'Make small miniature items' },
    ],
    menu: [
      { id: 'menu-8-1', name: '수제 가죽 지갑', nameEn: 'Handmade Leather Wallet', price: 65000, description: '핸드메이드 가죽 지갑', descriptionEn: 'Handcrafted leather wallet' },
    ],
    nfcId: 'nfc-shop-8',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-9',
    name: '화성 금속공예',
    nameEn: 'Hwaseong Metalcraft',
    description: '전통 금속공예 기법으로 아름다운 장신구를 만드는 공방입니다.',
    descriptionEn: 'A workshop creating beautiful jewelry using traditional metalcraft techniques.',
    category: '금속공예',
    categoryEn: 'Metalcraft',
    address: '경기도 수원시 팔달구 행궁로 35',
    addressEn: '35 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-1.svg',
    mascotDescription: '망치를 들고 있는 부엉이 마스코트',
    mascotDescriptionEn: 'An owl mascot holding a hammer',
    coordinates: { lat: 37.2882, lng: 127.0176 },
    hasExperience: true,
    experiences: [
      { id: 'exp-9-1', name: '은반지 만들기', nameEn: 'Silver Ring Making', price: 45000, duration: '120분', durationEn: '120 min', description: '나만의 은반지 제작 체험', descriptionEn: 'Create your own silver ring' },
      { id: 'exp-9-2', name: '금속 열쇠고리', nameEn: 'Metal Keychain', price: 20000, duration: '60분', durationEn: '60 min', description: '금속 각인 열쇠고리 만들기', descriptionEn: 'Make an engraved metal keychain' },
    ],
    menu: [
      { id: 'menu-9-1', name: '전통 비녀', nameEn: 'Traditional Hairpin', price: 85000, description: '수공예 전통 비녀', descriptionEn: 'Handcrafted traditional hairpin' },
    ],
    nfcId: 'nfc-shop-9',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-10',
    name: '향기로운 비누방',
    nameEn: 'Fragrant Soap House',
    description: '천연 재료로 피부에 좋은 수제 비누를 만드는 공방입니다.',
    descriptionEn: 'A workshop making handmade soaps good for skin using natural ingredients.',
    category: '수제비누',
    categoryEn: 'Handmade Soap',
    address: '경기도 수원시 팔달구 행궁로 38',
    addressEn: '38 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-2.svg',
    mascotDescription: '비누 거품 속 오리 마스코트',
    mascotDescriptionEn: 'A duck mascot in soap bubbles',
    coordinates: { lat: 37.2858, lng: 127.0179 },
    hasExperience: true,
    experiences: [
      { id: 'exp-10-1', name: '천연비누 만들기', nameEn: 'Natural Soap Making', price: 18000, duration: '60분', durationEn: '60 min', description: 'MP비누 베이스 천연비누', descriptionEn: 'Make natural soap with MP base' },
    ],
    menu: [
      { id: 'menu-10-1', name: '라벤더 비누 세트', nameEn: 'Lavender Soap Set', price: 22000, description: '라벤더 향 천연비누 3개입', descriptionEn: 'Set of 3 lavender natural soaps' },
    ],
    nfcId: 'nfc-shop-10',
    totemLocation: 'alley',
  },
  {
    id: 'shop-11',
    name: '달항아리 공방',
    nameEn: 'Moon Jar Studio',
    description: '조선시대 백자의 아름다움을 재현하는 도예 공방입니다.',
    descriptionEn: 'A pottery studio recreating the beauty of Joseon white porcelain.',
    category: '백자',
    categoryEn: 'White Porcelain',
    address: '경기도 수원시 팔달구 행궁로 40',
    addressEn: '40 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-3.svg',
    mascotDescription: '달항아리 안에 앉아있는 토끼 마스코트',
    mascotDescriptionEn: 'A rabbit mascot sitting in a moon jar',
    coordinates: { lat: 37.2861, lng: 127.0171 },
    hasExperience: true,
    experiences: [
      { id: 'exp-11-1', name: '백자 접시 만들기', nameEn: 'White Porcelain Plate', price: 35000, duration: '90분', durationEn: '90 min', description: '전통 백자 접시 빚기 체험', descriptionEn: 'Create a traditional white porcelain plate' },
    ],
    menu: [
      { id: 'menu-11-1', name: '미니 달항아리', nameEn: 'Mini Moon Jar', price: 120000, description: '소형 달항아리 작품', descriptionEn: 'Small moon jar artwork' },
    ],
    nfcId: 'nfc-shop-11',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-12',
    name: '전통 매듭 공방',
    nameEn: 'Traditional Knot Studio',
    description: '한국 전통 매듭의 아름다움을 배울 수 있는 공방입니다.',
    descriptionEn: 'A workshop where you can learn the beauty of Korean traditional knots.',
    category: '전통매듭',
    categoryEn: 'Traditional Knots',
    address: '경기도 수원시 팔달구 행궁로 42',
    addressEn: '42 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-4.svg',
    mascotDescription: '매듭을 엮고 있는 고슴도치 마스코트',
    mascotDescriptionEn: 'A hedgehog mascot tying knots',
    coordinates: { lat: 37.2877, lng: 127.0182 },
    hasExperience: true,
    experiences: [
      { id: 'exp-12-1', name: '팔찌 매듭 체험', nameEn: 'Bracelet Knot Making', price: 15000, duration: '45분', durationEn: '45 min', description: '전통 매듭 팔찌 만들기', descriptionEn: 'Make a traditional knot bracelet' },
      { id: 'exp-12-2', name: '노리개 매듭', nameEn: 'Norigae Knot', price: 25000, duration: '90분', durationEn: '90 min', description: '전통 노리개 매듭 제작', descriptionEn: 'Create traditional ornament knots' },
    ],
    menu: [
      { id: 'menu-12-1', name: '매듭 노리개', nameEn: 'Knot Ornament', price: 35000, description: '전통 매듭 노리개', descriptionEn: 'Traditional knot ornament' },
    ],
    nfcId: 'nfc-shop-12',
    totemLocation: 'alley',
  },
  {
    id: 'shop-13',
    name: '화성 붓글씨',
    nameEn: 'Hwaseong Calligraphy',
    description: '전통 서예와 현대 캘리그라피를 체험할 수 있는 공방입니다.',
    descriptionEn: 'A workshop where you can experience traditional calligraphy and modern lettering.',
    category: '서예',
    categoryEn: 'Calligraphy',
    address: '경기도 수원시 팔달구 행궁로 45',
    addressEn: '45 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-5.svg',
    mascotDescription: '붓을 들고 있는 판다 마스코트',
    mascotDescriptionEn: 'A panda mascot holding a brush',
    coordinates: { lat: 37.2873, lng: 127.0169 },
    hasExperience: true,
    experiences: [
      { id: 'exp-13-1', name: '한글 캘리그라피', nameEn: 'Hangul Calligraphy', price: 20000, duration: '60분', durationEn: '60 min', description: '나만의 한글 캘리그라피 작품', descriptionEn: 'Create your own Hangul calligraphy art' },
      { id: 'exp-13-2', name: '부채 글씨 체험', nameEn: 'Fan Calligraphy', price: 25000, duration: '75분', durationEn: '75 min', description: '전통 부채에 글씨 쓰기', descriptionEn: 'Write calligraphy on a traditional fan' },
    ],
    menu: [
      { id: 'menu-13-1', name: '캘리그라피 액자', nameEn: 'Calligraphy Frame', price: 40000, description: '맞춤 캘리그라피 액자', descriptionEn: 'Custom calligraphy frame' },
    ],
    nfcId: 'nfc-shop-13',
    totemLocation: 'storefront',
  },
  {
    id: 'shop-14',
    name: '행궁 전통주점',
    nameEn: 'Haenggung Traditional Spirits',
    description: '수원의 전통주를 맛볼 수 있는 곳입니다. 체험은 없지만 다양한 전통주를 판매합니다.',
    descriptionEn: 'A place to taste Suwon traditional spirits. No experience programs, but sells various traditional liquors.',
    category: '전통주',
    categoryEn: 'Traditional Spirits',
    address: '경기도 수원시 팔달구 행궁로 48',
    addressEn: '48 Haenggung-ro, Paldal-gu, Suwon-si, Gyeonggi-do',
    mascotImage: '/mascots/placeholder-6.svg',
    mascotDescription: '술병을 들고 있는 너구리 마스코트',
    mascotDescriptionEn: 'A raccoon mascot holding a liquor bottle',
    coordinates: { lat: 37.2865, lng: 127.0192 },
    hasExperience: false,
    experiences: [],
    menu: [
      { id: 'menu-14-1', name: '수원 막걸리', nameEn: 'Suwon Makgeolli', price: 8000, description: '지역 양조장 막걸리', descriptionEn: 'Local brewery rice wine' },
      { id: 'menu-14-2', name: '전통 과실주', nameEn: 'Traditional Fruit Wine', price: 15000, description: '매실주, 복분자주 등', descriptionEn: 'Plum wine, bokbunja, etc.' },
      { id: 'menu-14-3', name: '전통주 선물세트', nameEn: 'Traditional Spirits Gift Set', price: 45000, description: '엄선된 전통주 3종 세트', descriptionEn: 'Curated set of 3 traditional spirits' },
    ],
    nfcId: 'nfc-shop-14',
    totemLocation: 'alley',
  },
]

// 거리 초입 토템
export const ENTRANCE_TOTEM = {
  id: 'entrance-totem',
  name: '공방거리 입구',
  nameEn: 'Craft Street Entrance',
  nfcId: 'nfc-entrance',
  coordinates: { lat: 37.2860, lng: 127.0170 },
  totemLocation: 'entrance' as const,
}

// 사용자 ID 생성
export function getUserId(): string {
  if (typeof window === 'undefined') return 'demo-user'
  
  let userId = localStorage.getItem('gongbang-user-id')
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem('gongbang-user-id', userId)
  }
  return userId
}

export function getShopByNfcId(nfcId: string): Shop | null {
  return SHOPS.find(shop => shop.nfcId === nfcId) || null
}

export function getTouchSuwonReservationLink(shopId: string): string {
  return `${TOUCH_SUWON_RESERVATION_BASE}?shop=${shopId}`
}
