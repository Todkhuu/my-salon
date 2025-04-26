import { AppointmentHeader } from "./_components/AppointmentHeader";
import AppointmentsTabs from "./_components/AppointmentsTabs";
import { QuickAction } from "./_components/QuickAction";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <AppointmentHeader />
      <div className="grid gap-6 md:grid-cols-[1fr_250px]">
        <AppointmentsTabs />
        <div className="space-y-6">
          <QuickAction />
        </div>
      </div>
    </div>
  );
}
