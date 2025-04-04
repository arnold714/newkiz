import { customAxios } from "@/shared";
import { ScrapNewsResponse, NewsItem, ScrapVocaResponse, VocaItem } from "../../../features/mypage/model/types";

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

export async function fetchScrappedWords(): Promise<VocaItem[]> {
    try {
      const response = await customAxios.get<ScrapVocaResponse>("/api/mypage/scrap/voca");
      if (response.data.success) {
        // 응답 데이터 구조에 맞춰서 data.word 배열을 반환
        return response.data.data.word;
      } else {
        console.error("스크랩 단어 API 오류:", response.data.error);
        return [];
      }
    } catch (error) {
      console.error("스크랩 단어 불러오기 실패:", error);
      return [];
    }
  }