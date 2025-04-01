import React, { useState, useEffect } from 'react';
import { TabType, Notification } from '@/pages/notification/model/NotificationModel';
import NotificationIcon from '@/pages/notification/ui/NotificationIcon';
import TabButton from '@/pages/notification/ui/TabButton';
import { LuChevronLeft, LuX } from "react-icons/lu";
import '@/pages/notification/styles/Notification.css';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  useEffect(() => {
    // 모달이 열려있을 때 body 스크롤 방지
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .overflow-wrap-anywhere {
        overflow-wrap: anywhere;
        word-break: break-word;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const [activeTab, setActiveTab] = useState<TabType>('알림');

  const [notifications, setNotifications] = useState<{
    알림: Notification[];
    활동: Notification[];
  }>({
    알림: [
      {
        id: '1',
        message: '뿡뿡이님이 회원님의 기사를 좋아합니다.',
        time: '1분 전',
        type: 'like',
      },
      {
        id: '2',
        message: '뿡뿡이님이 댓글을 남겼습니다: 재밌는 기사에요 ❤️',
        time: '3분 전',
        type: 'comment',
      },
    ],
    활동: [
      {
        id: '1',
        message: '[속보] 손흥민 레알마드리드 이적 "우승이 목표"... 글에 공감합니다',
        time: '1분 전',
        type: 'like',
      },
      {
        id: '2',
        message: '기사가 멋있네요~!',
        time: '3분 전',
        type: 'comment',
      },
    ],
  });

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((n) => n.id !== id),
    }));
  };

  const hasNotifications = notifications[activeTab].length > 0;

  if (!isOpen) return null;

  return (
    <div className="notification-modal-overlay">
      <div className="notification-modal">
        <div className="w-full p-2">
          {/* Header 영역 */}
          <div className="flex items-center p-2 w-full">
            <button onClick={onClose} className="p-1">
              <LuChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-medium flex-1 text-center">알림</h2>
            <div className="w-8" />
          </div>

          {/* 탭 선택 영역 */}
          <div className="flex border-b w-full border-[#BDBDBD]">
            <TabButton
              isActive={activeTab === '알림'}
              onClick={() => setActiveTab('알림')}
              label="알림"
            />
            <TabButton
              isActive={activeTab === '활동'}
              onClick={() => setActiveTab('활동')}
              label="활동"
            />
          </div>

          {/* 알림 목록 */}
          {hasNotifications ? (
            <div className="notification-scroll-area w-full">
              {notifications[activeTab].map((notification) => (
                <div key={notification.id} className="flex items-start p-3 w-full overflow-hidden">
                  <NotificationIcon type={notification.type} />
                  <div className="flex-1 min-w-0 ml-3">
                    <p className="text-sm break-words overflow-wrap-anywhere">
                      {notification.message}
                    </p>
                    <div className="flex flex-col mt-1">
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                      <div className="w-full border-b border-[#BDBDBD] mt-3" style={{ width: '100vw', marginLeft: '-16px' }} />
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0 ml-3"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <LuX size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-16">
              <p className="text-gray-500 text-center">
                아직 받은 알림이 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}