import Link from "next/link";


interface MyLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function MyLink({ children, href }: MyLinkProps) {
  return (
    <Link className="underline text-gray-600 hover:text-textBlack" href={href}>
      {children}
    </Link>
  );
}
