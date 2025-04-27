import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileTab } from "./_components/ProfileTab";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <ProfileTab />
    </div>
  );
}
