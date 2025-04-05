import { customAxios } from "@/shared";
import { SummaryResponse, SummaryItem } from "../../../features/mypage/model/types";

export async function fetchSummaries(): Promise<SummaryItem[]> {
  try {
    const response = await customAxios.get<SummaryResponse>("/api/records/summary");

    if (response.data.success) {
      // 서버가 배열로 주는지 단일 객체로 주는지에 따라 분기 처리
      const { data } = response.data;
      if (Array.isArray(data)) {
        return data; // 배열 그대로 반환
      } else {
        // 단일 객체라면 배열로 감싸서 반환
        return [data];
      }
    } else {
      console.error("요약 API 오류:", response.data.error);
      return [];
    }
  } catch (error) {
    console.error("요약 데이터 불러오기 실패:", error);
    return [];
  }
}
