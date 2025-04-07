export interface ApiResponse {
    success: boolean;
    data: NewsTodayItem[]; 
    error: string | null;
  };
// 오늘의 추천 뉴스
export interface NewsTodayItem {
    id: string;
    title: string;
    link: string;
    published: string;
    category: string;
    article: string;
    img: string;
    views: number;
    scrap: number;
};
//오늘 읽은 뉴스 개수 타입
export interface TodayReadNewsCount {
    success: boolean;
    data: number;
    error: string | null;
};

//사용자 추천 뉴스 
export interface News {
    title: string;
    content: string;
    imageUrl: string;
    category: '스포츠' | '정치' | '경제' | '사회' | 'IT/과학' | '세계' | '연예' | '생활/문화'
}

export type NewsCategory = '전체' | '스포츠' | '정치' | '경제' | '사회' | 'IT/과학' | '세계' | '연예' | '생활/문화'

