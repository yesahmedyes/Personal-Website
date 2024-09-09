"use client";

import { GithubLogoIcon, LinkedinLogoIcon } from "./svgs";

export default function Socials() {
  return (
    <div className="flex flex-row gap-5 place-items-center">
      <a href="https://www.linkedin.com/" target="_blank" className="cursor-pointer">
        <LinkedinLogoIcon size={22} />
      </a>
      <a href="https://github.com/" target="_blank" className="cursor-pointer">
        <GithubLogoIcon size={24} />
      </a>
    </div>
  );
}
