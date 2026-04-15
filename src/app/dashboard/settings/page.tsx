import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import DashboardShell from "@/components/dashboard/DashboardShell";
import SettingsManager from "@/components/dashboard/settings/SettingsManager";
import { authOptions } from "@/lib/auth-options";

export default async function DashboardSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <DashboardShell
      title="Pengaturan"
      subtitle="Kelola pengaturan umum situs"
    >
      <SettingsManager />
    </DashboardShell>
  );
}
