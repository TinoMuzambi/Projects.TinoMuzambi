import Link from "next/link"

import { email, githubUrl, linkedinUrl, portfolioUrl } from "@/lib/projects"

export function SiteFooter() {
	return (
		<footer className="border-t-2 border-ink bg-interface">
			<div className="archive-shell grid gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
				<div>
					<h2 className="max-w-[16ch] font-display text-4xl font-[680] leading-[0.98] tracking-[-0.05em] md:text-5xl">
						Work, decisions and limits kept together.
					</h2>
					<p className="mt-5 max-w-[64ch] text-[0.95rem] leading-relaxed">
						This project record complements Tino Muzambi&apos;s main portfolio. It keeps current work,
						published studies and older experiments in one searchable, honest catalogue.
					</p>
					<p className="ai-note">
						I use Claude Code and Codex to accelerate delivery, grounded in software and computer science foundations built before generative AI.
					</p>
				</div>
				<div className="grid content-start gap-8">
					<nav className="footer-link-list" aria-label="Identity links">
						<p>Contact and profile</p>
						<a href={`mailto:${email}`}>Email</a>
						<a href={githubUrl} rel="me noreferrer">GitHub</a>
						<a href={linkedinUrl} rel="me noreferrer">LinkedIn</a>
						<a href={portfolioUrl}>Main portfolio</a>
					</nav>
				</div>
			</div>
			<div className="border-t border-ink">
				<div className="archive-shell flex flex-wrap justify-between gap-4 py-4 text-sm font-semibold">
					<p>© {new Date().getUTCFullYear()} Tino Muzambi</p>
					<Link href="#top">Back to top</Link>
				</div>
			</div>
		</footer>
	)
}
