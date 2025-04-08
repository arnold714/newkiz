export interface ApiResponse {
    success: boolean;
    data: NewsItem[]; 
    error: string | null;
  };

// 오늘의 추천 뉴스
export interface NewsItem {
    id: string;
    title: string;
    link: string;
    published: string;
    category: string;
    article: string;
    img: string;
    summary: string;
    views: number;
    scrap: number;
    contextList: {
        level: number;
        context: { type: string, data: string}[];
    }[];
    wordList: { word: string; mean: string}[];
};


//오늘 읽은 뉴스 개수 타입
export interface TodayReadNewsCount {
    success: boolean;
    data: number;
    error: string | null;
};

export const interest: Record<string, string> = {
    "IT_SCIENCE": "IT/과학",
    "ECONOMY": "경제",
    "POLITICS": "정치",
    "SOCIETY": "사회",
    "SPORTS": "스포츠",
    "WORLD": "세계",
    "CULTURE": "생활/문화",
  };