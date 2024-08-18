import Image from "next/image";
import Link from "next/link";

export default function Notes() {
  const data = [
    {
      title: "CS229: Machine Learning",
      description:
        "Supervised Learning, Deep Learning, Generalization and Regularization, Unsupervised Learning, Reinforcement Learning",
      image: "/images/notes/machine-learning.webp",
      href: "/notes/machine-learning",
    },
  ];

  return (
    <div className="from-bgDark to-bgDarkShade flex min-h-screen w-full justify-center bg-gradient-to-b">
      <div className="flex w-full flex-col place-items-start justify-start px-6 pb-32 pt-12 text-white lg:w-9/12 lg:px-0 2xl:w-8/12">
        {data.map((item, index) => (
          <Link key={index} href={item.href}>
            <div className="bg-componentDark group flex w-full cursor-pointer flex-col gap-6 rounded-lg border border-white/5 bg-opacity-50 p-6 hover:border-white/10 lg:flex-row">
              <Image
                src={item.image}
                alt="Notes"
                width={150}
                height={150}
                className="mix-blend-color-dodge"
              />
              <div className="flex w-full flex-col gap-2">
                <div className="font pb-1 text-lg font-normal group-hover:text-orange-500">
                  {item.title}
                </div>
                <div className="text-textGray w-full font-light leading-relaxed">
                  {item.description}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
