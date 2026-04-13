"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/map", label: "Peta" },
  { href: "/contact", label: "Kontak" },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#151515]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-[0.2em] text-[#c68e51] uppercase">
          Desa Adat Pujungan
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm text-white/85 sm:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#c68e51]">
              {item.label}
            </Link>
          ))}
          <Link href="/dashboard" className="rounded bg-[#c68e51] px-3 py-1.5 text-xs font-semibold text-[#151515]">
            Admin
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded p-1.5 text-white/85 transition hover:text-[#c68e51] sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav className="flex flex-col border-t border-white/10 bg-[#151515] px-5 pb-4 text-sm text-white/85 sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 transition hover:text-[#c68e51]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="mt-3 self-start rounded bg-[#c68e51] px-3 py-1.5 text-xs font-semibold text-[#151515]"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
