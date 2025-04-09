import { customAxios } from "@/shared";

// 특정 기사 상세 조회 API 호출
export const fetchKidsNewsById = async (kidsnewsId: string): Promise<{ success: boolean, data: any, error: string | null }> => {
    try {
      const response = await customAxios.get(`/api/kidsnews/${kidsnewsId}`);
      return response.data;  // 성공적으로 데이터를 반환
    } catch (error) {
      console.error(`Error fetching news by ID ${kidsnewsId}:`, error);
      return { success: false, data: null, error: 'Failed to fetch news by ID' }; // 에러 처리
    }
  };

export  const postLike = async (kidsnewsId: string) => {
    try {
      const response = await customAxios.post(`/api/kidsnews/${kidsnewsId}/likes`);
      return response.data; 
    } catch (error) {
      console.error("Error posting like:", error);
      return { success: false };  // 실패한 경우
    }
  };

// 기사 삭제 API
export const deleteArticle = async (kidsnewsId: string) => {
  try {
    const response = await customAxios.delete(`/api/kidsnews/${kidsnewsId}`);
    return response.data; // { success: true, data: null, error: null } 형태
  } catch (error) {
    console.error('Error deleting article:', error);
    return { success: false, data: null, error: 'Failed to delete article' };
  }
};