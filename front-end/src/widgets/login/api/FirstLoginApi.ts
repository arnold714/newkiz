import { customAxios } from "@/shared";
import { MyPageRequest } from "@/features/login/model/types";

export async function postFirstLogin(data: MyPageRequest): Promise<void> {
  await customAxios.post("/api/mypage", data);
}