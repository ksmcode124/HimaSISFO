import { BreadcrumbItemData } from "@/components/ui/breadcrumb";
import { ListBreadcrumb } from "@/components/ui/ListBreadCrumb";

export default function BreadcrumbSection({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <section className="min-h-[10vh] lg:min-h-[15vh] flex flex-col justify-center w-full">
      <ListBreadcrumb items={items} />
    </section>
  );
}