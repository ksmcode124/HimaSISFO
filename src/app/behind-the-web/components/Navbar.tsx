import Link from "next/link";
import { NavLink } from "./NavLink";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="min-w-screen flex justify-between px-20 py-3">
      <div>
        {/** Logo Code124 */}
      </div>
      <div>
        <NavLink href="/behind-the-web" label="Tentang" />
        <NavLink href="/behind-the-web" label="Sejarah" />
        <NavLink href="/behind-the-web" label="Visi & Misi" />
        <NavLink href="/behind-the-web" label="Departemen" />
      </div>
    </nav>
  );
}