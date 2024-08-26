export default function Detour({
  children,
  about,
}: {
  children: React.ReactNode;
  about: string;
}) {
  return (
    <div className="my-3 flex flex-col gap-5 rounded bg-purple-50 px-5 py-4">
      <div className="font-medium">
        Let's take a little detour to learn about {about}.
      </div>
      {children}
    </div>
  );
}
