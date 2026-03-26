import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Landmark, 
  Tags, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Home
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/pura', label: 'Kelola Pura', icon: Landmark },
    { path: '/dashboard/kategori', label: 'Kategori', icon: Tags },
    { path: '/dashboard/admin', label: 'Admin', icon: Users },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#151515] z-50 flex items-center justify-between px-4 border-b border-white/10">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
              <path d="M20 2L4 12V28L20 38L36 28V12L20 2Z" stroke="#c68e51" strokeWidth="2" fill="none" />
              <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#c68e51" strokeWidth="1.5" fill="none" />
              <circle cx="20" cy="20" r="4" fill="#c68e51" />
            </svg>
          </div>
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'Bodoni Moda, serif' }}>
            Admin Panel
          </span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-[#151515] border-r border-white/10 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path d="M20 2L4 12V28L20 38L36 28V12L20 2Z" stroke="#c68e51" strokeWidth="2" fill="none" />
                <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" stroke="#c68e51" strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="4" fill="#c68e51" />
              </svg>
            </div>
            <div>
              <span 
                className="text-white font-bold text-lg block leading-tight"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Desa Pujungan
              </span>
              <span className="text-[#c68e51] text-xs">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#c68e51] flex items-center justify-center">
              <span className="text-[#151515] font-bold">
                {user?.nama.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.nama}</p>
              <p className="text-white/50 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                isActive(item.path)
                  ? 'bg-[#c68e51] text-[#151515]'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="flex-1">{item.label}</span>
              {isActive(item.path) && <ChevronRight size={16} />}
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
          >
            <Home size={20} />
            <span>Lihat Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Spacer for Desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0" />
    </>
  );
};

export default Sidebar;
