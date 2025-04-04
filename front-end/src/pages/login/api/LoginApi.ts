import axios from "axios";

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

// JWT 토큰 갱신 API 호출 함수
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (response.data.success) {
      const { accessToken, refreshToken } = response.data.data;
      console.log("토큰 갱신 성공:", { accessToken, refreshToken });
      // 갱신된 토큰 저장 로직 추가 (예: localStorage)
    } else {
      console.error("토큰 갱신 실패:", response.data.error);
    }
  } catch (error) {
    console.error("토큰 갱신 중 오류 발생:", error);
  }
};
