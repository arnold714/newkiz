import React from 'react';

interface NotificationIconProps {
  type: 'like' | 'comment';
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  if (type === 'like') {
    return (
      <div className="mr-3 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="#f87171"
            stroke="#f87171"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <span className="text-xs text-gray-500 mt-1 ml-1">공감</span>
      </div>
    );
  }

  // comment 타입
  return (
    <div className="mr-3 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <span className="text-xs text-gray-500 mt-1 ml-1">댓글</span>
    </div>
  );
};

export default NotificationIcon;
