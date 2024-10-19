"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ dark = true }) {
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
    return pathname === path ? "text-orange-500" : dark ? "hover:text-textWhite" : "hover:text-black";
  };

  return (
    <div className={`flex flex-row absolute ${dark ? "text-textGray font-light" : "text-textBlack font-normal"} gap-5 pt-10`}>
      {links.map((link) => (
        <Link key={link.name} href={link.href} className={`cursor-pointer ${isActive(link.href)}`}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}
