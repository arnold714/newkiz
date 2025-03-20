import { ReactNode } from 'react';
import background from '../../assets/images/background.png';


type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      {children}
    </div>
  );
};

export default Layout;
