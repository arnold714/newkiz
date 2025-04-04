// ApiService.ts
import axios from 'axios';
import { NewsItem } from '../model/types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * 카테고리 ID에 해당하는 뉴스 목록을 가져옵니다.
 */
export async function fetchNewsByCategory(categoryId: string): Promise<NewsItem[]> {
  try {
    const upperCategoryId = categoryId.toUpperCase();

    const response = await axios.get<{ data: { newsList: NewsItem[] } }>(
      `${API_URL}/api/news/category/${upperCategoryId}`
    );
    return response.data.data.newsList;
  } catch (error) {
    console.error('Failed to fetch news list:', error);
    return [];
  }
}
