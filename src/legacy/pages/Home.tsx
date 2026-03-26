import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import templesData from '../data/temples.json';

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Get first 6 temples for showcase
  const showcaseTemples = templesData.pura.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-temple.jpg"
            alt="Desa Pujungan Temple"
            className="w-full h-full object-cover scale-110 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#151515]/80 via-[#151515]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 via-transparent to-[#151515]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-12 pt-24">
          <div className="max-w-3xl">
            {/* Pre-title */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100">
              <span className="text-[#c68e51] text-sm tracking-[4px] uppercase font-medium">
                Welcome to
              </span>
            </div>

            {/* Title */}
            <h1 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mt-4 mb-2"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Desa Pujungan
            </h1>

            {/* Subtitle */}
            <p className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 text-xl md:text-2xl text-white/80 italic mb-6">
              Kubu, Karangasem, Bali
            </p>

            {/* Description */}
            <p className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400 text-white/70 text-lg leading-relaxed max-w-xl mb-10">
              Experience the spiritual heart of Bali through our sacred temples 
              and timeless traditions. Discover peace in every corner of our village.
            </p>

            {/* CTA Button */}
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500">
              <Link
                to="/peta"
                className="inline-flex items-center gap-3 bg-[#c68e51] text-[#151515] px-8 py-4 font-medium text-sm tracking-wide hover:bg-[#b07d45] transition-all duration-300 group"
              >
                Explore Temples
                <ArrowRight 
                  size={18} 
                  className="transition-transform duration-300 group-hover:translate-x-2" 
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* History Section */}
      <section 
        ref={historyRef}
        className="relative py-20 lg:py-32 bg-[#f8f3ec] overflow-hidden"
      >
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal-on-scroll opacity-0 -translate-x-8 transition-all duration-1000 relative">
              <div className="relative">
                <img
                  src="/images/history-carving.jpg"
                  alt="Ancient Balinese Stone Carving"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                  style={{ clipPath: 'polygon(0 0, 95% 0, 100% 100%, 0 100%)' }}
                />
                {/* Decorative Gold Line */}
                <div className="absolute -right-4 top-1/4 w-1 h-1/2 bg-gradient-to-b from-transparent via-[#c68e51] to-transparent" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 lg:right-12 bg-[#c68e51] text-[#151515] p-6 shadow-xl">
                <p className="text-4xl font-bold" style={{ fontFamily: 'Bodoni Moda, serif' }}>11</p>
                <p className="text-sm font-medium">Abad Sejarah</p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700">
                <span className="text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
                  Sejarah
                </span>
              </div>
              
              <h2 
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mt-4 mb-8"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Sejarah Desa Pujungan
              </h2>

              <div className="space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <p className="text-[#3c3c3c] leading-relaxed">
                  For centuries, Desa Pujungan has stood as a guardian of Bali's spiritual 
                  heritage. Our temples have witnessed the ebb and flow of generations, 
                  each stone carving telling stories of devotion, artistry, and the eternal 
                  dance between the seen and unseen worlds.
                </p>
                
                <p className="text-[#3c3c3c] leading-relaxed">
                  The village takes its name from the ancient practice of 'pujungan' - 
                  the sacred offering ceremonies that have been performed here since the 
                  time of our ancestors. Today, we continue these traditions, inviting 
                  visitors to experience the profound peace that comes from connecting 
                  with something greater than themselves.
                </p>
              </div>

              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 mt-10">
                <Link
                  to="/tentang"
                  className="inline-flex items-center gap-2 text-[#c68e51] font-medium hover:gap-4 transition-all duration-300 group"
                >
                  Read Our Full History
                  <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Showcase Section */}
      <section 
        ref={showcaseRef}
        className="relative py-20 lg:py-32 bg-[#f8f3ec]"
      >
        <div className="w-full px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              Jelajahi
            </span>
            <h2 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] mt-4"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Sacred Spaces
            </h2>
            <p className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 text-[#888888] text-lg mt-4 max-w-2xl mx-auto">
              Discover the temples that have made Desa Pujungan a spiritual destination 
              for centuries
            </p>
          </div>

          {/* Temple Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseTemples.map((temple, index) => (
              <div
                key={temple.uuid}
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 group"
                style={{ 
                  transitionDelay: `${(index % 3) * 150 + 300}ms`,
                  transform: index % 3 === 1 ? 'translateY(40px)' : index % 3 === 2 ? 'translateY(80px)' : 'translateY(0)'
                }}
              >
                <Link to={`/pura/${temple.uuid}`} className="block">
                  <div className="relative overflow-hidden bg-white shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={temple.foto_url}
                        alt={temple.nama_pura}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 -mt-4 relative bg-white mx-4">
                      <h3 
                        className="text-xl font-bold text-[#151515] mb-2 group-hover:text-[#c68e51] transition-colors"
                        style={{ fontFamily: 'Bodoni Moda, serif' }}
                      >
                        {temple.nama_pura}
                      </h3>
                      <p 
                        className="text-[#888888] text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ 
                          __html: temple.deskripsi.replace(/<[^>]*>/g, '').substring(0, 100) + '...' 
                        }}
                      />
                      <div className="mt-4 flex items-center gap-2 text-[#c68e51] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        See Detail
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-700 text-center mt-16">
            <Link
              to="/peta"
              className="inline-flex items-center gap-3 border-2 border-[#151515] text-[#151515] px-8 py-4 font-medium text-sm tracking-wide hover:bg-[#151515] hover:text-white transition-all duration-300 group"
            >
              View All Temples on Map
              <ArrowRight 
                size={18} 
                className="transition-transform duration-300 group-hover:translate-x-2" 
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/cta-background.jpg"
            alt="Temple at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#151515]/80" />
        </div>

        {/* Decorative Corner Frames */}
        <div className="absolute top-12 left-12 w-16 h-16 border-l-2 border-t-2 border-[#c68e51]/50" />
        <div className="absolute top-12 right-12 w-16 h-16 border-r-2 border-t-2 border-[#c68e51]/50" />
        <div className="absolute bottom-12 left-12 w-16 h-16 border-l-2 border-b-2 border-[#c68e51]/50" />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-r-2 border-b-2 border-[#c68e51]/50" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 lg:px-12 text-center">
          <h2 
            className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'Bodoni Moda, serif' }}
          >
            Begin Your Spiritual Journey
          </h2>
          <p className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-200 text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Let the ancient wisdom of Desa Pujungan guide your path
          </p>
          <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-1000 delay-300">
            <Link
              to="/hubungi-kami"
              className="inline-flex items-center gap-3 bg-[#c68e51] text-[#151515] px-10 py-4 font-medium text-sm tracking-wide hover:bg-[#b07d45] transition-all duration-300 hover:scale-105"
              style={{ boxShadow: '0 0 40px rgba(198, 142, 81, 0.3)' }}
            >
              Plan Your Visit
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
        
        @keyframes ken-burns {
          0% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-ken-burns {
          animation: ken-burns 20s ease-out forwards;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

export default Home;
