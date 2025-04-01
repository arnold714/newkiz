import { useState } from 'react';
import { LuMenu, LuCircleUserRound, LuSearch, LuHouse, LuNewspaper } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const [isSelected, setIsSelected] = useState<string>("/");
    const location = useLocation();

    return (
        <div className="fixed bottom-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-18 shadow-md flex justify-between items-center px-6 pb-4">
            <Link
                className={`flex flex-col items-center cursor-pointer ${isSelected === 'category' ? 'text-blue-400' : ''}`}
                onClick={() => { setIsSelected('category'); }}
                to="/category"
            >
                <div className="h-7 flex items-center justify-center">
                    <LuMenu className="w-7 h-7" />
                </div>
                <p className="text-xs mt-1">카테고리</p>
            </Link>

            <Link
                className={`flex flex-col items-center cursor-pointer ${isSelected === 'reporter' && location.pathname === '/reporter' ? 'text-blue-400' : ''}`}
                onClick={() => { setIsSelected('reporter') }}
                to="/reporter"
            >
                <div className="h-7 flex items-center justify-center">
                    <LuNewspaper className="w-7 h-7" />
                </div>
                <p className="text-xs mt-1">기자단</p>
            </Link>

            <Link
                className={`flex flex-col items-center cursor-pointer ${isSelected === '/' && location.pathname === '/' ? 'text-blue-400' : ''}`}
                onClick={() => { setIsSelected('/') }}
                to="/"
            >
                <div className="h-7 flex items-center justify-center">
                    <LuHouse className="w-7 h-7" />
                </div>
                <p className="text-xs mt-1">홈</p>
            </Link>

            <Link
                className={`flex flex-col items-center cursor-pointer ${isSelected === 'search' && location.pathname === '/search' ? 'text-blue-400' : ''}`}
                onClick={() => { setIsSelected('search') }}
                to="/search"
            >
                <div className="h-7 flex items-center justify-center">
                    <LuSearch className="w-7 h-7" />
                </div>
                <p className="text-xs mt-1">검색</p>
            </Link>

            <Link
                className={`flex flex-col items-center cursor-pointer pr-2 ${isSelected === 'mypage' && location.pathname === '/mypage' ? 'text-blue-400' : ''}`}
                onClick={() => { setIsSelected('mypage') }}
                to="/mypage"
            >
                <div className="h-7 flex items-center justify-center">
                    <LuCircleUserRound className="w-7 h-7" />
                </div>
                <p className="text-xs mt-1">마이</p>
            </Link>
        </div>
    );
};

export default NavBar;
