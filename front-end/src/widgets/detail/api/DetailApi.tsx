import { customAxios } from "@/shared";
import { 
  NewsDetail, 
  QuizData, 
  NewsScrapStatus, 
  NewsQuizCheck,
  QuizSubmissionRequest } from "@/features/detail/model/types";
import { useQuery } from "@tanstack/react-query";
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

//객관식 퀴즈 풀이 여부 조회
export const GetNewsQuizCheck = (newsId: string) => {
  return useQuery<NewsQuizCheck, Error>({
    queryKey: ['newsQuizCheck', newsId],
    queryFn: async () => {
      const response = await customAxios.get(`/api/news/${newsId}/quiz/check`);
      console.log('뉴스 퀴즈 풀이여부 api response:', response.data);
      return response.data;
    },
    initialData: { success: false, data: null, error: null },
  })
};

//객관식 퀴즈 상세 조회
export const GetNewsQuiz =  async (newsId: string): Promise<QuizData | undefined> => {
  try {
    const response = await customAxios.get(`api/news/${newsId}/quiz`);
    console.log('')
    return response.data.data;
  } catch (error) {
    console.error('퀴즈 불러오기 실패:', error);
  }
};

//객관식 퀴즈 풀이
export const PostNewsQuiz = async (newsId: string):Promise<QuizSubmissionRequest | undefined> => {
  try {
    const response = await customAxios.post(`/api/news/${newsId}/quiz`);
    console.log('퀴즈 풀이 api post전송 성공:', response.data);
    return response.data;
  } catch (error) {
    console.log('퀴즈 풀이 상태 api 전송 실패:', error);
  }
};


//뉴스 스크랩 여부 조회 
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