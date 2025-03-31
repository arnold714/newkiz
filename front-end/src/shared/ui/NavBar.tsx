import { useEffect, useState } from 'react';
import { LuMenu, LuCircleUserRound, LuSearch, LuHouse, LuNewspaper } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import MenuModal from '@/shared/ui/MenuModal';

const NavBar = () => {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const location = useLocation();

    const openMenuModal = () => {
        setIsMenuModalOpen(true);
    };

    useEffect(()=>{
        console.log("isMenuModalOpen: ", isMenuModalOpen)
    }, [isMenuModalOpen])

    return (
        <>
            <div className="fixed bottom-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-18 shadow-md flex justify-evenly items-center">
                <div 
                    className={`flex flex-col items-center cursor-pointer ${isMenuModalOpen ? 'text-blue-400' : ''}`} 
                    onClick={()=>{setIsMenuModalOpen(true)}}
                >
                    <div className="h-7 flex items-center justify-center">
                        <LuMenu className="w-7 h-7" />
                    </div>
                    <p className="text-xs mt-1">카테고리</p>
                </div>
                
                <Link 
                    className={`flex flex-col items-center cursor-pointer ${!isMenuModalOpen && location.pathname === '/reporter' ? 'text-blue-400' : ''}`} 
                    to="/reporter"
                >
                    <div className="h-7 flex items-center justify-center">
                        <LuNewspaper className="w-7 h-7" />
                    </div>
                    <p className="text-xs mt-1">기자단</p>
                </Link>
                
                <Link 
                    className={`flex flex-col items-center cursor-pointer ${!isMenuModalOpen && location.pathname === '/' ? 'text-blue-400' : ''}`} 
                    to="/"
                >
                    <div className="h-7 flex items-center justify-center">
                        <LuHouse className="w-7 h-7" />
                    </div>
                    <p className="text-xs mt-1">홈</p>
                </Link>
                
                <Link 
                    className={`flex flex-col items-center cursor-pointer ${!isMenuModalOpen && location.pathname === '/search' ? 'text-blue-400' : ''}`} 
                    to="/search"
                >
                    <div className="h-7 flex items-center justify-center">
                        <LuSearch className="w-7 h-7" />
                    </div>
                    <p className="text-xs mt-1">검색</p>
                </Link>
                
                <Link 
                    className={`flex flex-col items-center cursor-pointer ${!isMenuModalOpen && location.pathname === '/mypage' ? 'text-blue-400' : ''}`} 
                    to="/mypage"
                > 
                    <div className="h-7 flex items-center justify-center">
                        <LuCircleUserRound className="w-7 h-7" />
                    </div>
                    <p className="text-xs mt-1">마이</p>
                </Link>
            </div>

            {/* 메뉴 모달 */}
            {isMenuModalOpen && <MenuModal onClose={()=>{setIsMenuModalOpen(false)}} />}
        </>
    );
};

export default NavBar;
