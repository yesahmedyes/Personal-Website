import Navbar from "./_components/navbar";
import Socials from "./_components/socials";
import NotesList from "./_components/notesList";
import PaperSummariesList from "./_components/paperSummariesList";

export default function Main() {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-bgDark w-full py-32">
        <div className="flex flex-col flex-grow gap-8 justify-center place-items-center max-w-3xl mx-auto px-6 lg:px-0">
          <div className="flex flex-col gap-5 lg:gap-4 pb-6 text-textWhite text-lg lg:text-xl">
            <p className="font-serif font-medium text-xl lg:text-2xl">Hey, I&apos;m Ahmed.</p>
            <p className="font-sans font-normal leading-relaxed text-justify">
              An aspiring machine learning researcher with an interest in continual learning, reinforcement learning and reasoning and alignment of large language models.
            </p>
          </div>
        </div>
      </div>

      <Navbar dark={false} />

      <div className="flex flex-col h-full w-full lg:w-9/12 2xl:w-8/12 place-self-center py-5 lg:py-12 px-6 lg:px-0 gap-12">
        <div className="flex flex-col gap-6">
          <div className="text-textBlack text-xl font-bold">Notes</div>

          <NotesList />
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-textBlack text-xl font-bold">Paper Summaries</div>

          <PaperSummariesList viewAll={false} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-textBlack text-xl font-bold">Course Assignments</div>

          <NotesList />
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-textBlack text-xl font-bold">Research Projects</div>

          <NotesList />
        </div>
      </div>

      <div className="bg-bgDark w-full py-16 mt-5">
        <div className="flex flex-col flex-grow gap-10 justify-center place-items-center max-w-2xl mx-auto px-6 lg:px-0">
          <p className="text-textLightGray text-sm font-normal leading-relaxed text-center">Note: This website is a personal lookup for all my notes, assignments and research projects.</p>

          <Socials />

          <p className="text-textLightGray text-sm font-normal leading-relaxed">Ahmed Haroon © 2025</p>
        </div>
      </div>
    </div>
  );
}
