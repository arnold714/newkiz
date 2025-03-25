import { ReactNode } from 'react';
import Header from './Header';
import NavBar from './NavBar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="bg-[url(https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/background.png)] w-screen max-w-[var(--max-width)] min-w-[var(--min-width)] mx-auto h-screen bg-cover bg-center bg-no-repeat"
    >
      <Header />
        <div>
          {children}
        </div>
      <NavBar />
    </div>
  );
};

export default Layout;
