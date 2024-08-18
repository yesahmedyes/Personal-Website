import HeroSection from "./_components/heroSection";

export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col bg-darkBackground">
      <HeroSection />

      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col place-items-start justify-start px-6 pb-32 text-white lg:w-9/12 lg:px-0 2xl:w-8/12">
          {/* <AboutInitialSection />
          <RecentExperiences />
          <MajorTools /> */}
        </div>
      </div>
    </div>
  );
}
