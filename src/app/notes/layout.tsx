export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="hidden lg:block">{children}</div>

      <div className="flex flex-col gap-2 items-center justify-center h-screen p-6 text-center lg:hidden pb-8">
        <h1 className="text-xl text-orange-500 font-bold mb-3">Please use a larger screen</h1>
        <p className="text-textDarkGray text-sm leading-relaxed">This content is best viewed on a laptop or desktop device.</p>
      </div>
    </div>
  );
}
