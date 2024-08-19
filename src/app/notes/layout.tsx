import MathJaxProvider from "./_components/mathJaxProvider";

export default function NotesLayout({ children }: React.PropsWithChildren) {
  return <MathJaxProvider>{children}</MathJaxProvider>;
}
