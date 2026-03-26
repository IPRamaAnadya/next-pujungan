import Link from "next/link";

type DashboardShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

const navItems = [
  { href: "/dashboard", label: "Ringkasan" },
  { href: "/dashboard/temples", label: "Kelola Pura" },
  { href: "/dashboard/categories", label: "Kategori" },
  { href: "/dashboard/admins", label: "Admin" },
];

export default function DashboardShell({ title, subtitle, actions, children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-zinc-50 p-6">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#c68e51] uppercase">Dashboard CMS</p>
              <h1 className="mt-1 text-2xl font-semibold text-zinc-900">{title}</h1>
              {subtitle ? <p className="mt-1 text-sm text-zinc-600">{subtitle}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
          </div>

          <nav className="mt-4 flex flex-wrap gap-2 border-t border-zinc-100 pt-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
                {item.label}
              </Link>
            ))}
            <Link href="/" className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
              Lihat Situs
            </Link>
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
