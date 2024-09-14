export default function Lemma({ children }: { children: React.ReactNode; }) {
  return (
    <div className="my-3 flex flex-col gap-4 rounded bg-blue-50 px-6 pt-6 pb-2.5">
      {children}
    </div>
  );
}
