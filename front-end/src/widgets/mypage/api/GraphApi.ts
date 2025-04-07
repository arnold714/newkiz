import { customAxios } from "@/shared";
import { GraphResponse, GraphData } from "@/features/mypage";

export async function fetchUserGraph(): Promise<GraphData> {
    // 기본값 설정: 데이터가 없을 때 모두 0으로 반환
    const defaultGraphData: GraphData = {
      userId: 0,
      society: 0,
      economy: 0,
      culture: 0,
      sports: 0,
      world: 0,
      it_SCIENCE: 0,
      politics: 0,
    };
  
    try {
      const response = await customAxios.get<GraphResponse>("/api/mypage/graph");
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error("그래프 API 오류:", response.data.error);
        return defaultGraphData;
      }
    } catch (error) {
      console.error("그래프 데이터 불러오기 실패:", error);
      return defaultGraphData;
    }
  }