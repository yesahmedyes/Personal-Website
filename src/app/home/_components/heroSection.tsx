import { ArrowDownIcon, WavingHandIcon } from "../../svgs";

export default function HeroSection() {
  return (
    <div
      className="flex h-screen w-full justify-center bg-bgDark"
      data-aos="fade-up"
    >
      <div className="flex pt-5 w-9/12 flex-col place-items-center justify-center text-white">
        <div className="flex flex-row place-items-center gap-4">
          <div className="text-center text-textGray">Hey there</div>
          <div className="pb-1">
            <WavingHandIcon />
          </div>
          <div className="text-center text-textGray">I&apos;m Ahmed</div>
        </div>
        <div
          className="w-full pb-16 pt-8 text-center font-serif text-3xl font-semibold lg:w-[500px] lg:text-4xl"
          style={{ lineHeight: "1.5" }}
        >
          Aspiring Reinforcement Learning Researcher
        </div>
        <div className="cursor-pointer">
          <ArrowDownIcon />
        </div>
      </div>
    </div>
  );
}
