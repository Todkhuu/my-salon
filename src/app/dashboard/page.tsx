import { DashboardHeader } from "./_components/DashboardHeader";
import { DashboardStats } from "./_components/DashboardStats";
import { UpcomingAppointments } from "./_components/UpcomingAppointments";
import { RecentAppointments } from "./_components/RecentAppointments";
import { RecommendedServices } from "./_components/RecommendedServices";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <UpcomingAppointments />
        <RecentAppointments />
      </div>
      <RecommendedServices />
    </div>
  );
}
