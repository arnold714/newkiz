export interface Notification {
    id: string;
    message: string;
    time: string;
    isRead?: boolean;
    type?: 'alert' | 'activity';
  }
  
  export interface NotificationState {
    알림: Notification[];
    활동: Notification[];
    loading: boolean;
    error: string | null;
  }
  
  export type TabType = '알림' | '활동';