"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { categoryLabel, statusLabel } from "@/lib/projects"
import type { ProjectCategory, ProjectRecord, ProjectStatus } from "@/types/projects"

import { ProjectDrawer } from "./ProjectDrawer"

type ProjectIndexProps = {
	projects: ProjectRecord[]
}

type CategoryFilter = "all" | ProjectCategory
type StatusFilter = "all" | ProjectStatus

const categoryFilters: CategoryFilter[] = [
	"all",
	"research",
	"data",
	"product",
	"developer-tool",
	"experiment",
]

const statusFilters: StatusFilter[] = ["all", "active", "maintained", "completed", "published", "archived", "experiment"]

const matchesQuery = (project: ProjectRecord, query: string) => {
	const searchable = [
		project.title,
		project.shortDescription,
		project.category,
		project.status,
		...project.technologies,
		...project.topics,
		...(project.role ?? []),
	]
		.join(" ")
		.toLocaleLowerCase()

	return searchable.includes(query)
}

export function ProjectIndex({ projects }: ProjectIndexProps) {
	const searchParams = useSearchParams()
	const [query, setQuery] = useState(() => searchParams?.get("q") ?? "")
	const [category, setCategory] = useState<CategoryFilter>("all")
	const [status, setStatus] = useState<StatusFilter>("all")
	const [activeId, setActiveId] = useState(projects[0]?.id ?? "")

	const filteredProjects = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase()

		return projects.filter((project) => {
			const queryMatches = !normalizedQuery || matchesQuery(project, normalizedQuery)
			const categoryMatches = category === "all" || project.category === category
			const statusMatches = status === "all" || project.status === status

			return queryMatches && categoryMatches && statusMatches
		})
	}, [category, projects, query, status])

	const activeProject =
		filteredProjects.find((project) => project.id === activeId) ?? filteredProjects[0]

	useEffect(() => {
		const url = new URL(window.location.href)
		if (query.trim()) url.searchParams.set("q", query.trim())
		else url.searchParams.delete("q")
		window.history.replaceState({}, "", `${url.pathname}${url.search}#index`)
	}, [query])

	const clearFilters = () => {
		setQuery("")
		setCategory("all")
		setStatus("all")
	}

	return (
		<section id="index" aria-labelledby="index-title">
			<div className="archive-shell py-12 md:py-16">
				<div className="section-intro">
					<div>
						<p className="section-label">Complete project index</p>
						<h2 id="index-title">Search the whole working record.</h2>
					</div>
					<p>
						Current work, published studies and early learning projects share one index. Open a row to inspect what is known.
					</p>
				</div>

				<div className="index-controls">
					<label className="search-field">
						<span>Search by project, technology or topic</span>
						<div>
							<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
							<input
								type="search"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Try Python, research or Next.js"
							/>
							{query ? <button type="button" onClick={() => setQuery("")}>Clear</button> : null}
						</div>
					</label>

					<div className="filter-block">
						<p>Category</p>
						<div className="filter-options" role="group" aria-label="Filter by category">
							{categoryFilters.map((item) => (
								<button
									type="button"
									key={item}
									aria-pressed={category === item}
									onClick={() => setCategory(item)}
								>
									{item === "all" ? "All" : categoryLabel[item]}
								</button>
							))}
						</div>
					</div>

					<div className="filter-block">
						<p>Status</p>
						<div className="filter-options" role="group" aria-label="Filter by status">
							{statusFilters.map((item) => (
								<button
									type="button"
									key={item}
									aria-pressed={status === item}
									onClick={() => setStatus(item)}
								>
									{item === "all" ? "All" : statusLabel[item]}
								</button>
							))}
						</div>
					</div>
				</div>

				<div className="index-result-bar">
					<p aria-live="polite">
						Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
					</p>
					{query || category !== "all" || status !== "all" ? (
						<button type="button" onClick={clearFilters}>Reset index</button>
					) : null}
				</div>

				{filteredProjects.length ? (
					<div className="inspection-desk">
						<div className="project-registry" role="list">
							<div className="registry-head" aria-hidden="true">
								<span>Project</span><span>Category</span><span>State</span><span>Period</span><span />
							</div>
							{filteredProjects.map((project) => {
								const isActive = activeProject?.id === project.id

								return (
									<div className="registry-record" data-selected={isActive ? "true" : "false"} key={project.id} role="listitem">
										<div className="registry-row">
											<button
												type="button"
												aria-expanded={isActive}
												aria-controls={`drawer-${project.slug}`}
												onClick={() => setActiveId(project.id)}
											>
												<span className="registry-title">{project.title}</span>
												<span>{categoryLabel[project.category]}</span>
												<span>{statusLabel[project.status]}</span>
												<time>{project.period.label}</time>
												<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
											</button>
											<Link href={`/projects/${project.slug}`} aria-label={`Open ${project.title} project page`}>Open</Link>
										</div>
										{isActive ? (
											<div className="mobile-project-drawer" id={`drawer-${project.slug}`}>
												<ProjectDrawer project={project} compact />
											</div>
										) : null}
									</div>
								)
							})}
						</div>

						{activeProject ? (
							<aside className="desktop-project-drawer" aria-label="Selected project details">
								<div key={activeProject.id} id={`drawer-desktop-${activeProject.slug}`}>
									<ProjectDrawer project={activeProject} />
								</div>
							</aside>
						) : null}
					</div>
				) : (
					<div className="empty-index">
						<h3>No project matches those filters.</h3>
						<p>Try a broader technology or reset the index to see every record.</p>
						<button className="primary-action" type="button" onClick={clearFilters}>Reset index</button>
					</div>
				)}
			</div>
		</section>
	)
}
