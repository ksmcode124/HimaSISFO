"use client"
import Link from "next/link";

export function DynamicRoute({children, route}: {children: React.ReactNode, route: string}) {
  return (
    <Link href={route} className="block w-full h-full">
      {children}
    </Link>
  );
}
