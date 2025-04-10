export interface ApiResponse {
    success: boolean;
    data: NewsDetail[]; 
    error: string | null;
  };
  
// 뉴스 상세 정보
export interface NewsDetail {
  id: string;
  title: string;
  link: string;
  published: string; //날짜 문자열
  category: string;
  subCategory: string;
  article: string;
  img: string;
  summary: string;
  views: number;
  scrap: number;
  wordList: word[];
  contextList: context[];
};

// 단어 사전
export interface word {
  word: string;
  mean: string;
};
// 난이도 별 뉴스
export interface context {
  level: number;
  context: { 
    type: string;
    data: string;
  }[];
};
//퀴즈 풀이 여부
export interface NewsQuizCheck {
  success: boolean;
  data: boolean | null;
  error: string | null;
};

//퀴즈 답 리스트
export interface QuizChoic {
  id:number;
  number: number;
  content: string;
};

// 퀴즈 문제 
export interface QuizData {
  id: string;
  quiz: {
    multipleChoiceQuiz: MultipleChoiceQuiz;
  }
};

export interface MultipleChoiceQuiz {
  question: string;
  options: string[];
  answer: string;
  explanation: string; // 여기에 설명을 추가합니다.
}

//퀴즈 풀이 후 여부 전송
export interface QuizSubmissionResponse {
  success: boolean;
  data: {
    id: string;
    newsId: string;
    userId: string;
    summary: string;
    updatedAt: string;
  } | null;
  error: {
    code: string;
    message: string;
  } | null;
};

// 단어 사전
export interface WordData {
  items: WordItem[];
};

export interface WordItem {
  title: string;
  description: string;
  link: string;
};

//스크랩 상태 
export interface NewsScrapStatus {
  isSrcapped: boolean;
};


//요약 조회
export interface GetNewsSummaryResponse {
  success: boolean;
  data: {
    id: string;
    newsId: string;
    userId: string;
    summary: string;
    updatedAt: string;
  };
  error: string | null;
};