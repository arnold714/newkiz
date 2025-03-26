import { LuMenu, LuCircleUserRound, LuSearch, LuHouse, LuNewspaper  } from "react-icons/lu";

const NavBar = () => {
    return (
        <div className="fixed bottom-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-18 shadow-md flex justify-around gap-x-5 items-center">
            <div className="flex flex-col items-center">
                <LuMenu  className="w-8 h-8"/>
                <p>메뉴</p>
            </div>
            
            <div className="flex flex-col items-center">
                <LuNewspaper className="w-8 h-8"/>
                <p>기자단</p>
            </div>
            <div className="flex flex-col items-center">
                <LuHouse className="w-8 h-8"/>
                <p>홈</p>
            </div>
            <div className="flex flex-col items-center">
                <LuSearch className="w-8 h-8"/>
                <p>검색</p>
            </div>
            <div className="flex flex-col items-center"> 
                <LuCircleUserRound  className="w-8 h-8"/>
                <p>마이페이지</p>
            </div>
            
        </div>
    );
};

export default NavBar;