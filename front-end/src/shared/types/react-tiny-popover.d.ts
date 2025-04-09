declare module 'react-tiny-popover' {
    import * as React from 'react';
  
    export interface PopoverProps {
      isOpen: boolean;
      positions?: Array<'top' | 'bottom' | 'left' | 'right'>;
      content: React.ReactNode;
      children: React.ReactNode;
      padding?: number;
      onClickOutside?: () => void;
      // 필요에 따라 추가 props 정의 가능 
      containerStyle?: React.CSSProperties;
    }
  
    export const Popover: React.FC<PopoverProps>;
    export default Popover;
  }
  