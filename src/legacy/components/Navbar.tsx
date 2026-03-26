import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/peta', label: 'Peta' },
    { path: '/tentang', label: 'Tentang' },
    { path: '/hubungi-kami', label: 'Hubungi Kami' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#151515]/90 backdrop-blur-xl py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-sacred)' }}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 relative transition-transform duration-300 group-hover:rotate-12">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path
                  d="M20 2L4 12V28L20 38L36 28V12L20 2Z"
                  stroke={isScrolled ? '#c68e51' : '#c68e51'}
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 8L10 14V26L20 32L30 26V14L20 8Z"
                  stroke={isScrolled ? '#c68e51' : '#c68e51'}
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="4"
                  fill={isScrolled ? '#c68e51' : '#c68e51'}
                />
              </svg>
            </div>
            <span 
              className={`text-xl font-bold tracking-wide transition-all duration-300 group-hover:tracking-wider ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Desa Pujungan
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                  isScrolled ? 'text-white/90' : 'text-white/90'
                } hover:text-[#c68e51] group`}
              >
                {link.label}
                <span 
                  className={`absolute -bottom-1 left-1/2 h-0.5 bg-[#c68e51] transition-all duration-300 -translate-x-1/2 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#c68e51] text-[#151515] hover:bg-[#b07d45]'
                  : 'bg-[#c68e51] text-[#151515] hover:bg-[#b07d45]'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-elastic)' }}
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#151515]/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transitionTimingFunction: 'var(--ease-sacred)' }}
      >
        <div className="px-6 py-6 space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-white/90 hover:text-[#c68e51] text-lg font-medium transition-all duration-300"
              style={{ 
                animationDelay: `${index * 80}ms`,
                animation: isMobileMenuOpen ? 'slideUp 0.4s var(--ease-sacred) forwards' : 'none'
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-block mt-4 px-6 py-2.5 bg-[#c68e51] text-[#151515] text-sm font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
