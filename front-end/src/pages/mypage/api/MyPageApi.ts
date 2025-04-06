import { customAxios } from "@/shared";
import { MyPageResponse } from "@/features/mypage";

export const fetchMyPage = async (): Promise<MyPageResponse> => {
  const response = await customAxios.get<MyPageResponse>("/api/mypage");
  return response.data;
};

export const updateMyPage = async (patchData: any): Promise<void> => {
  await customAxios.patch("/api/mypage", patchData);
};