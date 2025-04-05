import { useQuery } from "@tanstack/react-query";
import { NewsTodayItem, ApiResponse } from "@/features/main/model/types";
import { customAxios } from "@/shared";

export const GetTodayNews = () => {
    return useQuery<NewsTodayItem[], Error>({
        queryKey: ['todayNews'],
        queryFn: async () => {
            const response = await customAxios.get<ApiResponse>('/api/news/today');
            console.log("API response:", response.data);
            return response.data.data;
        },
        initialData: [],
    });
};
