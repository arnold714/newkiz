import { customAxios } from '@/shared';
import { NewsItem } from '@/features/category';

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

export async function fetchNewsBySubCategory(subCategoryId: string): Promise<NewsItem[]> {
  try {
    const upperSubCat = subCategoryId.toUpperCase();
    const response = await customAxios.get<{ data: { newsList: NewsItem[] } }>(
      `/api/news/subcategory/${upperSubCat}`
    );
    return response.data.data.newsList;
  } catch (error) {
    console.error('Failed to fetch subcategory news list:', error);
    return [];
  }
}