import { useEffect } from 'react';
import { MapPin, Users, Calendar, Landmark } from 'lucide-react';

const About = () => {
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

  const stats = [
    { icon: Landmark, value: '8', label: 'Pura Suci' },
    { icon: Users, value: '3,500+', label: 'Penduduk' },
    { icon: Calendar, value: '11', label: 'Abad Sejarah' },
    { icon: MapPin, value: '15', label: 'Km² Wilayah' },
  ];

  const values = [
    {
      title: 'Tri Hita Karana',
      description: 'Tiga penyebab kebahagiaan: harmoni dengan Tuhan, manusia, dan alam. Filosofi ini menjadi panduan hidup masyarakat Desa Pujungan.',
    },
    {
      title: 'Desa Kala Patra',
      description: 'Kesadaran untuk menyesuaikan diri dengan tempat, waktu, dan keadaan. Kami selalu menghormati konteks dalam setiap kegiatan.',
    },
    {
      title: 'Sradha Bhakti',
      description: 'Kesetiaan dan pengabdian kepada yang Maha Kuasa. Setiap upacara adalah ekspresi ketulusan hati kami.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f3ec]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pb-32 bg-[#151515] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/hero-temple.jpg"
            alt="Desa Pujungan"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#151515]/80 via-[#151515]/90 to-[#151515]" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              Tentang Kami
            </span>
            <h1 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Desa Pujungan
            </h1>
            <p className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
              Sebuah desa yang terletak di Kecamatan Kubu, Kabupaten Karangasem, 
              Bali, yang kaya akan warisan spiritual dan budaya Hindu-Bali.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-16 z-20">
        <div className="w-full px-6 lg:px-12">
          <div className="bg-[#c68e51] grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 p-8 text-center border-r border-[#151515]/10 last:border-r-0"
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <stat.icon size={28} className="mx-auto mb-3 text-[#151515]" />
                <p 
                  className="text-3xl md:text-4xl font-bold text-[#151515]"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-[#151515]/80 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-on-scroll opacity-0 -translate-x-8 transition-all duration-1000">
              <img
                src="/images/history-carving.jpg"
                alt="Sejarah Desa Pujungan"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
            </div>
            
            <div>
              <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
                Sejarah
              </span>
              <h2 
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-[#151515] mt-4 mb-8"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Akar Sejarah yang Dalam
              </h2>
              
              <div className="space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <p className="text-[#3c3c3c] leading-relaxed">
                  Desa Pujungan memiliki sejarah yang panjang, bermula dari abad ke-11 
                  ketika seorang resi dari Kerajaan Gelgel menemukan tempat ini sebagai 
                  lokasi yang sangat cocok untuk bersemadi. Nama "Pujungan" sendiri 
                  berasal dari kata "puja" yang berarti sembahyang atau persembahan.
                </p>
                
                <p className="text-[#3c3c3c] leading-relaxed">
                  Selama berabad-abad, desa ini berkembang menjadi pusat keagamaan yang 
                  penting di wilayah timur Bali. Banyak pura-pura bersejarah dibangun 
                  di sini, masing-masing dengan cerita dan signifikansi spiritualnya 
                  sendiri.
                </p>
                
                <p className="text-[#3c3c3c] leading-relaxed">
                  Masyarakat Desa Pujungan hingga kini masih memegang teguh tradisi 
                  dan adat istiadat leluhur. Setiap upacara keagamaan dilaksanakan 
                  dengan penuh khidmat, mengikuti aturan-aturan yang telah diturunkan 
                  dari generasi ke generasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              Nilai-Nilai
            </span>
            <h2 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-[#151515] mt-4"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Filosofi Hidup Kami
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 bg-[#f8f3ec] p-8 hover:shadow-xl transition-shadow"
                style={{ transitionDelay: `${index * 150 + 300}ms` }}
              >
                <div className="w-12 h-12 bg-[#c68e51] flex items-center justify-center mb-6">
                  <span className="text-[#151515] font-bold text-xl">
                    {index + 1}
                  </span>
                </div>
                <h3 
                  className="text-xl font-bold text-[#151515] mb-4"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  {value.title}
                </h3>
                <p className="text-[#3c3c3c] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Geography Section */}
      <section className="py-20 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
                Geografi
              </span>
              <h2 
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-[#151515] mt-4 mb-8"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Lokasi dan Geografi
              </h2>
              
              <div className="space-y-6 reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
                <p className="text-[#3c3c3c] leading-relaxed">
                  Desa Pujungan terletak di bagian timur laut Kabupaten Karangasem, 
                  dengan ketinggian rata-rata 150-450 meter di atas permukaan laut. 
                  Wilayahnya berbatasan dengan:
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#c68e51] mt-2 flex-shrink-0" />
                    <span className="text-[#3c3c3c]"><strong>Utara:</strong> Desa Tianyar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#c68e51] mt-2 flex-shrink-0" />
                    <span className="text-[#3c3c3c]"><strong>Timur:</strong> Laut Bali</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#c68e51] mt-2 flex-shrink-0" />
                    <span className="text-[#3c3c3c]"><strong>Selatan:</strong> Desa Kubu</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#c68e51] mt-2 flex-shrink-0" />
                    <span className="text-[#3c3c3c]"><strong>Barat:</strong> Desa Ban</span>
                  </li>
                </ul>
                
                <p className="text-[#3c3c3c] leading-relaxed">
                  Keberadaan lereng-lereng bukit dan dekatnya dengan pantai menciptakan 
                  pemandangan alam yang indah dan beragam. Iklimnya sejuk dengan curah 
                  hujan yang cukup, mendukung pertanian dan kehidupan masyarakat yang 
                  subur.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 reveal-on-scroll opacity-0 translate-x-8 transition-all duration-1000">
              <img
                src="/images/pura-luhur.jpg"
                alt="Pemandangan Desa Pujungan"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 lg:py-32 bg-[#151515] text-white">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              Budaya
            </span>
            <h2 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Warisan Budaya
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 border border-white/20 p-8">
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Seni dan Kerajinan
              </h3>
              <p className="text-white/70 leading-relaxed">
                Masyarakat Desa Pujungan terkenal dengan keahlian mereka dalam 
                ukiran batu, anyaman, dan seni pertunjukan tradisional seperti 
                gamelan dan tari-tarian sakral.
              </p>
            </div>
            
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300 border border-white/20 p-8">
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Upacara Adat
              </h3>
              <p className="text-white/70 leading-relaxed">
                Setiap tahun, desa ini menyelenggarakan berbagai upacara adat 
                besar seperti Odalan, Ngaben, dan Melasti yang menarik pengunjung 
                dari berbagai daerah.
              </p>
            </div>
            
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-400 border border-white/20 p-8">
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Kuliner Tradisional
              </h3>
              <p className="text-white/70 leading-relaxed">
                Hidangan khas Desa Pujungan mencerminkan kekayaan bahan pangan 
                lokal, dengan olahan beras, kelapa, dan rempah-rempah yang 
                khas dari wilayah timur Bali.
              </p>
            </div>
            
            <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-500 border border-white/20 p-8">
              <h3 
                className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Arsitektur
              </h3>
              <p className="text-white/70 leading-relaxed">
                Rumah-rumah adat dan pura di desa ini mempertahankan gaya 
                arsitektur tradisional Bali dengan ukiran-ukiran yang indah 
                dan tata letak yang mengikuti aturan Asta Kosala Kosali.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) !important;
        }
      `}</style>
    </main>
  );
};

export default About;
