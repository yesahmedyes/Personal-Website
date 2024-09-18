import Link from "next/link";


interface MyLinkProps {
  children: React.ReactNode;
  href: string;
}

export default function MyLink({ children, href }: MyLinkProps) {
  return (
    <Link className="font-medium hover:underline" href={href}>
      {children}
    </Link>
  );
}
