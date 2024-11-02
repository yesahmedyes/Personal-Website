interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <div className={`flex flex-col gap-3 leading-10`}>{children}</div>;
}
