import Link from "next/link";
import { literature_reviews_data } from "../data";

interface LiteratureReviewsListProps {
  viewAll: boolean;
}

export default function LiteratureReviewsList({ viewAll = false }: LiteratureReviewsListProps) {
  return (
    <div className="flex flex-col gap-5">
      {(viewAll ? literature_reviews_data : literature_reviews_data.slice(0, 4)).map((item, index) => (
        <Link key={index} href={item.link}>
          <div className="flex flex-col gap-3 group w-full rounded-lg border border-black/10 hover:border-black/20 px-4 py-5">
            <div className="group-hover:text-orange-500 text-center text-textBlack font-semibold">{item.title}</div>
            <div className="flex flex-row gap-3 place-self-center">
              {item.tags.map((tag, index) => (
                <div key={index} className="whitespace-normal text-blue-500 text-center bg-blue-50 border border-blue-200 rounded-full px-6 text-xs py-1">
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </Link>
      ))}

      {!viewAll && (
        <div className="flex justify-center">
          <button className="text-textBlack text-sm cursor-pointer hover:text-orange-500">View All</button>
        </div>
      )}
    </div>
  );
}
