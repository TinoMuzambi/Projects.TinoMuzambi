import { ProjectActions } from "@/components/ProjectActions"
import type { ProjectRecord } from "@/types/projects"

export function LivePortal({ project }: { project: ProjectRecord }) {
	const liveLink = project.links.find(
		(item) => ["demo", "report"].includes(item.kind) && item.availability === "live"
	)
	if (!liveLink) return null

	return (
		<section className="portal-section" aria-labelledby="portal-title">
			<div className="archive-shell portal-layout">
				<div className="portal-copy">
					<p className="section-label">Live portal</p>
					<h2 id="portal-title">A data story, in context.</h2>
					<p>
						Clock In/Out Analysis turns 250 daily records into a published account of office
						hours, study and ordinary commitments. The report and its source remain open for inspection.
					</p>
					<ProjectActions project={project} />
					<p className="portal-fallback">
						If the embedded project does not load, use the live project link above.
					</p>
				</div>

				<figure className="portal-figure">
					<div className="portal-contour portal-contour-outer" aria-hidden="true" />
					<div className="portal-contour portal-contour-inner" aria-hidden="true" />
					<div className="project-portal">
						<iframe
							title={`Live ${project.title} project`}
							src={project.previewUrl ?? liveLink.url}
							loading="lazy"
							referrerPolicy="strict-origin-when-cross-origin"
							sandbox="allow-forms allow-popups allow-same-origin allow-scripts"
						/>
					</div>
					<figcaption><span aria-hidden="true" />Live project. Scroll and interact inside the portal.</figcaption>
				</figure>
			</div>
		</section>
	)
}
