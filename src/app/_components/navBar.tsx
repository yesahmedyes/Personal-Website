"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const Links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="flex flex-row place-items-center justify-between py-10">
      <div className="text-lg text-white">Ahmed</div>
      <div className="flex flex-row place-items-center justify-center gap-8">
        {Links.map((link, index) => (
          <Link
            key={index}
            className={`text-gray hover:text-white ${pathname === link.href && "text-white"}`}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
