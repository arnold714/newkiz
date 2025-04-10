import { customAxios } from "@/shared";
import { ScrapNewsResponse, NewsItem, ScrapVocaResponse, VocaItem } from "@/features/mypage";

export async function fetchScrappedNews(): Promise<NewsItem[]> {
  try {
    const response = await customAxios.get<ScrapNewsResponse>("/api/mypage/scrap/news");
    if (response.data.success) {
      return response.data.data; // 실제 스크랩된 뉴스 목록
    } else {
      console.error("스크랩 뉴스 API 오류:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("스크랩 뉴스 불러오기 실패:", error);
    return [];
  }
}