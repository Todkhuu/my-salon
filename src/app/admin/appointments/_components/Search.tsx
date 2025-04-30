import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  date?: Date;
};

export const Searchs = ({ searchQuery, setSearchQuery, date }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search appointments..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" className="flex items-center gap-1">
        <CalendarIcon className="h-4 w-4" />
        {date ? format(date, "PPP") : "Select date"}
      </Button>
    </div>
  );
};
