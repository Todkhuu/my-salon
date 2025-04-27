import { FavoriteHeader } from "./_components/FavoriteHeader";
import { FavoriteTab } from "./_components/FavoriteTab";

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <FavoriteHeader />
      <FavoriteTab />
    </div>
  );
}
