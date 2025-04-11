import { customAxios } from "@/shared";
import { MyPageRequest } from "@/features/login";

export async function postFirstLogin(data: MyPageRequest): Promise<void> {
  await customAxios.post("/api/mypage", data);
}