import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/peta', label: 'Peta' },
    { path: '/tentang', label: 'Tentang' },
    { path: '/hubungi-kami', label: 'Hubungi Kami' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-[#151515] text-white overflow-hidden">
      {/* Background Texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/footer-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/95 to-[#151515]/90" />
      
      {/* Top Gradient Line */}
      <div className="relative h-1 w-full bg-gradient-to-r from-transparent via-[#c68e51] to-transparent" />
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="w-full px-6 lg:px-12 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Column 1: Logo & Description */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 relative transition-transform duration-300 group-hover:rotate-12">
                  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                    <path
                      d="M20 2L4 12V28L20 38L36 28V12L20 2Z"
                      stroke="#c68e51"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M20 8L10 14V26L20 32L30 26V14L20 8Z"
                      stroke="#c68e51"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="20" cy="20" r="4" fill="#c68e51" />
                  </svg>
                </div>
                <span 
                  className="text-xl font-bold tracking-wide text-white"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  Desa Pujungan
                </span>
              </Link>
              
              <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                Melestarikan warisan spiritual Bali untuk generasi mendatang. 
                Temukan kedamaian dan kebijaksanaan di setiap sudut desa kami.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-[#c68e51] hover:border-[#c68e51] transition-all duration-300 hover:scale-110 hover:rotate-6"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h3 
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Tautan Cepat
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-[#c68e51] text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-6">
              <h3 
                className="text-lg font-bold text-white"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Hubungi Kami
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#c68e51] mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">
                    Jl. Raya Pujungan No. 1, Kubu,<br />
                    Karangasem, Bali 80853
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-[#c68e51] flex-shrink-0" />
                  <a 
                    href="tel:+62361123456" 
                    className="text-white/70 hover:text-[#c68e51] text-sm transition-colors"
                  >
                    +62 361 123456
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-[#c68e51] flex-shrink-0" />
                  <a 
                    href="mailto:info@desapujungan.bali" 
                    className="text-white/70 hover:text-[#c68e51] text-sm transition-colors"
                  >
                    info@desapujungan.bali
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="w-full px-6 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} Desa Pujungan. All rights reserved.
              </p>
              <p className="text-white/50 text-sm italic">
                Dibuat dengan hormat untuk tradisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
