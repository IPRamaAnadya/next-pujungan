import Image from "next/image";
import { PublicLayout } from "@/components/public/PublicLayout";

const values = [
  {
    title: "Tri Hita Karana",
    description:
      "Tiga penyebab kebahagiaan: harmoni dengan Tuhan, manusia, dan alam. Filosofi ini menjadi panduan hidup masyarakat Desa Pujungan.",
  },
  {
    title: "Desa Kala Patra",
    description:
      "Kesadaran untuk menyesuaikan diri dengan tempat, waktu, dan keadaan agar setiap kegiatan tetap menghormati konteks adat.",
  },
  {
    title: "Sradha Bhakti",
    description:
      "Kesetiaan dan pengabdian kepada Yang Maha Kuasa yang diwujudkan melalui upacara keagamaan secara tulus dan konsisten.",
  },
];

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
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Tentang Kami</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">Desa Pujungan</h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              Desa yang terletak di Kecamatan Kubu, Kabupaten Karangasem, Bali, dengan warisan spiritual Hindu-Bali yang masih dijaga lintas generasi.
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative h-80 overflow-hidden shadow-xl lg:h-[500px]">
            <Image
              src="/images/history-carving.jpg"
              alt="Sejarah Desa Pujungan"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Sejarah</p>
            <h2 className="mt-3 text-3xl font-bold text-[#151515] md:text-4xl">Akar Sejarah yang Dalam</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#3c3c3c] md:text-base">
              <p>
                Desa Pujungan berkembang sejak abad ke-11 saat seorang resi dari Kerajaan Gelgel menemukan lokasi ini sebagai tempat bersemadi. Nama Pujungan berasal dari kata puja, yang bermakna sembahyang dan persembahan.
              </p>
              <p>
                Sejak saat itu, wilayah ini menjadi pusat kegiatan keagamaan dengan banyak pura bersejarah yang memiliki nilai spiritual penting bagi masyarakat setempat.
              </p>
              <p>
                Hingga kini, tradisi adat dan upacara tetap dilaksanakan dengan khidmat sebagai warisan yang dijaga turun-temurun.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
            <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#c68e51] uppercase">Nilai-Nilai</p>
            <h2 className="mt-3 text-center text-3xl font-bold text-[#151515] md:text-4xl">Filosofi Hidup Kami</h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {values.map((value, index) => (
                <article key={value.title} className="bg-[#f8f3ec] p-6 shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#c68e51] text-lg font-bold text-[#151515]">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-[#151515]">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#3c3c3c]">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}