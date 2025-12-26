import { NavigationBar } from "@/components/layout";
import { navItems } from "@/features/navigation";

export default function PublicLayout() {
  return (
    <>
    <NavigationBar items={navItems} />
    </>
  )
}