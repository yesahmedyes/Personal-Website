import Navbar from "./_components/navbar";
import Socials from "./_components/socials";
import NotesList from "./_components/notesList";

export default function Main() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="min-h-[45rem] w-full">
        <div className="flex h-full bg-bgDark w-full flex-col place-items-center">
          <div className="flex flex-col w-4/5 h-full">
            <Navbar />
            <div className="flex flex-col flex-grow gap-5 justify-center pb-6 2xl:pb-14">
              <div className="text-textWhite text-4xl font-medium font-serif">I&apos;m Ahmed.</div>
              <div className="text-textGray text-lg font-medium pb-5 leading-9 text-justify">
                An aspiring reinforcement learning researcher focused on building algorithms that can help robots learn through experimentation.
              </div>
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-4/5 place-self-center py-20 gap-8">
        <div className="text-[#222222] text-2xl font-semibold">Notes</div>
        <NotesList />
      </div>
    </div>
  );
}
