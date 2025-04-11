import { customAxios } from "@/shared";
import { PostNewsSummaryRequest, GetNewsAiSummaryRequest  } from "@/features/newssummary";

//요약 저장
export const PostNewsSummary = async (newsId: string, summary: string): Promise<PostNewsSummaryRequest | null> => {
  try {
    const response = await customAxios.post(`/api/news/${newsId}/summary`, {
      summary: summary,
    });
    
    return response.data.data;
  } catch(error) {
    console.log('뉴스 요약 보내기 실패:',error);
    return null;
  }
}

//요약 조회
export const GetNewsAiSummary = async (newsId:string):Promise<GetNewsAiSummaryRequest | null > => {
  try {
    const response =  await customAxios.get(`/api/news/${newsId}/summary`)
    return response.data.data;
  } catch(error) {
    console.log('ai 요약 가져오기 실패:', error)
    return null;
  }
}