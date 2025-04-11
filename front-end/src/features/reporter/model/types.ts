export interface ReporterArticle {
  id: string;           // 뉴스 식별자
  title: string;        // 뉴스 제목
  content: string;      // 뉴스 내용
  imgUrl: string;       // 뉴스 이미지 URL
  author: string;       // 기자 이름
  views: number;        // 조회수
  userId: number;
  likes: number;        // 좋아요 수
  createdAt: string;    // 생성일 (string으로 처리)
  updatedAt: string;    // 업데이트일 (string으로 처리)
  replies: Reply[];       // 댓글 (필요한 경우 추가)
}

export interface Reply {
  id: string;         // 댓글 고유 ID
  content: string;    // 댓글 내용
  author: string;     // 댓글 작성자
  createdAt: string;  // 댓글 생성 날짜
  updatedAt: string;  // 댓글 수정 날짜
  userId: number;
  updated?: boolean;  // 댓글 수정 여부
}