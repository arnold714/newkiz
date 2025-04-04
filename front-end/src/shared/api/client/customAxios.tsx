import axios from "axios";
import { Cookies } from "react-cookie";

const { VITE_API_URL} = import.meta.env

const createAxiosInstance = (baseURL?: string) => {
    const cookies = new Cookies()

    const instance = axios.create({
        baseURL: baseURL ?? '',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })

    instance.interceptors.request.use(
        config => {
            const accessToken = cookies.get('accessToken')
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`
            }
            return config;
        },
        error => {
            return Promise.reject(error);
        },
    )

    //응답 인터셉터 설정: 토큰 만료 시 재발급 처리
    instance.interceptors.response.use(
        response => {
            return response
        },
        async error => {
            const originalRequest = error.config 
        }
    )

}