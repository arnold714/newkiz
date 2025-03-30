import { useState } from 'react';
import { LuMenu, LuCircleUserRound, LuSearch, LuHouse, LuNewspaper  } from "react-icons/lu";
import { Link } from "react-router-dom";
import MenuModal from '@/shared/ui/MenuModal';

const NavBar = () => {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    const openMenuModal = () => {
        setIsMenuModalOpen(true);
    };

    const closeMenuModal = () => {
        setIsMenuModalOpen(false);
    };
    return (
        <>
            <div className="fixed bottom-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-18 shadow-md flex justify-around gap-x-5 items-center">
                <div className="flex flex-col items-center cursor-pointer" onClick={openMenuModal}>
                    <LuMenu className="w-8 h-8" />
                    <p>메뉴</p>
                </div>
                
                <div className="flex flex-col items-center cursor-pointer">
                    <LuNewspaper className="w-8 h-8" />
                    <p>기자단</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                    <Link to="/">
                        <LuHouse className="w-8 h-8" />
                    </Link>
                    <p>홈</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer">
                    <LuSearch className="w-8 h-8" />
                    <p>검색</p>
                </div>
                <div className="flex flex-col items-center cursor-pointer"> 
                    <LuCircleUserRound className="w-8 h-8" />
                    <p>마이페이지</p>
                </div>
            </div>

            {/* 메뉴 모달 */}
            {isMenuModalOpen && <MenuModal onClose={closeMenuModal} />}
        </>
    );
};

export default NavBar
