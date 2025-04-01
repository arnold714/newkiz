import { useState } from "react";
import { PiBell } from "react-icons/pi";
import { NotificationModal } from "@/pages/notification";

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
            <div className="top-0 bg-white w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] h-20 opacity-80 shadow-md flex items-center justify-between px-3">
                <img 
                    src="https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/Logo.png" 
                    alt="Logo" 
                    className="w-30 h-15 m-2 relative" 
                />
                <button
                    onClick={handleOpenNotification}
                    className="flex items-center justify-center p-2"
                    aria-label="알림 보기"
                >
                    <PiBell className="h-10 w-10" />
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