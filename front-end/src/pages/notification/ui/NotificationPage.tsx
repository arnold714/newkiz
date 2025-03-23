import React, { useState } from 'react';

type TabType = '알림' | '활동';

interface Notification {
  id: string;
  message: string;
  time: string;
}

const NotificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('알림');
  const [notifications, setNotifications] = useState<{
    알림: Notification[];
    활동: Notification[];
  }>({
    알림: [
      { id: '1', message: '뿡뿡이님이 회원님의 기사를 좋아합니다.', time: '1분 전' },
      { id: '2', message: '뿡뿡이님이 댓글을 남겼습니다: 재밌는 기사에요 ❤️', time: '3분 전' },
    ],
    활동: [
      { id: '1', message: '[속보] 손흥민 레알마드리드 이적 "우승이 목표"... 글에 공감합니다', time: '1분 전' },
      { id: '2', message: '기사가 멋있네요~!', time: '3분 전' },
    ],
  });

  const handleDeleteNotification = (id: string) => {
    setNotifications({
      ...notifications,
      [activeTab]: notifications[activeTab].filter((notification) => notification.id !== id),
    });
  };

  const hasNotifications = notifications[activeTab].length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-md">
        {/* 탭 선택 영역 */}
        <div className="flex border-b">
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

        <div className="p-2">
          {/* 헤더 영역 */}
          <div className="flex items-center p-2">
            <button className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 className="text-lg font-medium flex-1 text-center">알림</h2>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>

          {/* 알림 목록 또는 빈 상태 */}
          {hasNotifications ? (
            <div className="space-y-2">
              {notifications[activeTab].map((notification) => (
                <div key={notification.id} className="flex items-start p-3 border-b">
                  <div className="mr-2 mt-1">
                    <input type="radio" className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600" 
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center py-16">
              <p className="text-gray-500 text-center">아직 받은 알림이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label }) => {
  return (
    <button
      className={`flex-1 py-3 text-center ${
        isActive ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default NotificationPage;