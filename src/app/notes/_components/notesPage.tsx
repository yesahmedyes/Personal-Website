interface NotesPageProps {
  heading: string;
  children: React.ReactNode;
}

export default function NotesPage({ heading, children }: NotesPageProps) {
  return (
    <div className="flex h-screen w-full justify-center bg-gradient-to-b from-bgDark to-bgDarkShade">
      <div className="flex h-screen w-full flex-row justify-center overflow-y-auto">
        <div className="flex h-full w-9/12 flex-col place-items-center py-12">
          <div className="flex w-10/12 flex-col gap-6 rounded-sm bg-white p-16">
            <div className="w-full pb-2 text-center font-serif text-3xl font-medium">
              {heading}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
