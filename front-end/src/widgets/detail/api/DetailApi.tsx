import { customAxios } from "@/shared";
import { NewsDetail, QuizData, NewsScrapStatus } from "@/features/detail/model/types";

// 뉴스 상세내용 
export const GetNewsDetail = async (newsId: string): Promise<NewsDetail | undefined> => {
  try {
    const response = await customAxios.get(`/api/news/${newsId}`);
    console.log('response.data(뉴스 디테일):', response.data);
    const newsData = response.data.data;
    // API 응답에 textList가 없으면 빈 배열로 초기화 => 단어 사전 
    if (!newsData.textList) {
      newsData.textList = [];
    }
    return newsData;
  } catch (error) {
    console.error("뉴스 상세 내용 불러오기 실패:", error);
  }
};

//객관식 퀴즈 상세 조회/
export const GetNewsQuiz =  async (newsId: string): Promise<QuizData | undefined> => {
  try {
    const response = await customAxios.get(`api/news/${newsId}/quiz`);
    console.log('')
    return response.data.data;
  } catch (error) {
    console.error('퀴즈 불러오기 실패:', error);
  }
};



//뉴스 스크랩 여부 조회 //
export const GetNewsScrapStatus = async (newsId:string): Promise<NewsScrapStatus | undefined> => {
  try {
    const response = await customAxios.get(`api/news/${newsId}/scrap`);
    console.log('뉴스 스크랩 상태 api 요청',response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('뉴스 스크랩 상태 불러오기 실패:', error);
  }
};

//뉴스 스크랩
export const PostNewsScrap = async (newsId:string): Promise<NewsScrapStatus | undefined> => {
  try {
    const response = await customAxios.post(`api/news/${newsId}/scrap`);
    console.log('뉴스 스크랩 확인: ',response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('뉴스 스크랩 실패:', error);
  }
};

// 뉴스 스크랩 취소
export const DeleteNewsScrap = async (newsId:string): Promise<NewsScrapStatus | undefined> => {
  try {
    const response = await customAxios.delete(`api/news/${newsId}/scrap`);
    console.log('뉴스 스크랩 취소:', response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('뉴스 스크랩 취소 실패:', error);
  }
};