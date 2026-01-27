import { BreadcrumbItemData } from "@/components/ui/breadcrumb"
import { ListBreadcrumb } from "@/components/ui/ListBreadCrumb"

export function BreadcrumbSection({ items }: { items: BreadcrumbItemData[] }) {
  return (
    <section
      className="
        w-full
        px-8 sm:px-12 lg:px-30
        pt-[72px] lg:pt-[96px]
        pb-4
      "
    >{/* Ubah PT setinggi Navbar*/}
      <ListBreadcrumb items={items} />
    </section>
  )
}
