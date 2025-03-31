// 뉴스 상세 정보( textList 임시)
export interface NewsDetail {
  id: string;
  title: string;
  link: string;
  published: string; //날짜 문자열
  category: string;
  article: string;
  img: string;
  views: number;
  textList: text[];
}
//임시 단어 사전
export interface text {
  id: number;
  text: string;
  content: string;
}

//퀴즈 답 리스트
export interface QuizChoic {
  id:number;
  number: number;
  content: string;
}
// 퀴즈 문제 
export interface QuizData {
  id: number;
  question: string;
  correct_choice_id: number;
  choices:QuizChoic[];
}

// 단어 사전
export interface WordData {
  items: WordItem[];
}

export interface WordItem {
  title: string;
  description: string;
  link: string;
}