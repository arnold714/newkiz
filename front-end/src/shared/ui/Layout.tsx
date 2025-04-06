import Header from './Header';
import NavBar from './NavBar';
import { LayoutProps } from '../types/common';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  const showBackground =
    pathname === "/" ||
    pathname.startsWith("/reporter") ||
    pathname.startsWith("/category");

  return (
    <div className={`${showBackground ? `
      bg-[url(https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/background.png)]
      bg-repeat bg-cover bg-center
      max-w-[var(--max-width)] min-w-[var(--min-width)] mx-auto
    ` : ''} h-screen flex flex-col`}>
      <Header /> 
      <div>
        {children}
      </div>
      <NavBar />
    </div>
  );
};

export default Layout;
