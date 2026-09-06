import Link from "next/link"
import { Suspense } from "react"

import { FeaturedProjects } from "@/components/FeaturedProjects"
import { ProjectIndex } from "@/components/ProjectIndex"
import { featuredProjects, projects } from "@/content/projects"
import { archiveJsonLd } from "@/lib/public-data"

export default function Home() {
	const activeProjects = projects.filter((project) =>
		["active", "maintained"].includes(project.status)
	).length
	const jsonLd = JSON.stringify(archiveJsonLd).replace(/</g, "\\u003c")

	return (
		<main id="main-content">
			<section className="border-b-2 border-ink" id="top" aria-labelledby="archive-title">
				<div className="archive-shell intro-grid">
					<div className="intro-copy">
						<p className="section-label text-plum">Tino Muzambi&apos;s engineering archive</p>
						<h1 id="archive-title">Work is clearer with the working notes attached.</h1>
						<p className="intro-lead">
							Selected research, data work and software projects with implementation decisions,
							limitations and public evidence kept visible.
						</p>
						<div className="intro-actions">
							<a className="primary-action" href="#featured">Review selected work</a>
							<a href="#index">Search all projects</a>
							<a href="https://tinomuzambi.com">About Tino</a>
						</div>
					</div>

					<aside className="archive-scope" aria-label="Archive scope">
						<p className="section-label">Archive scope</p>
						<dl>
							<div><dt>Projects</dt><dd>{projects.length}</dd></div>
							<div><dt>Selected</dt><dd>{featuredProjects.length}</dd></div>
							<div><dt>Active or maintained</dt><dd>{activeProjects}</dd></div>
							<div><dt>Last evidence audit</dt><dd>6 Sep 2026</dd></div>
						</dl>
						<p>
							Older experiments stay visible with explicit status. Unknown details stay unknown.
						</p>
					</aside>
				</div>
			</section>

			<FeaturedProjects projects={featuredProjects} />
			<Suspense fallback={<ProjectIndexFallback />}>
				<ProjectIndex projects={projects} />
			</Suspense>

			<section className="border-t-2 border-ink bg-lilac" aria-labelledby="machine-title">
				<div className="archive-shell machine-grid">
					<div>
						<p className="section-label">For agents and ATS tools</p>
						<h2 id="machine-title">One archive, several readable formats.</h2>
					</div>
					<div>
						<p>
							The project pages, plain-text index, JSON endpoint and structured data all derive from the same typed records.
						</p>
						<nav aria-label="Machine-readable project resources">
							<Link href="/llms.txt">Read llms.txt</Link>
							<Link href="/projects.json">Open projects.json</Link>
							<Link href="/sitemap.xml">View sitemap</Link>
						</nav>
					</div>
				</div>
			</section>

			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
		</main>
	)
}

function ProjectIndexFallback() {
	return (
		<section id="index" aria-labelledby="index-loading-title">
			<div className="archive-shell py-12 md:py-16">
				<p className="section-label">Complete project index</p>
				<h2 className="mt-2 font-display text-4xl font-[680] tracking-[-0.05em]" id="index-loading-title">
					Loading the searchable project record.
				</h2>
			</div>
		</section>
	)
}
