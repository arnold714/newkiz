import { customAxios } from "@/shared";
import { MyPageResponse } from "@/features/mypage";
import { UpdateMyPageRequest } from "@/features/mypage";

export const fetchMyPage = async (): Promise<MyPageResponse> => {
  const response = await customAxios.get<MyPageResponse>("/api/mypage");
  return response.data;
};

export const updateMyPage = async (patchData: UpdateMyPageRequest): Promise<void> => {
  await customAxios.patch("/api/mypage", patchData);
};