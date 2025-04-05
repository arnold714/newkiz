import { customAxios } from "@/shared";
import { MyPageResponse } from "@/features/mypage/model/types";

export const fetchUserProfile = async (): Promise<MyPageResponse> => {
  const response = await customAxios.get<MyPageResponse>("/api/mypage");
  return response.data;
};