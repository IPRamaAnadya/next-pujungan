import Link from "next/link";
import { AOSInit } from "./AOSInit";
import PublicNavbar from "./PublicNavbar";

type PublicLayoutProps = {
  children: React.ReactNode;
  hideFooter?: boolean;
};

export function PublicLayout({ children, hideFooter }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f3ec] text-[#151515]">
      <AOSInit />
      <PublicNavbar />

      <div className="pt-16">{children}</div>

      {!hideFooter && (
        <footer className="bg-[#151515] py-10 text-white/75">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 lg:px-8">
            <p className="text-base font-semibold text-white">Desa Adat Pujungan, Pupuan, Tabanan</p>
            <p className="text-sm">Portal informasi pura dan warisan budaya Desa Adat Pujungan.</p>
          </div>
        </footer>
      )}
    </div>
  );
}