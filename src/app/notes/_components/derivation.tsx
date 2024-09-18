"use client";

import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

export default function Derivation({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={`mb-3 flex flex-col rounded border transition-all px-4 py-4`}>
      <div onClick={() => setOpened(!opened)} className={`flex flex-row place-items-center ${opened ? "justify-end" : "justify-between"}`}>
        {!opened && <div className="text-blue-500 hover:text-blue-900 cursor-pointer">See derivation</div>}
        <ArrowDown2 size={16} className={`text-blue-900 transition-all ${opened && "rotate-180"}`} />
      </div>
      {opened && <div className="flex flex-col px-2 gap-4">{children}</div>}
    </div>
  );
}
