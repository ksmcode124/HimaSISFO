import { BreadcrumbItemData } from "@/components/ui/breadcrumb"
import { ListBreadcrumb } from "@/components/ui/ListBreadCrumb"

export function BreadcrumbSection({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <section
      className="
        w-full
        flex justify-center
        px-8 sm:px-12 lg:px-90
        mt-36 lg:mt-48
        pb-4
      "
    >
      <ListBreadcrumb items={items} />
    </section>
  )
}
