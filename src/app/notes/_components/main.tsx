"use client";

import { useEffect, useState } from "react";

interface MainProps {
  heading: string;
  children: React.ReactNode;
}

export default function Main({ heading, children }: MainProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const val = window.innerWidth - 350;
      setWidth(val);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full w-full justify-center bg-bgLessDark leading-loose">
      <div className="flex h-full w-full flex-row justify-center overflow-y-auto">
        {width > 0 && (
          <div style={{ width: `${width}px` }} className={`flex h-full w-full flex-col place-items-center py-16`}>
            <div className="flex w-10/12 2xl:w-9/12 flex-col gap-6 rounded-sm bg-white p-16">
              <div className="w-full pb-2 text-center font-serif text-3xl font-medium">{heading}</div>
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
