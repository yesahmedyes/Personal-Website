"use client";

interface MainProps {
  heading: string;
  children: React.ReactNode;
}

export default function Main({ heading, children }: MainProps) {
  return (
    <div className="flex h-full w-full justify-center bg-bgLessDark leading-loose">
      <div className="flex h-full w-full flex-row justify-center overflow-y-auto">
        <div className="flex h-full w-full flex-col place-items-center p-16">
          <div className="flex w-10/12 2xl:w-9/12 flex-col gap-6 rounded-sm bg-white p-16">
            <div className="w-full pb-4 text-center font-serif text-3xl font-medium">{heading}</div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
