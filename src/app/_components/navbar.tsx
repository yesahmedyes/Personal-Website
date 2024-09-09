"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const links = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Notes",
      href: "/notes",
    },
    {
      name: "Blog",
      href: "/blog",
    },
  ];

  const pathname = usePathname();

  const isActive = (path: string): string => {
    return pathname === path ? "text-orange-500" : "hover:text-textWhite";
  };

  return (
    <div className="flex flex-row absolute text-textGray gap-5 pt-8">
      {links.map((link) => (
        <Link key={link.name} href={link.href} className={`cursor-pointer ${isActive(link.href)}`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
