import Link from "next/link";
import { title } from "process";

export default async function MachineLearning() {
  const data = [
    {
      title: "Linear Regression",
      href: "/notes/machine-learning/linear-regression",
    },
    {
      title: "Classification and Logistic Regression",
      href: "/notes/machine-learning/logistic-regression",
    },
    {
        title: "Generalized Linear Models",
        href: "/notes/machine-learning/generalized-linear-models",
    },
    {
        title: "Generative Learning Algorithms",
        href: "/notes/machine-learning/generative-learning-algorithms",
    },
    {
        title: "Kernel Methods",
        href: "/notes/machine-learning/kernel-methods",
    },
    {
        title: "Deep Learning",
        href: "/notes/machine-learning/deep-learning",
    },
    {
        title: "Generalization and Regularization",
        href: "/notes/machine-learning/generalization-and-regularization",
    },
    {
        title: "Clustering and K-Means",
        href: "/notes/machine-learning/clustering-and-k-means",
    },
  ];

  return (
    <div className="from-bgDark to-bgDarkShade flex min-h-screen w-full justify-center bg-gradient-to-b">
      <div className="flex w-full flex-col place-items-start justify-start gap-6 px-6 pb-32 pt-12 text-white lg:w-9/12 lg:px-0 2xl:w-8/12">
        <div className="text-textGray font-light">
          These notes are adapted from and meant to be a supplementary resource
          to the Andrew Ng's Notes for the CS229 Machine Learning Course at
          Stanford.
        </div>
        <div className="text-textGray font-light">
          Click on the links below to see the notes for each topic:
        </div>
        <div className="flex flex-col gap-5 opacity-95">
          {data.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="cursor-pointer text-lg hover:text-orange-500">
                {index + 1}. {item.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
