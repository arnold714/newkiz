import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <div className=" top-0 bg-white/80 w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-15 shadow-md flex items-center justify-between px-4">
            <Link to="/">
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/Logo.png" alt="Logo" 
                className=" w-20 h-10 m-2 relative" />
            </Link>
            </div>
        </>
    );
};

export default Header;