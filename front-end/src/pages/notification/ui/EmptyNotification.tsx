import React from 'react';

export const EmptyNotification: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <p className="text-gray-500 text-center">아직 받은 알림이 없습니다.</p>
    </div>
  );
};