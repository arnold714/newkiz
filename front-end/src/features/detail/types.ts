export interface NewsDetail {
  id: string;
  title: string;
  link: string;
  published: string; //날짜 문자열
  category: string;
  article: string;
  img: string;
  views: number;
}

export interface QuizChoic {
  id:number;
  number: number;
  content: string;
}

export interface QuizData {
  id: number;
  question: string;
  correct_choice_id: number;
  choices:QuizChoic[];
}