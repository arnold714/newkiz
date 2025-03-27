import { ReactNode } from 'react';
import Header from './Header';
import NavBar from './NavBar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="bg-[url(https://newkiz.s3.ap-northeast-2.amazonaws.com/assets/background.png)] bg-repeat bg-[length:100%_100%]  max-w-[var(--max-width)] min-w-[var(--min-width)] mx-auto bg-cover bg-center bg-no-repeat"
    >
      <Header />
        <div className="min-h-screen overflow-y-auto pb-18">
          {children}
        </div>
      <NavBar />
    </div>
  );
};

export default Layout;
