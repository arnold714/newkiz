import { LuMenu, LuCircleUserRound, LuSearch, LuHouse, LuNewspaper } from "react-icons/lu"
import { Link, useLocation } from "react-router-dom"

const NavBar = () => {
  const location = useLocation()
  const currentPath = location.pathname

  // 경로가 특정 문자열로 시작하는지 확인하는 함수
  const isPathStartsWith = (path: string): boolean => {
    return currentPath === path || currentPath.startsWith(`${path}/`)
  }

  return (
    <div className="fixed bottom-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-18 shadow-md flex justify-between items-center px-6 pb-1 z-10 border-t border-[#d4d4d4]">
      <Link className={`flex flex-col items-center cursor-pointer ${isPathStartsWith("/category") ? "text-blue-400" : ""}`} to="/category">
        <div className="h-7 flex items-center justify-center">
          <LuMenu className="w-7 h-7" />
        </div>
        <p className="text-xs mt-1">카테고리</p>
      </Link>

      <Link className={`flex flex-col items-center cursor-pointer ${isPathStartsWith("/reporter") ? "text-blue-400" : ""}`} to="/reporter">
        <div className="h-7 flex items-center justify-center">
          <LuNewspaper className="w-7 h-7" />
        </div>
        <p className="text-xs mt-1">기자단</p>
      </Link>

      <Link className={`flex flex-col items-center cursor-pointer ${currentPath === "/" ? "text-blue-400" : ""}`} to="/">
        <div className="h-7 flex items-center justify-center">
          <LuHouse className="w-7 h-7" />
        </div>
        <p className="text-xs mt-1">홈</p>
      </Link>

      <Link className={`flex flex-col items-center cursor-pointer ${isPathStartsWith("/search") ? "text-blue-400" : ""}`} to="/search">
        <div className="h-7 flex items-center justify-center">
          <LuSearch className="w-7 h-7" />
        </div>
        <p className="text-xs mt-1">검색</p>
      </Link>

      <Link className={`flex flex-col items-center cursor-pointer pr-2 ${isPathStartsWith("/mypage") ? "text-blue-400" : ""}`} to="/mypage">
        <div className="h-7 flex items-center justify-center">
          <LuCircleUserRound className="w-7 h-7" />
        </div>
        <p className="text-xs mt-1">마이</p>
      </Link>
    </div>
  )
}

export default NavBar
