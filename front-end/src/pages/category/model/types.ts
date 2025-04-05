export interface NewsItem {
    id: string;            // 뉴스 식별자
    title: string;         // 뉴스 제목
    link: string;          // 원문 링크
    published: string;     // 발행 일시
    category: string;      // ex) 'it_science', 'sports' 등
    article: string;       // 뉴스 기사 요약/본문
    img: string;           // 이미지 URL
    views: number;         // 조회수
    scrap: number;         // 스크랩수
  }

/** 각 카테고리의 서브 카테고리 정보 */
export interface SubCategory {
    id: string;       // 예: 'ai_robotics'
    name: string;     // 예: '인공지능과 로봇'
    iconName?: string; // 필요 시 아이콘 파일명
  }
  
  /** 대분류 카테고리 */
  export interface Category {
    id: string;            // 예: 'it_science'
    name: string;          // 예: 'IT/과학'
    subCategories: SubCategory[];
  }