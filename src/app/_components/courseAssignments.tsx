import { course_assignments_data } from "../data";
import Link from "next/link";
import Image from "next/image";

export default function CourseAssignments() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {course_assignments_data.map((item, index) => (
        <Link key={index} href={item.link} target="_blank">
          <div className="flex flex-col group w-full rounded-lg border border-black/10 hover:border-black/20 px-4 py-6">
            <div className="group-hover:text-orange-500 text-center text-textBlack font-semibold">{item.title}</div>
            <div className="flex flex-col rounded h-[280px] place-items-center justify-center">
              <Image src={item.image} alt="Notes" width={250} height={280} className="rounded contrast-[1.1]" />
            </div>
            <div className="group-hover:text-orange-500 text-center text-textBlack font-semibold">By {item.university}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
