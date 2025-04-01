import { useState } from "react";
import { PiBell } from "react-icons/pi";
import { NotificationModal } from "@/pages/notification";
import { Link } from "react-router-dom";

const Header = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    const handleOpenNotification = () => {
        setIsNotificationOpen(true);
    };

    const handleCloseNotification = () => {
        setIsNotificationOpen(false);
    };

    return (
        <>
        <div className=" top-0 bg-white/80 w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-15 shadow-md flex items-center justify-between px-4">
            <Link to="/">
            <img src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/Logo.png" alt="Logo" 
                className=" w-20 h-10 m-2 relative" />
            </Link>
                <button
                    onClick={handleOpenNotification}
                    className="flex items-center justify-center p-2"
                    aria-label="알림 보기"
                >
                    <PiBell className="h-7 w-7 right-4 stroke-2 cursor-pointer"/>
                </button>
            </div>

            {/* 알림 모달 */}
            <NotificationModal 
                isOpen={isNotificationOpen} 
                onClose={handleCloseNotification} 
            />
        </>
    );
};

export default Header;