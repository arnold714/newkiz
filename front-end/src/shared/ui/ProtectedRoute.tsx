import { Navigate, Outlet } from "react-router-dom";
import { Cookies } from "react-cookie";

export default function ProtectedRoute() {
  const cookies = new Cookies();
  const refreshToken = cookies.get("refreshToken");

  if (!refreshToken) {
    alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
