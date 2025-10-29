import { NavLink } from "./NavLink";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-3">
      <Logo />
      <ul className="flex flex-col lg:flex-row gap-3 lg:gap-6 mt-4 lg:mt-0">
        <NavLink href="/behind-the-web">Tentang</NavLink>
        <NavLink href="/behind-the-web">Sejarah</NavLink>
        <NavLink href="/behind-the-web">Visi & Misi</NavLink>
        <NavLink href="/behind-the-web">Departemen</NavLink>
      </ul>
    </nav>
  );
}
