import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f8f3ec] flex">
      <Sidebar />
      <main className="flex-1 lg:ml-0">
        {/* Mobile Spacer */}
        <div className="lg:hidden h-16" />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
