import { SearchRequest, SearchResponse, RecentSearchResponse, DeleteSearchHistoryResponse } from "@/features/search";
import { customAxios } from "@/shared";

export const fetchSearchResults = async (params: SearchRequest): Promise<SearchResponse> => {
    const { keyword, cursor } = params;
    const response = await customAxios.get('/api/news/search', {
      params: { keyword, cursor }
    });
    return response.data;
  };

export const fetchRecentSearches = async (): Promise<RecentSearchResponse> => {
    const response = await customAxios.get('/api/news/search/recent');
    return response.data;
  };
  
  // 검색 기록 삭제 DELETE API : searchId가 필요함.
export const deleteSearchHistory = async (searchId: string): Promise<DeleteSearchHistoryResponse> => {
    const response = await customAxios.delete(`/api/news/search/${searchId}`);
    return response.data;
  };