import Link from "next/link";

interface LinksSectionProps {
  links: { title: string; link: string }[];
}

export default function LinksPage({ links }: LinksSectionProps) {
  return (
    <div className="flex w-full flex-col gap-3.5 rounded bg-[#CCE5FE] p-10">
      {links.map((item, index) => (
        <Link key={index} href={item.link}>
          <div className="cursor-pointer font-light text-[#007bff] hover:font-normal hover:text-[#004085]">
            {index + 1}. {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
