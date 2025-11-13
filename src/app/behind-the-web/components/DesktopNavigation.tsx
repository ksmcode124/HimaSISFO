import { NavLink } from './NavLink';

export default function DesktopNavigation() {
  return (
    <div className="flex gap-x-7">
      <NavLink href="#tentang">TENTANG</NavLink>
      <NavLink href="#sejarah">SEJARAH</NavLink>
      <NavLink href="#visimisi">VISI & MISI</NavLink>
      <NavLink href="#departemen">DEPARTEMEN</NavLink>
    </div>
  );
}
