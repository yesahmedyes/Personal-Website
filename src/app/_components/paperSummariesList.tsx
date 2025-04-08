import Link from "next/link";
import Image from "next/image";
import { paper_summaries_data } from "../data";

interface PaperSummariesList {
  viewAll: boolean;
}

export default function PaperSummariesList({ viewAll = false }: PaperSummariesList) {
  return (
    <div className="flex flex-col gap-5">
      {(viewAll ? paper_summaries_data : paper_summaries_data.slice(0, 4)).map((item, index) => (
        <Link key={index} href={item.link}>
          <div className="flex flex-col gap-3 group w-full rounded-lg border border-black/10 hover:border-black/20 px-4 py-6">
            <div className="group-hover:text-orange-500 text-center text-textBlack font-semibold">{item.title}</div>
            <div className="flex flex-row gap-2 place-self-center">
              {item.tags.map((tag, index) => (
                <div key={index} className="whitespace-normal text-white text-center bg-blue-500 rounded-full px-4 text-xs py-1">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}

      {!viewAll && (
        <div className="flex justify-center pt-2">
          <button className="text-textBlack text-sm cursor-pointer hover:text-orange-500">View All</button>
        </div>
      )}
    </div>
  );
}
