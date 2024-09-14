export default function Detour({ children, about }: { children: React.ReactNode; about?: string }) {
  return (
    <div className="my-3 flex flex-col gap-4 rounded bg-purple-50 px-6 pt-7 pb-6">
      {about ? <div className="font-semibold">{about}</div> : <></>}
      {children}
    </div>
  );
}
