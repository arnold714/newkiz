import { useQuery } from "@tanstack/react-query";
import { NewsTodayItem, ApiResponse, TodayReadNewsCount } from "@/features/main";
import { customAxios } from "@/shared";

//오늘의 뉴스
export const GetTodayNews = () => {
    return useQuery<NewsTodayItem[], Error>({
        queryKey: ['todayNews'],
        queryFn: async () => {
            const response = await customAxios.get<ApiResponse>('/api/news/today');
            console.log("오늘의 뉴스 API response:", response.data);
            return response.data.data;
        },
        initialData: [],
    });
};

// 오늘 읽은 뉴스 개수 조회(게임 입장 시)
export const GetTodayReadNewsCount = () => {
    return useQuery<TodayReadNewsCount, Error>({
        queryKey: ['todayReadNewsCount'],
        queryFn: async () => {
            const response = await customAxios.get('/api/records/news/today');
            console.log('오늘 읽은 뉴스 API response:', response.data);
            return response.data;
        },
        initialData:{ success: false, data: 0, error: null },
    });
};

// 개인 맞춤형 뉴스 추천
// export const GetNewsByUserInterests =  () => {
//     return userQuery
// }