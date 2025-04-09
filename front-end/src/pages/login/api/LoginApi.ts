import { customAxios } from "@/shared";

const API_URL = import.meta.env.VITE_API_URL;

// 카카오 로그인 호출 함수
export const handleLogin = () => {
  try {
    // 카카오 로그인 URL로 리다이렉트
    window.location.href = `${API_URL}/oauth2/authorization/kakao`;
  } catch (error) {
    console.error("카카오 로그인 중 오류 발생:", error);
  }
};