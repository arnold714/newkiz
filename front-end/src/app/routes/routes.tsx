import { Layout } from "@/shared"
import { Suspense, lazy } from "react"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import { LoadingComponent } from "@/shared"
import { ProtectedGameRoute } from "@/shared/model/ProtectedGameRoute"
// import { ProtectedRoute } from "@/shared"

// 디테일 페이지
const DetailPage = lazy(() => import("@pages/detail").then((module) => ({ default: module.DetailPage })))
// 게임 페이지
const GamePage = lazy(() => import("@pages/game").then((module) => ({ default: module.GamePage })))
// 로그인 페이지
const LoginPage = lazy(() => import("@pages/login").then((module) => ({ default: module.LoginPage })))
// 메인 페이지
const MainPage = lazy(() => import("@pages/main").then((module) => ({ default: module.MainPage })))
// 마이 페이지
const MyPage = lazy(() => import("@pages/mypage").then((module) => ({ default: module.MyPage })))
const ModifyInfoPage = lazy(() => import("@pages/mypage").then((module) => ({ default: module.ModifyInfoPage })))
const ScrapPage = lazy(() => import("@pages/mypage").then((module) => ({ default: module.ScrapPage })))
const ScrappedNewsPage = lazy(() => import("@pages/mypage").then((module) => ({ default: module.ScrappedNewsPage })))
const SummaryPage = lazy(() => import("@pages/mypage").then((module) => ({ default: module.SummaryPage })))
const WrongAnswerPage = lazy(() => import("@pages/mypage").then((module) => ({ default: module.WrongAnswerPage })))
// 리포터 페이지
const ReporterPage = lazy(() => import("@pages/reporter").then((module) => ({ default: module.ReporterPage })))
const CreateArticlePage = lazy(() => import("@pages/reporter").then((module) => ({ default: module.CreateArticlePage })))
const ArticlePreviewPage = lazy(() => import("@pages/reporter").then((module) => ({ default: module.ArticlePreviewPage })))
// 검색 페이지
const SearchPage = lazy(() => import("@pages/search").then((module) => ({ default: module.SearchPage })))
// 검색 결과 페이지
const SearchResultsPage = lazy(() => import("@pages/search").then((module) => ({ default: module.SearchResultsPage })))
// 없는 페이지
const NotFoundPage = lazy(() => import("@pages/notfound").then((module) => ({ default: module.NotFoundPage })))
// 첫 로그인 정보 입력 페이지
const FirstLoginOnboarding = lazy(() => import("@pages/login").then((module) => ({ default: module.FirstLoginOnboarding })))
// 챗봇 페이지
const ChatbotPage = lazy(() => import("@pages/chatbot").then((module) => ({ default: module.ChatbotPage })))
// ai뉴스 요약 페이지
const NewsSummaryPage = lazy(() => import("@pages/newssummary").then((module) => ({ default: module.NewsSummaryPage })))
// 카테고리 페이지
const CategoryPage = lazy(() => import("@pages/category").then((module) => ({ default: module.CategoryPage })))
const CategoryDetailPage = lazy(() => import("@pages/category").then((module) => ({ default: module.CategoryDetailPage })))
// 잘못된 접근 
const ForbiddenPage = lazy(()=> import("@shared/ui/ForbiddenPage").then((module)=>({default:module.ForbiddenPage})))

const routes: RouteObject[] = [
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <LoginPage />
      </Suspense>
    ),
  },
  // 로그인해야만 접근할 수 있는 페이지들을 ProtectedRoute로 감싼다.
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <MainPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "/detail/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <DetailPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "/game",
    element: (
      <ProtectedGameRoute> {/* game url로 직접 접근하지 못하도록 막는 코드 */}
        <Suspense fallback={<LoadingComponent />}>
          <GamePage />
        </Suspense>
      </ProtectedGameRoute>
    ),
  },
  {
    path: "/mypage",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <MyPage />
        </Layout>
      </Suspense>
    ),
    children: [
      {
        path: "info",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ModifyInfoPage />
          </Suspense>
        ),
      },
      {
        path: "scrap",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ScrapPage />
          </Suspense>
        ),
        children: [
          {
            path: "news",
            element: (
              <Suspense fallback={<LoadingComponent />}>
                <ScrappedNewsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "summary",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <SummaryPage />
          </Suspense>
        ),
      },
      {
        path: "wronganswer",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <WrongAnswerPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/reporter",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <ReporterPage />
        </Layout>
      </Suspense>
    ),
    children: [
      {
        path: "create",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <CreateArticlePage />
          </Suspense>
        ),
      },
      {
        path: "preview",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <ArticlePreviewPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <SearchPage />
        </Layout>
      </Suspense>
    ),
  },
  {
    path: "/search/:keyword",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <SearchResultsPage />
          </Layout>
      </Suspense>
    ),
  },
  {
    path: "/userinfo",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <FirstLoginOnboarding />
      </Suspense>
    ),
  },
  {
    path: "/chatbot/:newsId",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ChatbotPage />
      </Suspense>
    ),
  },
  {
    path: "/newssummary/:id",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <NewsSummaryPage />
        </Layout>
      </Suspense>
    ),
  },
  {
  //   element: <ProtectedRoute />,
  //   children: [
  // {
    path: "/category",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <Layout>
          <CategoryPage />
        </Layout>
      </Suspense>
    ),
    children: [
      {
        path: "details/:categoryId",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <CategoryDetailPage />
          </Suspense>
        ),
      },
      {
        path: "details/:categoryId/:subCategoryId",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <CategoryDetailPage />
          </Suspense>
        ),
    //   },
    // ],
  },
    ],
  },
  // 없는 페이지 처리
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "/forbidden",
    element: (
      <Suspense fallback={<LoadingComponent />}>
        <ForbiddenPage />
      </Suspense>
    )
  }
];

export const router = createBrowserRouter(routes);