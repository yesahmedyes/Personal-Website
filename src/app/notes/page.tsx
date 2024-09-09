import Image from "next/image";
import Link from "next/link";

export const notes_data = [
  {
    title: "CS229: Machine Learning",
    description: "Supervised Learning, Deep Learning, Generalization and Regularization, Unsupervised Learning, Reinforcement Learning",
    image: "/images/notes/machine-learning.webp",
    href: "/notes/machine-learning",
  },
];

export default function Notes() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-gradient-to-b from-bgDark to-bgDarkShade">
      <div className="flex w-full flex-col place-items-start justify-start px-6 pb-32 pt-12 text-white lg:w-9/12 lg:px-0 2xl:w-8/12">
        {notes_data.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="group w-[300px] flex cursor-pointer flex-col gap-6 rounded-lg border border-white/5 bg-componentDark bg-opacity-50 p-6 hover:border-white/10">
              <Image src={item.image} alt="Notes" width={300} height={300} className="mix-blend-color-dodge" />
              <div className="flex flex-col gap-2 place-self-center">
                <div className="pb-1 text-lg group-hover:text-orange-500">{item.title}</div>
                <div className="whitespace-normal font-light leading-relaxed text-textGray">{item.description}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
