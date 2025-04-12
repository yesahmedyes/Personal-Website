"use client";

import Link from "next/link";
import { literature_reviews_data } from "../data";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";

import Filter from "../_components/filter";
import { SearchNormal1 } from "iconsax-react";
import { Badge } from "../_components/badge";

interface LiteratureReviewsListProps {
  viewAll: boolean;
}

type TagOption = {
  label: string;
  count?: number;
};

export default function LiteratureReviewsList({ viewAll = false }: LiteratureReviewsListProps) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

  const tagOptions = useMemo(() => {
    const tagCounts = new Map<string, number>();

    literature_reviews_data.forEach((item) => {
      item.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  const filteredItems = useMemo(() => {
    let items = literature_reviews_data;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      items = items.filter((item) => item.title.toLowerCase().includes(query) || item.tags.some((tag) => tag.toLowerCase().includes(query)));
    }

    if (selectedTags.length > 0) {
      items = items.filter((item) => selectedTags.some((selected) => item.tags.includes(selected.label)));
    }

    return viewAll ? items : items.slice(0, 4);
  }, [searchQuery, selectedTags, viewAll]);

  const handleTagFilterChange = (selected: TagOption[]) => {
    setSelectedTags(selected);
  };

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-0.5">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search literature reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 px-10 text-sm rounded-lg border border-black/10 focus:border-black/20 focus:outline-none"
          />
          <SearchNormal1 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>

        <Filter label="Filter by tags" options={tagOptions} onChange={handleTagFilterChange} />
      </div>

      <div className="flex flex-col gap-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Link key={index} href={item.link}>
              <div className="flex flex-col gap-4 group w-full rounded-lg border border-black/10 hover:border-black/20 px-4 py-5">
                <div className="group-hover:text-orange-500 text-center text-textBlack font-semibold">{item.title}</div>
                <div className="flex flex-wrap place-content-center gap-3 place-self-center">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="highlight">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10 text-textBlack/70">No literature reviews found matching your criteria.</div>
        )}

        {!viewAll && filteredItems.length > 0 && (
          <div onClick={() => router.push("/literature-reviews")} className="flex justify-center">
            <button className="text-textBlack text-sm cursor-pointer hover:text-orange-500">View All</button>
          </div>
        )}
      </div>
    </div>
  );
}
