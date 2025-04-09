import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function ProtectedRoute() {
  const [cookies] = useCookies(["ACCESS_TOKEN", "REFRESH_TOKEN"]);
  const accessToken = cookies.ACCESS_TOKEN;
  const refreshToken = cookies.REFRESH_TOKEN;

  if (!accessToken || !refreshToken) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}