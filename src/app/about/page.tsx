import Image from "next/image";
import { PublicLayout } from "@/components/public/PublicLayout";

export default function AboutPage() {
  return (
    <PublicLayout>
      <main className="bg-[#f8f3ec]">
        <section className="relative isolate overflow-hidden bg-[#151515] py-20 lg:py-28">
          <Image
            src="/images/hero-temple.jpg"
            alt="Desa Pujungan"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#151515]/80 via-[#151515]/90 to-[#151515]" />
          <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
            <p data-aos="fade-up" className="text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Tentang Kami</p>
            <h1 data-aos="fade-up" data-aos-delay="100" className="mt-4 max-w-3xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">Desa Pujungan</h1>
            <p data-aos="fade-up" data-aos-delay="200" className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
             Desa Adat Pujungan terletak di lereng Gunung Batukaru dengan warisan pura, tradisi sakral, dan kehidupan adat yang tetap terjaga secara turun-temurun.
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div data-aos="fade-right" className="relative h-80 overflow-hidden shadow-xl lg:h-[500px]">
            <Image
              src="/images/history-carving.jpg"
              alt="Sejarah Desa Pujungan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div data-aos="fade-left">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Sejarah</p>
            <h2 className="mt-3 text-3xl font-bold text-[#151515] md:text-4xl">Akar Sejarah yang Dalam</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#3c3c3c] md:text-base">
              <p>
                Desa Pujungan berada di Kecamatan Pupuan, Kabupaten Tabanan, Provinsi Bali, tepatnya di lereng barat daya Gunung Batukaru. Wilayahnya seluas sekitar 22,12 km2, didominasi sawah terasering, perkebunan kopi, dan hutan tropis. Letaknya berbatasan dengan Kabupaten Buleleng di utara, dengan akses sekitar dua jam perjalanan dari Denpasar maupun jalur Gilimanuk.
              </p>
              <p>
                Secara sosial, Pujungan terdiri dari enam banjar utama: Tamansari, Margasari, Mekarsari, Puspasari, Merthasari, dan Tibu Dalem yang berada di luar komplek desa. Sebagian besar masyarakat menggantungkan hidup pada sektor pertanian dan perkebunan yang menjadi fondasi ekonomi desa.
              </p>
              <p>
                Sejarah Desa Pujungan hidup melalui tutur para sesepuh. Kisahnya berawal pada masa Kerajaan Bali Kuno sekitar abad ke-12, saat Raja Ida Sri Jaya Bali mengutus dua patih setianya, I Pasek Kayu Selem dan I Pasek Kerandan (I Pasek Auman), untuk membuka wilayah barat Bali. Setelah menempuh perjalanan panjang, mereka menetap di lereng Batukaru dan menamai wilayah itu Pujung atau Pujungan, yang dimaknai sebagai akhir perjalanan.
              </p>
              <p>
                Dalam perkembangan berikutnya, keturunan para patih membentuk masyarakat desa yang harmonis. Jejak sejarahnya masih dapat ditemukan melalui peninggalan seperti kulkul perunggu, guci kuno, tombak, genta, dan keris yang diwariskan lintas generasi. Secara administratif, Pujungan ditetapkan sebagai desa definitif pada 1 Oktober 1975 berdasarkan SK Bupati Tabanan Nomor Pem/II.a/1079/1975.
              </p>
              <p>
                Hingga kini, kehidupan budaya dan spiritual tetap kuat dalam keseharian warga yang mayoritas beragama Hindu. Tradisi Dewa Yadnya Piodalan Besar di pura-pura utama, narat massal, serta praktik megangsingan terus dijaga. Di sisi lain, potensi alam seperti sawah terasering, kebun kopi Arabika, dan air terjun tersembunyi menjadikan Pujungan berkembang sebagai destinasi ekowisata yang tetap berakar pada adat.
              </p>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}