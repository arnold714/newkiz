import { customAxios } from '@/shared';
import { NewsItem } from '@/features/category';

/**
 * 카테고리 ID에 해당하는 뉴스 목록을 가져옵니다.
 */
export async function fetchNewsByCategory(categoryId: string): Promise<NewsItem[]> {
  try {
    const upperCategoryId = categoryId.toUpperCase();

    const response = await customAxios.get<{ data: { newsList: NewsItem[] } }>(
      `/api/news/category/${upperCategoryId}`
    );
    return response.data.data.newsList;
  } catch (error) {
    console.error('Failed to fetch news list:', error);
    return [];
  }
}
