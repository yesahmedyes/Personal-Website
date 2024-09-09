import Link from "next/link";
import Image from "next/image";
import { notes_data } from "../data";

export default function NotesList() {
  return (
    <div className="flex flex-wrap">
      {notes_data.map((item, index) => (
        <Link key={index} href={item.href}>
          <div className="flex flex-col group w-min rounded-lg border border-black/10 hover:border-black/20 px-4 py-8">
            <div className="group-hover:text-orange-500 text-center text-textBlack font-semibold">{item.title}</div>
            <div className="flex p-2 flex-col rounded w-[300px] h-[280px] place-items-center justify-center">
              <Image src={item.image} alt="Notes" width={300} height={280} className="rounded" />
            </div>
            <div className="whitespace-normal text-sm leading-7 text-textBlack text-center">{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
