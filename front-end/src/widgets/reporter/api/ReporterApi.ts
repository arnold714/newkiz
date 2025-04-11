import { customAxios } from '@/shared';

// 기사 전체 조회 API 호출
export const fetchAllKidsNews = async (): Promise<{ success: boolean, data: any[], error: string | null }> => {
  try {
    const response = await customAxios.get('/api/kidsnews');
    return response.data; 
  } catch (error) {
    console.error('Error fetching all kids news:', error);
    return { success: false, data: [], error: 'Failed to fetch news' };
  }
};