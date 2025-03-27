import NavBar from './NavBar';
import { LayoutProps } from '@shared/types/common'

export const NoHeaderLayout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="overflow-y-auto">
                {children}
            </div>
            <NavBar />
        </div>
    );
};

