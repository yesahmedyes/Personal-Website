"use client";

interface SectionProps {
  heading: string;
  children: React.ReactNode;
}

export default function Section({ heading, children }: SectionProps) {
  return (
    <div id={heading} className="flex w-full flex-col gap-4">
      <div className="font-serif text-2xl font-medium">{heading}</div>
      {children}
    </div>
  );
}
