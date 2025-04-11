import axios from 'axios';
import { Cookies } from 'react-cookie';

const { VITE_API_URL } = import.meta.env;

const createAxiosInstance = (baseURL?: string) => {
  const cookies = new Cookies(); // 쿠키에서 토큰을 가져오기 위해 사용

  const instance = axios.create({
    baseURL: baseURL ?? '',
    withCredentials: true, // 쿠키를 포함한 요청
    headers: {
      'Content-Type': 'application/json;charset=utf-8', // JSON 형식으로 요청
    },
  });

  // 요청 인터셉터: 인증 토큰을 헤더에 포함시킴
  instance.interceptors.request.use(
    (config) => {
      const accessToken = cookies.get('ACCESS_TOKEN'); // 쿠키에서 ACCESS_TOKEN을 가져옴
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`; // Authorization 헤더에 토큰 추가
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터: 401 및 403 처리
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      }

      if (error.response?.status === 403) {
        window.location.href = "/userinfo"; // 프로필 등록 페이지로 리다이렉트
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const customAxios = createAxiosInstance(VITE_API_URL);
export default customAxios;
