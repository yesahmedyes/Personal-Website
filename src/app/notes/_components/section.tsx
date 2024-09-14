interface SectionProps {
  title?: string;
  heading: string;
  children: React.ReactNode;
}

export default function Section({ heading, children, title }: SectionProps) {
  return (
    <div id={heading} className="flex w-10/12 2xl:w-9/12 flex-col gap-8 rounded-sm bg-white p-16">
      <div className="flex w-full flex-col text-sm gap-4">
        {title && <div className="w-full pb-8 text-center font-serif text-3xl font-medium">{title}</div>}
        <div className="font-serif text-2xl font-medium pb-2">{heading}</div>
        {children}
      </div>
    </div>
  );
}
