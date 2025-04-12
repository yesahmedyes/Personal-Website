import Navbar from "./_components/navbar";
import Socials from "./_components/socials";
import NotesList from "./_components/notesList";

import CourseAssignments from "./assignments/courseAssignments";
import LiteratureReviewsList from "./literature-reviews/literatureReviewsList";

export default function Main() {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-bgDark w-full py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 justify-center place-items-center max-w-4xl mx-auto pb-4">
          <div className="aspect-square cursor-pointer rounded-2xl bg-[#E2D6CD] bg-[url('/images/me.png')] bg-[length:80%] bg-[left_1rem_top_2rem] bg-no-repeat w-2/3 lg:w-1/3"></div>

          <div className="flex flex-col gap-5 lg:gap-4 text-textWhite text-lg px-6 lg:px-0 w-full lg:w-2/3">
            <p className="font-serif font-medium text-xl lg:text-2xl text-center lg:text-left">Hey, I&apos;m Ahmed.</p>
            <p className="font-sans font-light leading-relaxed text-center lg:text-justify pb-0 lg:pb-2">
              An aspiring machine learning researcher with an interest in continual learning, reinforcement learning and large language models.
            </p>
          </div>
        </div>
      </div>

      <Navbar />

      <div className="flex flex-col h-full w-full lg:w-9/12 2xl:w-8/12 place-self-center pb-4 lg:py-8 px-6 lg:px-0 gap-8">
        <div className="flex flex-col gap-6">
          <div className="text-textBlack text-lg lg:text-xl font-bold text-center lg:text-left">Literature Reviews</div>

          <LiteratureReviewsList viewAll={false} />
        </div>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-12 justify-center place-items-center w-full pb-4">
          <div className="aspect-square cursor-pointer rounded-2xl bg-[url('/images/machine-learning.png')] bg-cover bg-no-repeat w-11/12 lg:w-1/3"></div>

          <div className="text-sm lg:text-base w-full lg:w-2/3">
            <p className="font-sans font-normal leading-loose text-justify lg:text-justify">
              My spirit animal? The loss landscape. Twisted, chaotic, occasionally smooth — but always the place where everything in machine learning quietly unfolds.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="text-textBlack text-lg lg:text-xl font-bold text-center lg:text-left">Notes</div>

          <NotesList />
        </div>

        <div className="flex flex-col gap-6 pt-4">
          <div className="text-textBlack text-lg lg:text-xl font-bold text-center lg:text-left">Assignments</div>

          <CourseAssignments />
        </div>
      </div>

      <div className="bg-bgDark w-full py-16 mt-10">
        <div className="flex flex-col flex-grow gap-10 justify-center place-items-center max-w-2xl mx-auto px-6 lg:px-0">
          <p className="text-textLightGray text-sm font-normal leading-relaxed text-center">This website is a personal lookup for all my notes, assignments and research projects.</p>

          <Socials />

          <p className="text-textLightGray text-sm font-normal leading-relaxed">Ahmed Haroon © 2025</p>
        </div>
      </div>
    </div>
  );
}
