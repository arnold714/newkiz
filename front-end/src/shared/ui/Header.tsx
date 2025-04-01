import { PiBell } from "react-icons/pi";

const Header = () => {
    return (
        <div className=" top-0 bg-white/80 w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-20 shadow-md flex items-center justify-between px-3">
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/Logo.png" alt="Logo" 
                className=" w-30 h-15 m-2 relative" />
            <PiBell className="h-10 w-10 right-4"/>
        </div>
    );
};

export default Header;