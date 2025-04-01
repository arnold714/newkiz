import { PiBell } from "react-icons/pi";

const Header = () => {
    return (
        <div className=" top-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-15 opacity-80 shadow-md flex items-center justify-between px-4">
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/Logo.png" alt="Logo" 
                className=" w-20 h-10 m-2 relative" />
            <PiBell className="h-7 w-7 right-4 stroke-2 cursor-pointer"/>
        </div>
    );
};

export default Header;