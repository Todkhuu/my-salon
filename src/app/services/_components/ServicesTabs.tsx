import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategorySection } from "./CategorySection";
import { CategoryType, ServiceType, UserType } from "@/app/utils/types";

interface ServicesTabsProps {
  categories: CategoryType[] | null;
  filteredServices: ServiceType[] | undefined;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  user: UserType | null;
}

export const ServicesTabs = ({
  categories,
  filteredServices,
  selectedTab,
  setSelectedTab,
  user,
}: ServicesTabsProps) => {
  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <div className="mb-8 flex justify-center">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">Бүгд</TabsTrigger>
          {categories?.map((category) => (
            <TabsTrigger key={category._id} value={category.name}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {selectedTab === "all" ? (
        <TabsContent value="all" className="space-y-12">
          {categories?.map((category) => {
            const servicesInCategory =
              filteredServices?.filter(
                (service) => service.category._id === category._id
              ) ?? [];
            return (
              <CategorySection
                key={category._id}
                category={category}
                services={servicesInCategory.slice(0, 3)}
                user={user}
              />
            );
          })}
        </TabsContent>
      ) : (
        categories?.map((category) => {
          if (selectedTab !== category.name) return null;
          const servicesInCategory = filteredServices?.filter(
            (service) => service.category._id === category._id
          );
          return (
            <TabsContent
              key={category._id}
              value={category.name}
              className="space-y-6"
            >
              <CategorySection
                category={category}
                services={servicesInCategory ?? []}
                user={user}
              />
            </TabsContent>
          );
        })
      )}
    </Tabs>
  );
};
