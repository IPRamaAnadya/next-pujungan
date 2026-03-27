import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Jl. Raya Pujungan No. 1, Pupuan, Tabanan, Bali 80853',
      link: null,
    },
    {
      icon: Phone,
      title: 'Telepon',
      content: '+62 361 123456',
      link: 'tel:+62361123456',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@desapujungan.bali',
      link: 'mailto:info@desapujungan.bali',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Minggu: 08.00 - 17.00 WITA',
      link: null,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8f3ec]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#151515]">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/cta-background.jpg"
            alt="Contact Desa Pujungan"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#151515]/80 via-[#151515]/90 to-[#151515]" />
        
        <div className="relative z-10 w-full px-6 lg:px-12">
          <div className="max-w-4xl">
            <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              Hubungi Kami
            </span>
            <h1 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Mari Terhubung
            </h1>
            <p className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 text-white/70 text-lg leading-relaxed max-w-2xl">
              Punya pertanyaan tentang Desa Pujungan atau ingin mengunjungi pura-pura kami? 
              Jangan ragu untuk menghubungi kami.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <div>
              <h2 
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl md:text-4xl font-bold text-[#151515] mb-8"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Informasi Kontak
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 flex items-start gap-4 p-6 bg-white shadow-md hover:shadow-lg transition-shadow"
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="w-12 h-12 bg-[#c68e51] flex items-center justify-center flex-shrink-0">
                      <info.icon size={22} className="text-[#151515]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#151515] mb-1">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-[#3c3c3c] hover:text-[#c68e51] transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-[#3c3c3c]">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Preview */}
              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-600 mt-8">
                <div className="bg-white shadow-lg overflow-hidden">
                  <div className="h-64 bg-[#e5e5e5] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="mx-auto mb-4 text-[#c68e51]" />
                      <p className="text-[#3c3c3c] font-medium">Desa Pujungan</p>
                      <p className="text-[#888888] text-sm">Pupuan, Tabanan, Bali</p>
                      <a
                        href="https://www.google.com/maps/search/Desa+Pujungan,+Pupuan,+Tabanan,+Bali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-[#c68e51] hover:underline text-sm"
                      >
                        Buka di Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-3xl md:text-4xl font-bold text-[#151515] mb-8"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Kirim Pesan
              </h2>

              <div className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200 bg-white shadow-lg p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#151515] mb-2">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-[#888888]">
                      Terima kasih telah menghubungi kami. Kami akan membalas segera.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-[#c68e51] hover:underline"
                    >
                      Kirim pesan lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#151515] font-medium">
                          Nama Lengkap
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Masukkan nama Anda"
                          className="border-[#c0c0c0] focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#151515] font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@anda.com"
                          className="border-[#c0c0c0] focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-[#151515] font-medium">
                        Subjek
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subjek pesan"
                        className="border-[#c0c0c0] focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#151515] font-medium">
                        Pesan
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tulis pesan Anda di sini..."
                        rows={6}
                        className="border-[#c0c0c0] focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#c68e51] hover:bg-[#b07d45] text-[#151515] font-medium py-6 rounded-none transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-[#151515] border-t-transparent rounded-full animate-spin" />
                          Mengirim...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send size={18} />
                          Kirim Pesan
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="w-full px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-[#c68e51] text-sm tracking-[3px] uppercase font-medium">
              FAQ
            </span>
            <h2 
              className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 text-3xl md:text-4xl font-bold text-[#151515] mt-4"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Pertanyaan Umum
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'Apakah wisatawan diperbolehkan masuk ke pura?',
                a: 'Ya, wisatawan diperbolehkan mengunjungi sebagian besar pura di Desa Pujungan. Namun, diharapkan untuk menghormati aturan berpakaian dan etika saat berada di area suci.',
              },
              {
                q: 'Apa saja aturan berpakaian yang harus diikuti?',
                a: 'Pengunjung diharuskan mengenakan pakaian yang sopan. Wanita disarankan mengenakan rok panjang (kain sarung tersedia di lokasi), dan semua pengunjung harus menutupi bahu.',
              },
              {
                q: 'Kapan waktu terbaik untuk berkunjung?',
                a: 'Waktu terbaik untuk berkunjung adalah pagi hari (08.00-11.00) atau sore hari (15.00-17.00) ketika cuaca lebih sejuk dan cahaya lebih baik untuk fotografi.',
              },
              {
                q: 'Apakah ada biaya masuk?',
                a: 'Sebagian besar pura tidak memungut biaya masuk, namun donasi sukarela sangat dihargai untuk pemeliharaan pura. Beberapa pura khusus mungkin memiliki biaya retribusi kecil.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="reveal-on-scroll opacity-0 translate-y-8 transition-all duration-700 border border-[#e5e5e5] p-6 hover:border-[#c68e51] transition-colors"
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <h3 className="font-bold text-[#151515] mb-2">{faq.q}</h3>
                <p className="text-[#3c3c3c]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </main>
  );
};

export default Contact;
