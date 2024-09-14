import Image from "next/image";
import Link from "next/link";
import { notes_data } from "../data";
import NotesList from "../_components/notesList";

export default function Notes() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="flex flex-col h-full w-4/5 place-self-center py-20">
        <NotesList />
      </div>
    </div>
  );
}
