import HeroSection from "./_components/heroSection";

export default async function Home() {
  return (
    <div className="flex h-full w-full flex-col bg-darkBackground">
      <HeroSection />
    </div>
  );
}
