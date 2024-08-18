import { GithubLogoIcon, LinkedinLogoIcon } from "../svgs";

export default async function About() {
  return (
    <div className="from-bgDark to-bgDarkShade flex w-full justify-center bg-gradient-to-b">
      <div className="flex pt-32 w-full flex-col place-items-start justify-start px-6 pb-32 text-white lg:w-9/12 lg:px-0 2xl:w-8/12">
        <div className="flex w-full flex-col gap-12 lg:flex-row">
          <div
            className="aspect-square cursor-pointer rounded-2xl bg-[#E2D6CD] bg-[url('/images/me.png')] bg-[length:80%] bg-[left_1rem_top_2rem] bg-no-repeat lg:w-1/2"
            data-aos="fade-up"
          ></div>

          <div
            className="flex flex-col place-items-center gap-6 lg:w-1/2 lg:place-items-start"
            data-aos="fade-up"
          >
            <div className="text-3xl font-medium">About Me</div>

            <div className="flex flex-col gap-5 text-justify opacity-70">
              <div>
                In my past lives, I have been a Software Engineer, a Graphics
                Designer, and a Farmer.
              </div>
              <div>
                Currently, I am passionate about making robots that can learn
                through experimentation.
              </div>
              <div>
                In my free time, I find joy in the spirited world of Football
                and the captivating tales of Naruto.
              </div>
              <div>
                &quot;You can either have an easy life or a strong character.
                The price of one is the other.&quot;
              </div>

              <div className="flex flex-row place-items-center gap-5 pt-3 lg:pb-16">
                <a href="https://github.com/yesahmedyes" target="_blank">
                  <div className="cursor-pointer opacity-80 hover:opacity-100">
                    <GithubLogoIcon />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmed-haroon-68773a290/"
                  target="_blank"
                >
                  <div className="cursor-pointer opacity-80 hover:opacity-100">
                    <LinkedinLogoIcon />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
