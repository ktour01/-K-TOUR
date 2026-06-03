import { Product, BlogReview, Booking } from './types.ts';

export const GOLF_PRODUCTS: Product[] = [
  // Overseas
  {
    id: 'ovs-chiangmai',
    category: 'overseas',
    subCategory: '태국/치앙마이',
    badge: '2인출발',
    title: '치앙마이 3색·4색 황제 골프 & 시내 호캉스 5일',
    description: '가성비 극강의 장기 체류형 상품부터 엄선된 명품 코스 3색 투어까지 골퍼들의 파라다이스.',
    priceText: '890,000 ~',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=600&auto=format&fit=crop',
    duration: '3박 5일',
    highlights: ['치앙마이 란나, 가산파노라마, 하이랜드 명품 3강 코스 교차 라운딩', '시내 특급 5성급 호텔 숙박 및 프라이빗 왕복 픽업서비스', '기다림 없는 1일 18홀 그린피+카트+캐디 포함 패키지'],
    hotelName: '치앙마이 샹그릴라 5성급 리조트',
    meals: '호텔 정식 조식 + 한식 및 현지 해산물 특식 석식'
  },
  {
    id: 'ovs-danang',
    category: 'overseas',
    subCategory: '말레이시아/베트남/필리핀',
    badge: '골프조인',
    title: '다낭·나트랑 명문 3대 코스 럭셔리 골프 투어 5일',
    description: '동남아 최고의 골프 성지, 세계적인 거장들이 설계한 다낭 명문 오션뷰 라운딩.',
    priceText: '1,290,000 ~',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=600&auto=format&fit=crop',
    duration: '3박 5일',
    highlights: ['바나힐CC, 몽고메리 링크스, BRG 다낭 골프 클럽 엄선', '동반인 전원 만족 보장! 다낭 비치프론트 럭셔리 5성급 리조트 투숙', '한국인 현지 전문 골프 가이드 상시 상류 가이드 안심 동행'],
    hotelName: '다낭 풀만 비치 리조트',
    meals: '조식 단품뷔페 + 라운지 웰컴 바비큐 및 랍스터 정식 특식'
  },
  {
    id: 'ovs-kotakinabalu',
    category: 'overseas',
    subCategory: '말레이시아/베트남/필리핀',
    badge: '2인출발',
    title: '코타키나발루 수트라하버 석양 골프 & 힐링 4일',
    description: '세계 3대 석양을 배경으로 티오프를 날리는 인생샷 보장 황홀한 라운딩 투어.',
    priceText: '1,050,000 ~',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=600&auto=format&fit=crop',
    duration: '3박 4일',
    highlights: ['27홀 매머드 코스, 수트라하버 마리나 CC 전일 라운딩', '호텔 앞 전용 선착장 출발, 크루즈 힐링 투어와 연계 진행', '골프 초보 및 부부 골퍼 대환영, 여유로운 주중 36홀 집중 라운딩 가능'],
    hotelName: '수트라하버 마젤란 리조트 (Executive)',
    meals: '고급 인터내셔널 뷔페 및 선셋 크루즈 시푸드 만찬'
  },
  {
    id: 'ovs-hokkaido',
    category: 'overseas',
    subCategory: '일본/중국',
    badge: '긴급마감',
    title: '[피서골프] 홋카이도 루스츠 72홀 초대형 골프&스파 4일',
    description: '한여름에도 평균 22도의 최고의 기온! 황금 블럭 잔여석 스팟 특가 오픈.',
    priceText: '1,590,000 ~',
    image: 'https://images.unsplash.com/photo-1627447457192-386b72a6b245?q=80&w=600&auto=format&fit=crop',
    duration: '3박 4일',
    highlights: ['아름다운 요테이산을 감상하며 치는 72홀 루스츠 타워 골프 클래식', '라운딩 후 천연 온천 노천탕과 홋카이도 프리미엄 대게 뷔페 저녁 식사', '안심 단독 송영 차량 배치로 공항↔리조트 막힘없는 풀 케어'],
    hotelName: '루스츠 리조트 타워 & 스파 스위트',
    meals: '호텔 조식 + 대게&와규 무제한 스페셜 뷔페 석식'
  },
  {
    id: 'ovs-kagoshima',
    category: 'overseas',
    subCategory: '일본/중국',
    badge: '2인출발',
    title: '[동계캠프] 따뜻한 가고시마 온천 골프 & 카이세키 5일',
    description: '겨울철 골퍼들의 원픽, 아늑한 남국 날씨속에 천연 온천과 최고급 요리를 즐기는 투어.',
    priceText: '1,190,000 ~',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&auto=format&fit=crop',
    duration: '4박 5일',
    highlights: ['치란CC, 가고시마공항 36CC 최고급 오버시즈 라운딩', '매일 라운딩 후 원천 가케나가시식 리얼 힐링 노천탕 온천체험', '동반 연령 불문 인생 힐링 골프 여정 설계 보장'],
    hotelName: '가고시마 가조엔 온천 료칸 / 시티 카지노 호텔',
    meals: '정갈한 료칸식 가정 백반 조식 + 정통 최고급 가이세키 코스 요리'
  },
  {
    id: 'ovs-weihai',
    category: 'overseas',
    subCategory: '일본/중국',
    badge: '긴급마감',
    title: '[ALL포함 특가] 위해 아시아드 블라인드스톤 CC 3일',
    description: '비행기 타고 1시간! 해외로 떠나는 주말 순삭 순금 잔여티 스팟 무한 특가 대방출.',
    priceText: '590,000 ~',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=600&auto=format&fit=crop',
    duration: '2박 3일',
    highlights: ['중국 산동반도 프리미엄 비치사이드 블라인드 스톤 CC 36홀 라운딩', '가이드피, 기사팁, 카트비, 그린피, 올포함 번거로움 제로 견적', '직장인 연차 부담 제로 금요일 아침 출발 ➔ 일요일 저녁 도착 코스'],
    hotelName: '그랜드 웨이하이 골프 호텔 5성급',
    meals: '호텔 한·중식 정갈한 뷔페식 조석식 및 양꼬치 주류 특선 석식'
  },

  // Domestic
  {
    id: 'dom-yeosu',
    category: 'domestic',
    subCategory: '전라도/경상도권',
    badge: '긴급마감',
    title: '여수 디오션CC 씨사이드 1박2일 명품 패키지',
    description: '여수 밤바다의 정취와 함께 18홀 전 홀에서 푸른 남해 바다의 절경을 감상하는 시사이드 명문.',
    priceText: '340,000 ~',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d66?q=80&w=600&auto=format&fit=crop',
    duration: '1박 2일',
    highlights: ['전홀 오션뷰 남해의 수려한 지형을 그대로 살린 최고 평점 디오션 CC 36홀', '여수 바다를 한눈에 보는 최고급 디오션 리조트 숙박(2인 1실)', '남도의 화려한 맛! 제철 활어회와 해물 삼합을 즐기는 디너 동반 특식 포함'],
    hotelName: '여수 디오션 호텔 (오션뷰)',
    meals: '디오션 클럽하우스 정갈한 조식 + 남도식 해물 한상 차림'
  },
  {
    id: 'dom-damyang',
    category: 'domestic',
    subCategory: '전라도/경상도권',
    badge: '2인출발',
    title: '남도 품격 2색 골프 - 담양 레이나 & 광주 골프 투어 2일',
    description: '유럽풍 궁전 클럽하우스 메카 레이나CC와 광주 대표 어등산CC 황금 시간대 라운딩.',
    priceText: '370,000 ~',
    image: 'https://images.unsplash.com/photo-1592819695396-064b95e2a660?q=80&w=600&auto=format&fit=crop',
    duration: '1박 2일',
    highlights: ['그리스 여신전 같은 럭셔리 라운지 담양 레이나CC 18홀 + 무등산CC 18홀 명품 매칭', '메타세쿼이아 숲길 사이에서의 최고급 피톤치드 테라피 라운딩', '소쇄원 근방 남도 한정식 떡갈비 정찬 특식 포함'],
    hotelName: '담양 레이나 골프텔 럭셔리 스위트 룸',
    meals: '남도 전담 한정식 쌀밥 정식 조식 + 수제 숯불 삼겹 & 한우 떡갈비 명가 석식'
  },
  {
    id: 'dom-gangwon',
    category: 'domestic',
    subCategory: '강원도/충청도/경기도권',
    badge: '2인출발',
    title: '청정 강원 파인리즈 힐링 골프 & 온천 패키지 2일',
    description: '설악산 울산바위의 비경과 소나무향 가득한 에메랄드 코스, 3대 온천수의 화려한 조화.',
    priceText: '395,000 ~',
    image: 'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?q=80&w=600&auto=format&fit=crop',
    duration: '1박 2일',
    highlights: ['친환경 친자연 27홀 파인리즈 CC 라운딩 및 아잘리아 스파 프리 패스', '코스 내에서 분출되는 미네랄 100% 온천수로 라운딩 피로 한방에 해결', '해발 700m 청정 구역 속 단독 럭셔리 별장형 콘도 빌라 4인 동반 투숙'],
    hotelName: '파인리즈 빌라콘도미니엄 럭셔리 동',
    meals: '강원 제철 곤드레 가마솥밥 조식 + 자연산 활어회 및 게 요리 만찬'
  },
  {
    id: 'dom-yemiji',
    category: 'domestic',
    subCategory: '강원도/충청도/경기도권',
    badge: '골프조인',
    title: '충남 아산 예미지CC 초가성비 실속 실버 2일 패키지',
    description: '서울 강남에서 출발 1시간! 황금 시간 보장, 주중 부담없는 실천 그린피 즉시 매칭.',
    priceText: '220,000 ~',
    image: 'https://images.unsplash.com/photo-1544426543-98319ee0b3b4?q=80&w=600&auto=format&fit=crop',
    duration: '1박 2일',
    highlights: ['가성비 원탑! 다이나믹 코스 레이아웃의 예미지 CC 36홀 라운딩', '온양 온천 중심 관광호텔 숙소 지정으로 자유로운 라운딩 후 먹방 여행 연계', '골프 입문자, 가벼운 친목 모임용으로 가성비 최우선 가치 맞춤 상품'],
    hotelName: '온양 제일 온천 관광 호텔',
    meals: '호텔 해장국 조식 + 아산 로컬 웰빙 우렁 쌈밥 정식 석식'
  },
  {
    id: 'dom-jeju',
    category: 'domestic',
    subCategory: '제주도권',
    badge: '골프조인',
    title: '제주 최고 명문 핀크스 & 엘리시안 조인 명품 투어 2일',
    description: '예약 자체가 바늘구멍인 제주 최고 비공개 명문 구장 조인 전문 가이드 대동 1박 2일 스페셜.',
    priceText: '480,000 ~',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=600&auto=format&fit=crop',
    duration: '1박 2일',
    highlights: ['클럽 나인브릿지 버금가는 세계 100대 골프 코스 제주 핀크스CC 18홀 선매칭', '조인 전문가가 현지 기후 및 연령층 대조하여 최적의 굿 필 라운딩 조인 연계', '한라산 중산간 청정 숲세권 엘리시안 최고급 빌라트 숙박'],
    hotelName: '제주 엘리시안 럭셔리 골프 빌리지',
    meals: '호텔 전복죽 조식 + 제주 은갈치 조림 & 흑돼지 모둠 구이 최고급 저녁'
  }
];

export const NAVER_BLOG_REVIEWS: BlogReview[] = [
  {
    id: 'blog-1',
    title: '[K-TOUR 리얼답사] 태국 치앙마이 란나&하이랜드 직접 다녀온 리얼 골퍼의 솔직후기!',
    excerpt: '안녕하세요! 케이투어 대표 박준희입니다. 지난주 6월 비수기 요금을 점검하고자 태국 치앙마이 최고로 꼽히는 란나CC와 하이랜드CC 답사를 마치고 왔습니다. 확실히 그린 관리 및 러프 상태가 최상이네요...',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=600&auto=format&fit=crop',
    author: '바람을 가르는 샷 (박준희 대표)',
    date: '2026.05.28',
    link: 'https://blog.naver.com/rudu_ktour/2232490184',
    golfCourse: '태국 치앙마이 하이랜드 CC'
  },
  {
    id: 'blog-2',
    title: '[여수 디오션 1박2일] 남해 오션뷰 디오션CC 해물 삼합 포함 패키지 만족도 200% 리뷰',
    excerpt: '인생 씨사이드 골프장을 찾았습니다! 바로 여수 디오션CC 인데요, 바다바람이 적당하고 무엇보다 홀 전체 언듈레이션이 환상적입니다. 석식으로 제공된 남도 밥상 해물 삼합은 동반 골퍼 누구나 찬사를 던진 요리였습니다...',
    image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=600&auto=format&fit=crop',
    author: '싱글을 향해 달리는 골퍼',
    date: '2026.05.15',
    link: 'https://blog.naver.com/rudu_ktour/2232230194',
    golfCourse: '여수 디오션 CC'
  },
  {
    id: 'blog-3',
    title: '[피서골프 후기] 한여름 루스츠 CC 72홀 북해도 골프장 잔여석 럭키 예약 대만족기',
    excerpt: '날씨가 더워지기 시작하니 북해도 골프 인기가 난리도 아니네요. 운 좋게 케이투어 특화 [🚨긴급마감] 상품 떠서 금요일 번개로 부부 동반 출발했습니다. 루스츠는 낮 기온 22도 수준이라 땀 한 방울 안 흘리고...',
    image: 'https://images.unsplash.com/photo-1627447457192-386b72a6b245?q=80&w=600&auto=format&fit=crop',
    author: '백순이 탈출기 (정*원 고객)',
    date: '2026.05.02',
    link: 'https://blog.naver.com/rudu_ktour/2232110294',
    golfCourse: '일본 북해도 루스츠 골프텔'
  },
  {
    id: 'blog-4',
    title: '[안심 조인성공] 제주 핀크스CC 동반자 조인 대면 지원으로 어색함 1도 없이 굿샷!',
    excerpt: '제주도 골프 가고 싶어도 조인 구하기가 어려워 매번 망설였는데, 케이투어 2인 조인 서비스 강추합니다! 제주 현지 마중부터 카트 조율까지 세심하게 관리자분들이 다 케어해주셔서 정말 너무 편하게 재미있게...',
    image: 'https://images.unsplash.com/photo-1544426543-98319ee0b3b4?q=80&w=600&auto=format&fit=crop',
    author: '드라이버는 쇼다 (김*훈 고객)',
    date: '2026.04.19',
    link: 'https://blog.naver.com/rudu_ktour/2231940123',
    golfCourse: '제주도 핀크스 CC'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'B001',
    createdAt: '2026-06-03 12:00',
    customerName: '홍길동',
    contact: '010-1234-5678',
    productId: 'dom-yeosu',
    productTitle: '여수 디오션CC 씨사이드 1박2일 명품 패키지',
    preferredDate: '2026-07-05',
    pax: 4,
    status: 'pending',
    additionalRequests: '오션뷰 객실 전망으로 최대한 고층 배정 부탁드려요. 금요일 저녁 남도 특식 관련해서 유선 상담 바랍니다.',
    adminNotes: '오션뷰 고층 객실 담당자 확인 중. 여수 디오션 잔여 티 배정 일정 조율 예정.'
  },
  {
    id: 'B002',
    createdAt: '2026-06-03 10:15',
    customerName: '김철수',
    contact: '010-9876-5432',
    productId: 'ovs-chiangmai',
    productTitle: '치앙마이 3색·4색 황제 골프 & 시내 호캉스 5일',
    preferredDate: '2026-08-16',
    pax: 2,
    status: 'discussing',
    additionalRequests: '장기체류 변경 가능성 있습니다. 1인 싱글차지 요금이 별도로 얼마나 들어가는지 궁금합니다.',
    adminNotes: '싱글 차지 1박당 추가 4만원 안내 예정. 체류 일수 연장 7일 여정 항공권 조율 중.'
  },
  {
    id: 'B003',
    createdAt: '2026-05-31 16:45',
    customerName: '박혜민',
    contact: '010-3333-5555',
    productId: 'ovs-hokkaido',
    productTitle: '[피서골프] 홋카이도 루스츠 72홀 초대형 골프&스파 4일',
    preferredDate: '2026-07-20',
    pax: 4,
    status: 'confirmed',
    additionalRequests: '동반자 한 분이 한식 알레르기가 있어서 저녁 석식 대게 뷔페 때 다른 양식 바우처가 사용 가능한지 체크 바랍니다.',
    adminNotes: '루스츠 리조트 타워 측 사전 고지 완료. 양식 메인 디시 교체 안내 완료.'
  },
  {
    id: 'B004',
    createdAt: '2026-05-29 09:30',
    customerName: '최동현',
    contact: '010-8888-9999',
    productId: 'dom-yeosu',
    productTitle: '여수 디오션CC 씨사이드 1박2일 명품 패키지',
    preferredDate: '2026-06-15',
    pax: 8,
    status: 'completed',
    additionalRequests: '8인 2팀 라운딩 웅장하고 프라이빗하게 요청.',
    adminNotes: '투어 행사 종료. 피드백 대만족, 차기 가고시마 가을 투어 계획중 문자 전달완료.'
  }
];
