import Header from './Header';
import NavBar from './NavBar';
import { LayoutProps } from '../types/common';
import { CategoryModal } from '@/shared';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';


const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const path = location.pathname;

  const isOpen = useSelector((state: RootState) => state.category.categoryModal.isOpen);

  return (
    <div
      // 백그라운드 이미지가 필요한 페이지만 배경 처리
      className={`${(path === '/' || path === 'detail') ? `bg-[url(https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/background.png)] bg-repeat max-w-[var(--max-width)] min-w-[var(--min-width)] mx-auto bg-cover bg-center`: '' }`}>
      <Header /> 
      <div className="overflow-y-auto">
        {/* 카테고리 모달 */}
        {isOpen ?
          <CategoryModal /> :
          children
        }
      </div>
      <NavBar />
    </div>
  );
};

export default Layout;
