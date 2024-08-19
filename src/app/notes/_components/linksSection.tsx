import Link from "next/link";

interface LinksSectionProps {
  links: { title: string; link: string }[];
}

export default function LinksPage({ links }: LinksSectionProps) {
  return (
    <div className="flex w-full flex-col gap-3.5 rounded bg-blue-50 p-10">
      {links.map((item, index) => (
        <Link key={index} href={item.link}>
          <div className="cursor-pointer font-light text-blue-500 hover:font-normal hover:text-blue-950">
            {index + 1}. {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
