import { ModifiedListBreadcrumb } from "../components/ListBreadcrumb";
import { ColorMap } from "../types";

interface BreadcrumbItemType {
  display: string;
  link: string;
}

export default function BreadcrumbSection({ 
  items, 
  colorMap 
}: { 
  items: BreadcrumbItemType[]; 
  colorMap: ColorMap 
}) {
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
      <ModifiedListBreadcrumb items={items} colorMap={colorMap} />
    </section>
  )
}