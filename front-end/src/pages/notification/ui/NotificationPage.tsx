// pages/notification/ui/NotificationPage.tsx
import React, { useState } from 'react';
import { TabType, Notification } from '../model/NotificationModel';
import NotificationIcon from './NotificationIcon';
import TabButton from './TabButton';

const NotificationPage: React.FC = () => {
  // 전역 스타일 등록 (word-break 관련만 유지)
  React.useEffect(() => {
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

  // 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('알림');

  // 알림 목록
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

  // 알림 삭제
  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].filter((n) => n.id !== id),
    }));
  };

  // 현재 탭에 알림이 있는지
  const hasNotifications = notifications[activeTab].length > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full p-2">
        {/* 헤더 영역 */}
        <div className="flex items-center p-2 w-full">
          <button className="p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h2 className="text-lg font-medium flex-1 text-center">알림</h2>
          <div className="w-8" />
        </div>

        {/* 탭 선택 영역 */}
        <div className="flex border-b w-full">
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
          <div className="w-full">
            {notifications[activeTab].map((notification) => (
              <div
                key={notification.id}
                className="flex items-start p-3 border-b w-full overflow-hidden"
              >
                <NotificationIcon type={notification.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm break-words overflow-wrap-anywhere">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  onClick={() => handleDeleteNotification(notification.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          // 알림이 없을 때
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-500 text-center">
              아직 받은 알림이 없습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;