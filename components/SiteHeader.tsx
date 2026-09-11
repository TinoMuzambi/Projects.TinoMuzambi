import Link from "next/link"

import { MobileNavigation } from "@/components/MobileNavigation"
import { PaletteStudio } from "@/components/PaletteStudio"
import { cvUrl, githubUrl, portfolioUrl } from "@/lib/projects"

export function SiteHeader() {
	return (
		<header className="site-header">
			<div className="archive-shell header-grid">
				<Link className="site-wordmark" href="/">Projects</Link>
				<div className="header-tools">
					<nav className="desktop-navigation" aria-label="Primary navigation">
						<a className="text-link" href={portfolioUrl}>Main portfolio</a>
						<a className="text-link" href={githubUrl}>GitHub</a>
						<a className="text-link" href={cvUrl}>CV</a>
					</nav>
					<PaletteStudio />
					<MobileNavigation />
				</div>
			</div>
		</header>
	)
}
