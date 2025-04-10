import { customAxios } from "@/shared";
import { 
  NewsDetail, 
  QuizData, 
  NewsScrapStatus, 
  NewsQuizCheck,
  QuizSubmissionResponse,
  ApiResponse,
  GetNewsSummaryResponse } from "@/features/detail/model/types";
import { useQuery } from "@tanstack/react-query";


// 뉴스 상세내용 
export const GetNewsDetail = async (newsId: string): Promise<NewsDetail | undefined> => {
  try {
    const response = await customAxios.get(`/api/news/${newsId}`);
    // console.log('response.data(뉴스 디테일):', response.data);
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
      // console.log('뉴스 퀴즈 풀이여부 api response:', response.data);
      return response.data;
    },
    initialData: { success: false, data: null, error: null },
  })
};

//객관식 퀴즈 상세 조회
export const GetNewsQuiz =  async (newsId: string): Promise<QuizData | undefined> => {
  try {
    const response = await customAxios.get(`api/news/${newsId}/quiz`);
    // console.log('퀴즈 상세조회 api response:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('퀴즈 불러오기 실패:', error);
  }
};

//객관식 퀴즈 풀이
export const PostNewsQuiz = async (newsId: string, isCorrect: boolean): Promise<QuizSubmissionResponse | undefined> => {
  try {
    const response = await customAxios.post(`/api/news/${newsId}/quiz`, {
      isCorrect: isCorrect,

    });
    
    // console.log('퀴즈 풀이 api post전송 성공:', response.data);

    if (response.data.success) {
      return response.data; // 성공시 데이터 반환
    } else {
      throw new Error(response.data.error.message); // 실패시 오류 메시지 던짐
    }
  } catch (error) {
    console.log('퀴즈 풀이 상태 api 전송 실패:', error);
    return undefined;
  }
};


//뉴스 스크랩 여부 조회 
export const GetNewsScrapStatus = async (newsId:string): Promise<NewsScrapStatus | undefined> => {
  try {
    const response = await customAxios.get(`api/news/${newsId}/scrap`);
    // console.log('뉴스 스크랩 상태 api 요청',response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('뉴스 스크랩 상태 불러오기 실패:', error);
  }
};

//뉴스 스크랩
export const PostNewsScrap = async (newsId:string): Promise<NewsScrapStatus | undefined> => {
  try {
    const response = await customAxios.post(`api/news/${newsId}/scrap`);
    // console.log('뉴스 스크랩 확인: ',response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('뉴스 스크랩 실패:', error);
  }
};

// 뉴스 스크랩 취소
export const DeleteNewsScrap = async (newsId:string): Promise<NewsScrapStatus | undefined> => {
  try {
    const response = await customAxios.delete(`api/news/${newsId}/scrap`);
    // console.log('뉴스 스크랩 취소:', response.data.data)
    return response.data.data;
  } catch (error) {
    console.error('뉴스 스크랩 취소 실패:', error);
  }
};

//관련 뉴스 조회
export const GetRelatedNews = (newsId: string) => {
  return useQuery<NewsDetail[], Error>({
    queryKey: ['relatedNews', newsId],
    queryFn: async () => {
      const response = await customAxios.get<ApiResponse>(`/api/news/${newsId}/related`);
      // console.log('관련 뉴스 api response:', response.data.data);
      return response.data.data;
    },
    initialData: [],
  })
};

//요약 조회
export const GetNewsSummary = async (newsId:string):Promise< GetNewsSummaryResponse | null > => {
  try {
    const response =  await customAxios.get(`/api/news/${newsId}/summary`)
    return response.data.data;
  } catch(error) {
    console.log('ai 요약 가져오기 실패:', error)
    return null;
  }
};