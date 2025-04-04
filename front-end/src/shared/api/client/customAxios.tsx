import axios  from "axios";
import { Cookies } from "react-cookie";

const { VITE_API_URL } = import.meta.env;

const createAxiosInstance = (baseURL?: string) => {
    const cookies = new Cookies();

    const instance = axios.create({
        baseURL: baseURL ?? '',
        withCredentials: true,
        headers: {
        'Content-Type': 'application/json;charset=utf-8',
        },
    });

    // 요청 인터셉터
    instance.interceptors.request.use(
        (config) => {
        const accessToken = cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 설정: 토큰 만료 시 재발급 처리
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 중복 요청 방지 플래그 설정

        try {
          // 예: 로컬 스토리지에서 기존 리프레시 토큰을 가져온 후 토큰 갱신 호출
          const storedRefreshToken = localStorage.getItem("refreshToken");
          if (storedRefreshToken) {
            // refreshToken 함수를 호출하여 새로운 액세스 토큰 발급
            await refreshToken(storedRefreshToken);

            // 갱신된 액세스 토큰을 로컬 스토리지에서 가져옴
            const newAccessToken = localStorage.getItem("accessToken");
            if (newAccessToken) {
              // 새로운 액세스 토큰을 헤더에 반영
              originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              // 원래 요청 재시도
              return instance(originalRequest);
            }
          }
        } catch (err) {
          console.error("토큰 갱신 실패:", err);
          // 토큰 갱신 실패 시, 로그인 페이지로 리다이렉트하거나 추가 처리 가능
          window.location.href = "/login"; // 예: 로그인 페이지로 리다이렉트
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// refreshToken 함수 예시 (API 호출로 새 토큰 발급)
const refreshToken = async (refreshToken: string): Promise<void> => {
  try {
    const response = await axios.post(`${VITE_API_URL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 새로 발급받은 토큰을 로컬 스토리지에 저장
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  } catch (error) {
    console.error("리프레시 토큰 요청 실패:", error);
    throw error; // 에러를 상위로 전달
  }
};

const customAxios = createAxiosInstance(VITE_API_URL);
export default customAxios;

