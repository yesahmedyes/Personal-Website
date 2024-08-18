interface NotesPageProps {
  heading: string;
  children: React.ReactNode;
}

export default function NotesPage({ heading, children }: NotesPageProps) {
  return (
    <div className="flex w-10/12 flex-col gap-6 rounded-sm bg-white p-16">
      <div className="w-full pb-2 text-center font-serif text-3xl font-medium">
        {heading}
      </div>
      {children}
    </div>
  );
}
