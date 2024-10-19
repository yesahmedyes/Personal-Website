"use client";

import { GithubLogoIcon, LinkedinLogoIcon } from "./svgs";

export default function Socials() {
  return (
    <div className="flex flex-row gap-5 place-items-center">
      <a href="https://www.linkedin.com/in/ahmed-haroon-68773a290/" target="_blank" className="cursor-pointer">
        <LinkedinLogoIcon size={22} />
      </a>
      <a href="https://github.com/yesahmedyes" target="_blank" className="cursor-pointer">
        <GithubLogoIcon size={24} />
      </a>
    </div>
  );
}
