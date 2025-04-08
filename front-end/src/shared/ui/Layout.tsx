import Header from './Header';
import NavBar from './NavBar';
import { LayoutProps } from '../types/common';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const imgUrl: string = import.meta.env.VITE_AWS_S3_BASE_URL;

  const showBackground =
    pathname === "/" ||
    pathname.startsWith("/reporter") ||
    pathname.startsWith("/category");

  const showHeader = !pathname.startsWith("/search/");

  return (
    <div className={`${showBackground ? `
      bg-[url(${imgUrl}assets/background.png)]
      bg-repeat bg-cover bg-center
      max-w-[var(--max-width)] min-w-[var(--min-width)] mx-auto
    ` : ''} h-screen flex flex-col`}>
      {showHeader && <Header />} 
      <div>
        {children}
      </div>
      <NavBar />
    </div>
  );
};

export default Layout;
