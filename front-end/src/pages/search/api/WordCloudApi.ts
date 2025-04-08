import { customAxios } from "@/shared";
import { WordCloudResponse } from "@/features/search";

export const fetchPopularKeywords = async (): Promise<WordCloudResponse> => {
  try {
    const response = await customAxios.get<WordCloudResponse>("/api/news/search/cloud");
    return response.data;
  } catch (error) {
    console.error("워드 클라우드 API 호출 실패:", error);
    return { success: false, data: [], error: "워드 클라우드 데이터를 불러오는 데 실패했습니다." };
  }
};