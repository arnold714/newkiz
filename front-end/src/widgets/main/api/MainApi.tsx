import { useQuery } from "@tanstack/react-query";
import { NewsTodayItem, ApiResponse } from "@/features/main/model/types";
import { customAxios } from "@/shared";


// const BASE_URL = import.meta.env.VITE_REACT_API_URL;
const API_URL = import.meta.env.VITE_API_URL;
export const GetTodayNews = () => {
    return useQuery<NewsTodayItem[], Error>({
        queryKey: ['todayNews'],
        queryFn: async () => {
            const response = await customAxios.get<ApiResponse>(`${API_URL}/api/news/today`);
            console.log("API response:", response.data);
            return response.data.data;
        },
        initialData: [],
    });
};
