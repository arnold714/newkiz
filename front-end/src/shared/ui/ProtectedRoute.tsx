import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function ProtectedRoute() {
  const cookies = new Cookies();
  const accessToken = cookies.get("ACCESS_TOKEN");
  const refreshToken = cookies.get("REFRESH_TOKEN");

  if (!accessToken || !refreshToken) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}