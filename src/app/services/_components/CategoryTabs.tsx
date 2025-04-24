import { CategoryType } from "@/app/utils/types";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  categories: CategoryType[];
  selectedTab: string;
  setSelectedTab: (val: string) => void;
}

export const CategoryTabs = ({
  categories,
  selectedTab,
  setSelectedTab,
}: Props) => {
  return (
    <div className="mb-8 flex justify-center">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="all">Бүгд</TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger key={category._id} value={category.name}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};
