export interface Notification {
    id: string;
    message: string;
    time: string;
    type: 'like' | 'comment';
  }

export type TabType = '알림' | '활동';