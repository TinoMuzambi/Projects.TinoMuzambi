import Link from "next/link"

import { categoryLabel, statusLabel } from "@/lib/projects"
import type { ProjectRecord } from "@/types/projects"

type ProjectDrawerProps = {
	project: ProjectRecord
	compact?: boolean
}

const firstOrFallback = (items: string[] | null, fallback: string) => items?.[0] ?? fallback

export function ProjectDrawer({ project, compact = false }: ProjectDrawerProps) {
	const availableLink = project.links.find((item) => item.availability !== "unavailable")

	return (
		<div className="project-drawer" data-compact={compact ? "true" : "false"}>
			<div className="flex items-start justify-between gap-5 border-b border-ink pb-4">
				<div>
					<p className="section-label">Project record</p>
					<h3 className="mt-2 font-display text-2xl font-[680] leading-tight tracking-[-0.035em] md:text-3xl">
						{project.title}
					</h3>
				</div>
				<span className="status-stamp" data-status={project.status}>
					{statusLabel[project.status]}
				</span>
			</div>

			<dl className="drawer-facts">
				<div><dt>Category</dt><dd>{categoryLabel[project.category]}</dd></div>
				<div><dt>Period</dt><dd>{project.period.label}</dd></div>
				<div><dt>Evidence</dt><dd>{project.verification.publiclyVerifiable ? "Public" : "Partial"}</dd></div>
			</dl>

			<div className="drawer-section">
				<h4>Problem</h4>
				<p>{project.problem ?? "No fuller problem statement is available in the public record."}</p>
			</div>
			<div className="drawer-section">
				<h4>Contribution</h4>
				<p>{firstOrFallback(project.contribution, "A fuller individual contribution statement is not available in public materials.")}</p>
			</div>
			{!compact && project.decisions.length > 0 ? (
				<div className="drawer-section">
					<h4>Engineering decision</h4>
					<p>{project.decisions[0].decision}</p>
				</div>
			) : null}
			<div className="drawer-section">
				<h4>Limit to keep in view</h4>
				<p>{firstOrFallback(project.limitations, "No specific limitation is recorded in the public archive.")}</p>
			</div>

			<div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink pt-5 text-sm font-bold">
				<Link className="primary-action" href={`/projects/${project.slug}`}>
					Read the full project record
				</Link>
				{availableLink ? (
					<a className="text-link" href={availableLink.url} target="_blank" rel="noreferrer">
						{availableLink.label}
						<span className="sr-only"> (opens in a new tab)</span>
					</a>
				) : null}
			</div>
		</div>
	)
}
