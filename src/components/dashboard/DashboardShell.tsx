import DashboardNav from "./DashboardNav";

type DashboardShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
};

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

          <DashboardNav />
        </header>

        {children}
      </div>
    </main>
  );
}
