"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// import { useEffect } from "react";

// import * as AOS from "aos";

const Navbar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string): string => {
    return pathname === path ? "text-orange-500" : "";
  };

  const Links = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/notes", label: "Notes" },
  ];

  const validPathNames = ["/", "/home", "/about", "/notes"];

  // useEffect(() => {
  //   AOS.init({
  //     once: true,
  //     delay: 50,
  //     duration: 1000,
  //   });
  // }, []);

  if (!validPathNames.includes(pathname)) return null;

  return (
    <div className="mt-8 flex w-full justify-center lg:mt-10">
      <div className="bg-componentDark text-gray-200 top-0 flex flex-row justify-center gap-5 rounded-full border border-white/5 px-6 py-2.5 text-sm font-normal tracking-wider transition-all hover:px-7">
        {Links.map((link) => (
          <Link key={link.href} href={link.href}>
            <div
              className={`cursor-pointer p-0.5 hover:text-orange-500 ${isActive(
                link.href,
              )}`}
            >
              {link.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
