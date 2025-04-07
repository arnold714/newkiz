// 학교 관련 타입
export interface School {
    id: number;
    name: string;
    address: string;
  }
// 유저 정보 관련 타입
export interface Profile {
  id: number;
  userId: number;
  nickname: string;
  birthday: string;
  school: School;
  gender: "MALE" | "FEMALE" | string;
  difficulty: number;
  characterId: string; 
}
// 마이페이지 데이터 관련 타입
  export interface MyPageData {
    profile: Profile;
    interests: string[]; // 추후 관심사 데이터의 타입 정의 가능
  }
  
  export interface MyPageResponse {
    success: boolean;
    data: MyPageData;
    error: string | null;
  }
// 스크랩 뉴스를 위한 타입
  export interface NewsItem {
    id: string;            // 뉴스 식별자
    title: string;         // 뉴스 제목
    link: string;          // 원문 링크
    published: string;     // 발행 일시 (예: '2025-03-30T00:00:00')
    category: string;      // 예: 'IT_SCIENCE', 'SPORTS' 등
    article: string;       // 뉴스 기사 본문 또는 요약
    img: string;           // 이미지 URL
    views: number;         // 조회수
    scrap: number;         // 스크랩 수
  }
  
  export interface ScrapNewsResponse {
    success: boolean;
    data: NewsItem[];      // 스크랩된 뉴스 목록
    error?: string | null;
  }
// 스크랩 단어를 위한 타입
  export interface VocaItem {
    wordId: number; // 단어 식별자
    word: string;   // 단어 문자열
  }

  export interface ScrapVocaResponse {
    success: boolean;
    data: {
      word: VocaItem[]; // "word" 배열 안에 VocaItem들이 들어있음
    };
    error?: string | null;
  }
// 마이페이지 통계자료를 위한 그래프 타입
  export interface GraphData {
    userId: number;
    society: number;
    economy: number;
    culture: number;
    sports: number;
    world: number;
    it_science: number;
    politics: number;
  }
  
  export interface GraphResponse {
    success: boolean;
    data: GraphData;
    error?: string | null;
  }

// AI 요약 관련 타입
export interface NewsSummary {
  id: string;
  newsId: string;
  userId: number;
  summary: string;     // 사용자가 작성한 요약
  updatedAt: string;
}

export interface NewsDocument {
  id: string;
  title: string;       // 기사 제목
  link: string;        // 기사 원문 링크
  published: string;
  category: string;
  img: string;
  views: number;
  scrap: number;
  article?: string;    // AI 요약(또는 기사 본문)이 들어있는 필드 (서버 구조에 맞춰 수정)
}

export interface SummaryItem {
  newsSummary: NewsSummary;
  newsDocument: NewsDocument;
}

export interface SummaryResponse {
  success: boolean;
  data: SummaryItem[] | SummaryItem; // 서버가 배열/단일 중 어느 형태로 주는지 확인
  error?: string | null;
}

export interface UpdateMyPageRequest {
  nickname: string;
  school: number;        // 학교 ID
  difficulty: number;    // 1=하, 2=중, 3=상
  characterId: string;
  interests: string[];
}