import Link from "next/link";
import { notes_data } from "../notes/page";
import Image from "next/image";

export default function NotesList() {
  return (
    <div className="flex flex-wrap">
      {notes_data.map((item, index) => (
        <Link key={index} href={item.href}>
          <div className="group w-[300px]">
            <Image src={item.image} alt="Notes" width={300} height={300} className="mix-blend-color-dodge" />
            <div className="flex flex-col gap-2 place-self-center">
              <div className="pb-1 text-lg group-hover:text-orange-500">{item.title}</div>
              <div className="whitespace-normal font-light leading-relaxed text-textGray">{item.description}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
