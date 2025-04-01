import axios from "axios";

// 카카오 로그인 API 호출 함수
export const handleLogin = async () => {
  try {
    // 백엔드의 카카오 로그인 엔드포인트로 리다이렉트
    const response = await axios.post("/oauth2/authorization/kakao");
    if (response.status === 200) {
      console.log("카카오 로그인 성공:", response.data);
    } else {
      console.error("카카오 로그인 실패:", response);
    }
  } catch (error) {
    console.error("카카오 로그인 중 오류 발생:", error);
  }
};

// JWT 토큰 갱신 API 호출 함수
export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      "/api/auth/refresh",
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
