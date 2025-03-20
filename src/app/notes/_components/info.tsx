import { InfoCircle } from "iconsax-react";

interface InfoProps {
  info: React.ReactNode;
  children: React.ReactNode;
}

export default function Info({ children, info }: InfoProps) {
  return (
    <div className={`flex flex-row gap-3 place-items-center justify-center`}>
      {children}
      <div className="group relative">
        <InfoCircle className="text-orange-500" size={14} />
        <div className="absolute center-0 hidden leading-8 max-w-[250px] text-xs w-max group-hover:block bg-white border rounded-md px-3 py-2 whitespace-normal bottom-0 mb-4 ml-1 drop-shadow-sm">
          {info}
        </div>
      </div>
    </div>
  );
}
