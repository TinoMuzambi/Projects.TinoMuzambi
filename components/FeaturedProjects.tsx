import { ProjectActions } from "@/components/ProjectActions"
import { TechnologyAnchor } from "@/components/TechnologyAnchor"
import { categoryLabel, statusLabel } from "@/lib/projects"
import type { ProjectRecord } from "@/types/projects"

function ProjectMeta({ project }: { project: ProjectRecord }) {
	return (
		<dl className="selected-meta">
			<div><dt>Role</dt><dd>{project.role?.join(", ") ?? "Collaborative role not separated"}</dd></div>
			<div><dt>Category</dt><dd>{categoryLabel[project.category]}</dd></div>
			<div><dt>Status</dt><dd>{statusLabel[project.status]}</dd></div>
			<div><dt>Period</dt><dd>{project.period.label}</dd></div>
		</dl>
	)
}

function SelectedStack({ project }: { project: ProjectRecord }) {
	return (
		<ul className="selected-stack" aria-label={`${project.title} key technologies`}>
			{project.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}
		</ul>
	)
}

export function FeaturedProjects({ projects }: { projects: ProjectRecord[] }) {
	const [leadProject, ...supportingProjects] = projects
	if (!leadProject) return null

	return (
		<section className="selected-section" id="featured" aria-labelledby="featured-title">
			<div className="archive-shell selected-shell">
				<header className="section-heading">
					<p className="section-label">Selected work</p>
					<h2 id="featured-title">Four useful places to start.</h2>
				</header>

				<div className="selected-composition">
					<article className="selected-lead" data-featured-project>
						<TechnologyAnchor project={leadProject} />
						<p className="selected-kicker">Lead case study</p>
						<h3>{leadProject.title}</h3>
						<p className="selected-summary">{leadProject.shortDescription}</p>
						<ProjectMeta project={leadProject} />
						<SelectedStack project={leadProject} />
						<ProjectActions project={leadProject} />
					</article>

					<div className="selected-supporting">
						{supportingProjects.map((project) => (
							<article className="selected-record" data-featured-project key={project.id}>
								<div className="selected-record-copy">
									<TechnologyAnchor project={project} />
									<h3>{project.title}</h3>
									<p>{project.shortDescription}</p>
								</div>
								<ProjectMeta project={project} />
								<SelectedStack project={project} />
								<ProjectActions project={project} compact />
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
