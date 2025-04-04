export interface ApiResponse {
    success: boolean;
    data: NewsTodayItem[]; // ✅ 실제 데이터는 data 필드 안에 있음
    error: string | null;
  }

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
}

export interface News {
    title: string;
    content: string;
    imageUrl: string;
    category: '스포츠' | '정치' | '경제' | '사회' | 'IT/과학' | '세계' | '연예' | '생활/문화'
}

export type NewsCategory = '전체' | '스포츠' | '정치' | '경제' | '사회' | 'IT/과학' | '세계' | '연예' | '생활/문화'

