import { customAxios } from "@/shared";

export const createArticle = async (formData: FormData): Promise<{ success: boolean, data: any, error: string | null }> => {
    try {
      const response = await customAxios.post('/api/kidsnews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating article:', error);
      return { success: false, data: null, error: 'Failed to create article' };
    }
  };

// 기사 수정 API (multipart/form-data로 PATCH 요청)
export const updateArticle = async (kidsnewsId: string, formData: FormData) => {
    try {
      const response = await customAxios.patch(`/api/kidsnews/${kidsnewsId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data; // { success: true, data: {...}, error: null } 형태
    } catch (error) {
      console.error('Error updating article:', error);
      return { success: false, data: null, error: 'Failed to update article' };
    }
  };