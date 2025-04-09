export interface ReporterArticle {
  id: string;           // 뉴스 식별자
  title: string;        // 뉴스 제목
  content: string;      // 뉴스 내용
  imgUrl: string;       // 뉴스 이미지 URL
  author: string;       // 기자 이름
  views: number;        // 조회수
  likes: number;        // 좋아요 수
  createdAt: string;    // 생성일 (string으로 처리)
  updatedAt: string;    // 업데이트일 (string으로 처리)
  replies: any[];       // 댓글 (필요한 경우 추가)
}