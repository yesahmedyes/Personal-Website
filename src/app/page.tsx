import Navbar from "./_components/navbar";
import Socials from "./_components/socials";
import NotesList from "./_components/notesList";

export default function Main() {
  return (
    <div className="flex h-screen w-full flex-col">
      <div className="min-h-[45rem] w-full">
        <div className="flex h-full bg-bgDark w-full flex-col place-items-center">
          <div className="flex flex-col w-9/12 2xl:w-8/12 h-full">
            <Navbar />
            <div className="flex flex-col flex-grow gap-5 justify-center pb-6 2xl:pb-8">
              <div className="text-textWhite text-4xl font-medium font-serif">Hey, I&apos;m Ahmed.</div>
              <div className="text-textGray text-lg font-normal pb-4 leading-9 text-justify">
                An aspiring reinforcement learning researcher focused on building algorithms that can help robots learn through experimentation. Currently, interested in plasticity of neural networks and reasoning about actions.
              </div>
              <Socials />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-9/12 2xl:w-8/12 place-self-center py-20 gap-7">
        <div className="text-textBlack text-2xl font-bold">Notes</div>
        <NotesList />
      </div>
    </div>
  );
}
