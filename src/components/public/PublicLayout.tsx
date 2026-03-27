import Link from "next/link";
import { AOSInit } from "./AOSInit";

type PublicLayoutProps = {
  children: React.ReactNode;
  hideFooter?: boolean;
};

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/map", label: "Peta" },
  { href: "/contact", label: "Kontak" },
];

export function PublicLayout({ children, hideFooter }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f3ec] text-[#151515]">
      <AOSInit />
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#151515]/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-[#c68e51] uppercase">
            Desa Pujungan
          </Link>
          <nav className="flex items-center gap-5 text-sm text-white/85">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#c68e51]">
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" className="rounded bg-[#c68e51] px-3 py-1.5 text-xs font-semibold text-[#151515]">
              Admin
            </Link>
          </nav>
        </div>
      </header>

      <div className="pt-16">{children}</div>

      {!hideFooter && (
        <footer className="bg-[#151515] py-10 text-white/75">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 lg:px-8">
            <p className="text-base font-semibold text-white">Desa Pujungan, Kubu, Karangasem</p>
            <p className="text-sm">Portal informasi pura dan warisan budaya Desa Pujungan.</p>
          </div>
        </footer>
      )}
    </div>
  );
}