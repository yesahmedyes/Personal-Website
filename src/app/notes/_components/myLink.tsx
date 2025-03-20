import Link from "next/link";

interface MyLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function MyLink({ children, href }: MyLinkProps) {
  return (
    <Link className="underline font-light text-blue-500 hover:text-blue-900" href={href}>
      {children}
    </Link>
  );
}
