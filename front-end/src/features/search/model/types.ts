export interface NewsItem {
    id: string;
    title: string;
    link: string;
    published: string;
    category: string;
    article: string;
    img: string;
    summary: string;
  }
  
  export interface SearchResponse {
    success: boolean;
    data: {
      newsList: NewsItem[];
      cursor: string;  // For pagination
    };
    error?: string;
  }
  
  export interface SearchRequest {
    keyword: string;
    cursor?: string;
  }
  
  export interface RecentSearchItem {
    id: string;
    userId: string;
    keyword: string;
    searchedAt: string;
  }
  
  export interface RecentSearchResponse {
    success: boolean;
    data: RecentSearchItem[];
    error: string | null;
  }
  
  export interface DeleteSearchHistoryResponse {
    success: boolean;
    data: null;
    error: string | null;
  }

  export interface WordCloudItem {
    _id: string;  // 키워드
    count: number;  // 해당 키워드의 가중치
  }
  
  export interface WordCloudResponse {
    success: boolean;
    data: WordCloudItem[];
    error: string | null;
  }