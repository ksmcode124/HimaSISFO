
import { BreadcrumbItemData } from "@/components/ui/Breadcrumb";
import { ListBreadcrumb } from "@/components/ui/ListBreadCrumb";

export function BreadcrumbSection({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <section className="min-h-[30vh] lg:min-h-[25vh] px-8 sm:px-12 lg:px-30 flex flex-col justify-center w-full">
      <ListBreadcrumb items={items} />
    </section>
  );
}