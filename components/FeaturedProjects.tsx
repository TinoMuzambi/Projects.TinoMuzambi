import Link from "next/link"

import { categoryLabel, statusLabel } from "@/lib/projects"
import type { ProjectRecord } from "@/types/projects"

export function FeaturedProjects({ projects }: { projects: ProjectRecord[] }) {
	return (
		<section className="border-b-2 border-ink" id="featured" aria-labelledby="featured-title">
			<div className="archive-shell py-12 md:py-16">
				<div className="section-intro">
					<div>
						<p className="section-label">Selected work</p>
						<h2 id="featured-title">Start with the strongest evidence.</h2>
					</div>
					<p>
						Six projects chosen for technical depth, relevance and the amount of public work that can be inspected.
					</p>
				</div>

				<div className="mt-10 border-t-2 border-ink">
					<div className="featured-table-head" aria-hidden="true">
						<span>Project</span>
						<span>Why it matters</span>
						<span>State</span>
						<span>Period</span>
					</div>
					{projects.map((project) => (
						<article className="featured-row" key={project.id}>
							<div>
								<p className="featured-category">{categoryLabel[project.category]}</p>
								<h3>
									<Link href={`/projects/${project.slug}`}>{project.title}</Link>
								</h3>
							</div>
							<p>{project.shortDescription}</p>
							<span className="status-stamp" data-status={project.status}>{statusLabel[project.status]}</span>
							<time>{project.period.label}</time>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
