import NotesList from "../_components/notesList";

export default function Notes() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-col h-full w-9/12 2xl:w-8/12 place-self-center justify-start py-20 gap-7">
        <NotesList />
      </div>
    </div>
  );
}
