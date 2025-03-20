interface SectionProps {
  title?: string;
  heading?: string;
  children: React.ReactNode;
}

export default function Section({ heading, children, title }: SectionProps) {
  return (
    <div id={heading ?? title} className="flex w-10/12 2xl:w-9/12 flex-col gap-8 rounded-sm bg-white p-16">
      <div className="flex w-full flex-col text-base gap-5">
        {title && <div className="w-full pb-6 text-center font-serif text-3xl font-medium">{title}</div>}
        {heading && <div className="font-serif text-2xl font-medium pt-1">{heading}</div>}
        <div className="flex flex-col gap-3 leading-8">{children}</div>
      </div>
    </div>
  );
}
