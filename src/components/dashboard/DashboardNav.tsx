"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

const navItems = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/temples", label: "Kelola Pura" },
  { href: "/dashboard/categories", label: "Kategori" },
  { href: "/dashboard/admins", label: "Admin" },
  { href: "/dashboard/settings", label: "Pengaturan" },
];

export default function DashboardNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="mt-4 border-t border-zinc-100 pt-4">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between sm:hidden">
        <span className="text-sm text-zinc-500">Menu</span>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md border border-zinc-300 p-1.5 text-zinc-600 hover:bg-zinc-50"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Desktop: always visible | Mobile: toggle */}
      <div className={`${open ? "flex" : "hidden"} flex-col gap-2 pt-3 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:pt-0`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
        >
          Lihat Situs
        </Link>
        <div className="sm:ml-auto">
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
