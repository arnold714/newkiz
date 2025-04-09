import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ProtectedRoute() {
  const [cookies] = useCookies(["ACCESS_TOKEN", "REFRESH_TOKEN"]);
  const accessToken = cookies.ACCESS_TOKEN;
  const refreshToken = cookies.REFRESH_TOKEN;

  console.log("accessToken:", accessToken); // 쿠키 값 확인
  console.log("refreshToken:", refreshToken); // 쿠키 값 확인

  // 쿠키가 없으면 로그인 페이지로 리다이렉트
  if (!accessToken || !refreshToken) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}