import Link from "next/link"

import { email, githubUrl, linkedinUrl, portfolioUrl } from "@/lib/projects"

export function SiteFooter() {
	return (
		<footer className="border-t-2 border-ink bg-interface">
			<div className="archive-shell grid gap-10 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:py-14">
				<div>
					<p className="section-label">About this archive</p>
					<h2 className="mt-3 max-w-[16ch] font-display text-4xl font-[680] leading-[0.98] tracking-[-0.05em] md:text-5xl">
						The work, with its decisions and limits intact.
					</h2>
					<p className="mt-5 max-w-[62ch] text-[0.95rem] leading-relaxed">
						This project record complements Tino Muzambi&apos;s main portfolio. It keeps current work,
						published studies and older experiments in one searchable, honest catalogue.
					</p>
				</div>
				<div className="grid content-start gap-8 sm:grid-cols-2">
					<nav className="footer-link-list" aria-label="Identity links">
						<p>Contact and profile</p>
						<a href={`mailto:${email}`}>Email</a>
						<a href={githubUrl} rel="me noreferrer">GitHub</a>
						<a href={linkedinUrl} rel="me noreferrer">LinkedIn</a>
						<a href={portfolioUrl}>Main portfolio</a>
					</nav>
					<nav className="footer-link-list" aria-label="Machine-readable resources">
						<p>Machine-readable</p>
						<Link href="/llms.txt">llms.txt</Link>
						<Link href="/projects.json">Projects JSON</Link>
						<Link href="/sitemap.xml">Sitemap</Link>
						<Link href="/robots.txt">Robots metadata</Link>
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
