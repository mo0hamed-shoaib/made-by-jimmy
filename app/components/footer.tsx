import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com"
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com"

  return (
    <footer className="border-t border-border/50 mt-20">
      <div className="container mx-auto px-5 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2025 by Jimmy. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
