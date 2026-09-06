import Link from "next/link"

import { portfolioUrl } from "@/lib/projects"

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 border-b-2 border-ink bg-paper">
			<div className="archive-shell flex min-h-16 items-stretch justify-between">
				<Link
					className="flex items-center gap-2 whitespace-nowrap font-display text-[1.05rem] font-[680] tracking-[-0.03em] no-underline"
					href="/"
				>
					<span className="text-plum">Tino Muzambi</span>
					<span aria-hidden="true">/</span>
					<span>Archive</span>
				</Link>
				<nav className="flex items-stretch" aria-label="Primary navigation">
					<Link className="header-link header-link-secondary" href="/#featured">Selected work</Link>
					<Link className="header-link header-link-secondary" href="/#index">Project index</Link>
					<a className="header-link border-r-0 bg-aqua" href={portfolioUrl}>
						Main portfolio
						<span className="sr-only"> (opens Tino Muzambi&apos;s main site)</span>
					</a>
				</nav>
			</div>
		</header>
	)
}
