import Image from "next/image";
import Code124 from "/public/logo.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/behind-the-web"
      className="lg:flex lg:justify-center lg:items-center"
    >
      <Image width={48} height={48} src={Code124} alt="Logo Code124" />
      <p className="hidden lg:block">Code124</p>
    </Link>
  );
}
