import Link from "next/link"

import type { ProjectLinkKind, ProjectRecord } from "@/types/projects"

const shortLinkLabel: Record<ProjectLinkKind, string> = {
	source: "Source",
	demo: "Live project",
	documentation: "Documentation",
	report: "Report",
	portfolio: "Portfolio context",
}

type ProjectActionsProps = {
	project: ProjectRecord
	compact?: boolean
}

export function ProjectActions({ project, compact = false }: ProjectActionsProps) {
	const availableLinks = project.links.filter((item) => item.availability !== "unavailable")
	const visibleLinks = compact ? availableLinks.slice(0, 2) : availableLinks

	return (
		<nav className="project-actions" aria-label={`${project.title} links`}>
			<Link className="text-link" href={`/projects/${project.slug}`}>Case study</Link>
			{visibleLinks.map((item) => (
				<a
					className="text-link"
					href={item.url}
					key={`${item.kind}:${item.url}`}
					target="_blank"
					rel="noreferrer"
				>
					{compact ? shortLinkLabel[item.kind] : item.label}
					<span className="sr-only"> (opens in a new tab)</span>
				</a>
			))}
		</nav>
	)
}
