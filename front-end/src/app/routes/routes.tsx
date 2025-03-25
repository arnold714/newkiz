import { Suspense, lazy } from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";

const Loading = <div>로딩중입니다...</div>;

// 디테일 페이지
const DetailPage = lazy(() => import("../../pages/detail").then(module => ({ default: module.DetailPage })));
// 게임 페이지
const GamePage = lazy(() => import("../../pages/game").then(module => ({ default: module.GamePage })));
// 로그인 페이지
const LoginPage = lazy(() => import("../../pages/login").then(module => ({ default: module.LoginPage })));
// 메인 페이지
const MainPage = lazy(() => import("../../pages/main").then(module => ({ default: module.MainPage })));
// 마이 페이지
const MyPage = lazy(() => import("../../pages/mypage").then(module => ({ default: module.MyPage })));
// 리포터 페이지
const ReporterPage = lazy(() => import("../../pages/reporter").then(module => ({ default: module.ReporterPage })));
// 검색 페이지
const SearchPage = lazy(() => import("../../pages/search").then(module => ({ default: module.SearchPage })));
// 없는 페이지
const NotFoundPage = lazy(() => import("../../pages/notfound").then(module => ({ default: module.NotFoundPage })));
// 첫 로그인 정보 입력 페이지
const OnboardingContainer = lazy(() => import("../../pages/login").then(module => ({ default: module.OnboardingContainer })));
// 알림 페이지
const NotificationPage = lazy(() => import("../../pages/notification").then(module => ({ default: module.NotificationPage })));
// 챗봇 페이지
const ChatbotPage = lazy(() => import("../../pages/chatbot").then(module => ({ default: module.ChatbotPage })));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <MainPage />
      </Suspense>
    )
  },
  {
    path: "/detail",
    element: (
      <Suspense fallback={Loading}>
        <DetailPage />
      </Suspense>
    )
  },
  {
    path: "/game",
    element: (
      <Suspense fallback={Loading}>
        <GamePage />
      </Suspense>
    )
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={Loading}>
        <LoginPage />
      </Suspense>
    )
  },
  {
    path: "/mypage",
    element: (
      <Suspense fallback={Loading}>
        <MyPage />
      </Suspense>
    )
  },
  {
    path: "/reporter",
    element: (
      <Suspense fallback={Loading}>
        <ReporterPage />
      </Suspense>
    )
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={Loading}>
        <SearchPage />
      </Suspense>
    )
  },
  {
    path: "*",
    element: (
      <Suspense fallback={Loading}>
        <NotFoundPage />
      </Suspense>
    )
  },
  {
    path: "/userinfo",
    element: (
      <Suspense fallback={Loading}>
        <OnboardingContainer />
      </Suspense>
    )
  },
  {
    path: "/notification",
    element: (
      <Suspense fallback={Loading}>
        <NotificationPage />
      </Suspense>
    )
  },
  {
    path: "/chatbot",
    element: (
      <Suspense fallback={Loading}>
        <ChatbotPage />
      </Suspense>
    )
  }
];

export const router = createBrowserRouter(routes);
