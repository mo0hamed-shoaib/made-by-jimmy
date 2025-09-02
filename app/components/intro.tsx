import { CMS_NAME, CMS_URL } from "@/lib/constants";
import { ThemeToggle } from "./theme-toggle";

export function Intro() {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com"
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com"

  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 relative">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Made by Jimmy.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
      A blog where I share my thoughts and technical information.{" "}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors duration-200"
        >
          LinkedIn
        </a>{" "}
        -{" "}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors duration-200"
        >
          GitHub
        </a>
        .
      </h2>
    </section>
  );
}
