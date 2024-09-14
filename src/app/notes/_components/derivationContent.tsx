interface DerivationContentProps {
  children: React.ReactNode;
}

export default function DerivationContent({ children }: DerivationContentProps) {
  return <div className={`flex flex-col gap-2 leading-8`}>{children}</div>;
}
