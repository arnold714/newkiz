import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedGameRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // 직접 URL 접근 감지 (referrer가 없거나 state가 없는 경우)
  const isDirectAccess = !document.referrer || !location.state;
  
  // /game 경로에 대한 직접 접근 차단
  if (location.pathname === "/game" && isDirectAccess) {
    return <Navigate to="/forbidden" replace />;
  }
  
  return <>{children}</>;
};
