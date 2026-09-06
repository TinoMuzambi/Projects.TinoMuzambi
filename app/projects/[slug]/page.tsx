import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { getProject, projects } from "@/content/projects"
import { categoryLabel, siteUrl, statusLabel } from "@/lib/projects"
import { getProjectJsonLd } from "@/lib/public-data"

type ProjectPageProps = {
	params: Promise<{ slug: string }>
}

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
	const { slug } = await params
	const project = getProject(slug)
	if (!project) return {}

	const url = `${siteUrl}/projects/${project.slug}`

	return {
		title: project.title,
		description: project.shortDescription,
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			url,
			title: `${project.title} | Tino Muzambi`,
			description: project.shortDescription,
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} | Tino Muzambi`,
			description: project.shortDescription,
		},
	}
}

function NarrativeList({ items, fallback }: { items: string[] | null; fallback: string }) {
	if (!items?.length) return <p className="unknown-note">{fallback}</p>

	return items.length === 1 ? <p>{items[0]}</p> : <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params
	const project = getProject(slug)
	if (!project) notFound()

	const related = projects
		.filter((item) => item.slug !== project.slug && item.category === project.category)
		.slice(0, 4)
	const jsonLd = JSON.stringify(getProjectJsonLd(project)).replace(/</g, "\\u003c")

	return (
		<main id="main-content" className="project-page">
			<section className="border-b-2 border-ink">
				<div className="archive-shell project-hero">
					<div className="project-hero-copy">
						<Link className="back-link" href="/#index">Back to project index</Link>
						<p className="section-label text-plum">{project.id}</p>
						<h1>{project.title}</h1>
						<p>{project.shortDescription}</p>
					</div>
					<aside className="project-facts" aria-label="Project facts">
						<dl>
							<div><dt>Status</dt><dd>{statusLabel[project.status]}</dd></div>
							<div><dt>Category</dt><dd>{categoryLabel[project.category]}</dd></div>
							<div><dt>Period</dt><dd>{project.period.label}</dd></div>
							<div><dt>Role</dt><dd>{project.role?.join(", ") ?? "Not separated in public evidence"}</dd></div>
							<div><dt>Public evidence</dt><dd>{project.verification.publiclyVerifiable ? "Available" : "Partial"}</dd></div>
						</dl>
					</aside>
				</div>
			</section>

			<div className="archive-shell project-body">
				<article className="project-narrative">
					<section aria-labelledby="problem-heading">
						<p className="section-label">Why it exists</p>
						<h2 id="problem-heading">The problem</h2>
						<p>{project.problem ?? "No fuller problem statement is available in public materials."}</p>
					</section>

					<section aria-labelledby="contribution-heading">
						<p className="section-label">What I built</p>
						<h2 id="contribution-heading">Contribution</h2>
						<NarrativeList
							items={project.contribution}
							fallback="A fuller individual contribution statement is not available in public materials."
						/>
					</section>

					<section aria-labelledby="implementation-heading">
						<p className="section-label">Technical implementation</p>
						<h2 id="implementation-heading">How it works</h2>
						<NarrativeList
							items={project.implementation}
							fallback="The public record does not support a more detailed implementation account."
						/>
					</section>

					<section aria-labelledby="decisions-heading">
						<p className="section-label">Engineering choices</p>
						<h2 id="decisions-heading">Decisions and rationale</h2>
						{project.decisions.length ? (
							<dl className="decision-list">
								{project.decisions.map((item) => (
									<div key={item.decision}>
										<dt>{item.decision}</dt>
										{item.rationale ? <dd>{item.rationale}</dd> : null}
									</div>
								))}
							</dl>
						) : <p className="unknown-note">No decision rationale is recorded in public materials.</p>}
					</section>

					<section aria-labelledby="outcomes-heading">
						<p className="section-label">Current state</p>
						<h2 id="outcomes-heading">Outcomes and limitations</h2>
						<div className="outcome-grid">
							<div>
								<h3>Outcome</h3>
								<NarrativeList items={project.outcomes} fallback="No public outcome claim is recorded." />
							</div>
							<div>
								<h3>Limitations</h3>
								<NarrativeList items={project.limitations} fallback="No specific limitation is recorded." />
							</div>
						</div>
					</section>
				</article>

				<aside className="project-sidebar">
					<section>
						<h2>Technology</h2>
						<ul className="technology-list">{project.technologies.map((item) => <li key={item}>{item}</li>)}</ul>
					</section>

					<section>
						<h2>Project links</h2>
						{project.links.length ? (
							<ul className="project-link-list">
								{project.links.map((item) => (
									<li key={`${item.kind}:${item.url}`}>
										<a href={item.url} target="_blank" rel="noreferrer">
											{item.label}<span className="sr-only"> (opens in a new tab)</span>
										</a>
										<span>Checked {item.checkedAt ?? "date unavailable"}</span>
									</li>
								))}
							</ul>
						) : <p>No public external link is recorded.</p>}
					</section>

					<section>
						<h2>Verification note</h2>
						<p>{project.verification.notes ?? "No additional verification note is recorded."}</p>
					</section>

					{project.relatedExperience.length ? (
						<section>
							<h2>Related portfolio record</h2>
							<ul className="project-link-list">
								{project.relatedExperience.map((item) => <li key={item.url}><a href={item.url}>{item.label}</a></li>)}
							</ul>
						</section>
					) : null}
				</aside>
			</div>

			{related.length ? (
				<section className="border-t-2 border-ink bg-interface" aria-labelledby="related-title">
					<div className="archive-shell related-projects">
						<p className="section-label">Continue in {categoryLabel[project.category]}</p>
						<h2 id="related-title">Related project records</h2>
						<ul>
							{related.map((item) => <li key={item.id}><Link href={`/projects/${item.slug}`}>{item.title}</Link></li>)}
						</ul>
					</div>
				</section>
			) : null}

			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
		</main>
	)
}
