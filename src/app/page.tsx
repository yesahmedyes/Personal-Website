import NavBar from "./_components/navBar";

export default async function Home() {
  return (
    <div className="bg-darkBackground flex h-screen w-screen justify-center overflow-y-auto overflow-x-hidden">
      <div className="w-9/12 px-8 2xl:w-8/12">
        <NavBar />

        <div className="flex h-3/5 flex-col place-items-center justify-center gap-6">
          <div className="text-4xl font-semibold text-white">
            Hey, I am Ahmed
          </div>

          <div className="text-gray w-2/3 text-center text-xl leading-9">
            I am a <span className="text-white">reinforcement learning</span>{" "}
            researcher trying to build robots that can learn through
            experimentation. To learn more about me, <span className="hover:text-orange text-white">scroll down.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
