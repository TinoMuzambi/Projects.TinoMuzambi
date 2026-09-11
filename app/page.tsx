import { FeaturedProjects } from "@/components/FeaturedProjects"
import { LivePortal } from "@/components/LivePortal"
import { ProjectIndex } from "@/components/ProjectIndex"
import { featuredProjects, getProject, projects } from "@/content/projects"
import { archiveJsonLd } from "@/lib/public-data"

export default function Home() {
	const portalProject = getProject("clock-in-out-analysis")
	const jsonLd = JSON.stringify(archiveJsonLd).replace(/</g, "\\u003c")

	return (
		<main id="main-content">
			<section className="field-hero" id="top" aria-labelledby="archive-title">
				<div className="archive-shell hero-layout">
					<h1 id="archive-title">Things I&apos;ve built, tested and learned from.</h1>
					<div className="hero-interface">
						<form className="hero-search" action="/#index" method="get" role="search">
							<label htmlFor="hero-project-search">Search the project archive</label>
							<div>
								<input
									id="hero-project-search"
									name="q"
									type="search"
									placeholder="Try Python, mobile or R"
								/>
								<button type="submit">Search</button>
							</div>
						</form>
						<p className="hero-count"><strong>{projects.length}</strong> documented projects</p>
						<a className="text-link" href="#featured">Start with selected work</a>
					</div>
				</div>
			</section>

			<FeaturedProjects projects={featuredProjects} />
			{portalProject ? <LivePortal project={portalProject} /> : null}
			<ProjectIndex projects={projects} />

			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
		</main>
	)
}
