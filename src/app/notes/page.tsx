import Image from "next/image";

export default function Notes() {
  return (
    <div className="from-bgDark to-bgDarkShade flex min-h-screen w-full justify-center bg-gradient-to-b">
      <div className="flex w-full flex-col place-items-start justify-start px-6 pb-32 pt-32 text-white lg:w-9/12 lg:px-0 2xl:w-8/12">
        <div className="bg-componentDark flex w-full flex-col rounded px-4 py-6 lg:flex-row">
          <Image
            src={"/images/notes/machine-learning.webp"}
            alt="Notes"
            width={250}
            height={250}
          />
          <div className="flex w-6/12 flex-col gap-2">
            <div className="font pb-1 text-lg font-normal">
              CS229: Machine Learning
            </div>
            <div className="text-textGray font-light">
              Supervised Learning, Deep Learning, Generalization and
              Regularization, Unsupervised Learning, Reinforcement Learning
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
