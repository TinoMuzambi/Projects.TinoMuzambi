"use client"

import { useEffect, useMemo, useState } from "react"

import { ProjectActions } from "@/components/ProjectActions"
import { categoryLabel, statusLabel } from "@/lib/projects"
import type { ProjectRecord } from "@/types/projects"

import { ProjectDrawer } from "./ProjectDrawer"

type ProjectIndexProps = {
	projects: ProjectRecord[]
}

type ProjectArea = "all" | "web" | "mobile" | "data-ml" | "systems-automation" | "experiments"
type AvailabilityFilter = "all" | "live" | "source" | "archived" | "case-study"

const areaFilters: Array<{ value: ProjectArea; label: string }> = [
	{ value: "all", label: "All areas" },
	{ value: "web", label: "Web" },
	{ value: "mobile", label: "Mobile" },
	{ value: "data-ml", label: "Data and ML" },
	{ value: "systems-automation", label: "Systems and automation" },
	{ value: "experiments", label: "Experiments" },
]

const availabilityFilters: Array<{ value: AvailabilityFilter; label: string }> = [
	{ value: "all", label: "All availability" },
	{ value: "live", label: "Live" },
	{ value: "source", label: "Source available" },
	{ value: "archived", label: "Archived" },
	{ value: "case-study", label: "Case study" },
]

const webTerms = ["next.js", "react", "html", "css", "flask", "firebase", "storyblok", "web"]
const mobileTerms = ["mobile", "react native", "flutter", "dart", "android", "ios", "kotlin", "expo"]
const dataTerms = [
	"data",
	"machine learning",
	"recommendation",
	"python",
	"quarto",
	"tidyverse",
	"shiny",
	"netlogo",
	"ml5.js",
	"scikit-learn",
	"librosa",
]
const systemTerms = [
	"automation",
	"docker",
	"traefik",
	"server",
	"api",
	"cli",
	"email",
	"networking",
	"monitoring",
	"developer tool",
]

const projectTerms = (project: ProjectRecord) =>
	[
		project.title,
		project.shortDescription,
		project.category,
		...project.technologies,
		...project.topics,
	]
		.join(" ")
		.toLocaleLowerCase()

const includesTerm = (haystack: string, terms: string[]) => terms.some((term) => haystack.includes(term))

const projectAreas = (project: ProjectRecord): Exclude<ProjectArea, "all">[] => {
	const searchable = projectTerms(project)
	const areas: Exclude<ProjectArea, "all">[] = []

	if (project.category === "product" || includesTerm(searchable, webTerms)) areas.push("web")
	if (includesTerm(searchable, mobileTerms)) areas.push("mobile")
	if (["research", "data"].includes(project.category) || includesTerm(searchable, dataTerms)) areas.push("data-ml")
	if (project.category === "systems" || project.category === "developer-tool" || includesTerm(searchable, systemTerms)) {
		areas.push("systems-automation")
	}
	if (project.category === "experiment" || project.status === "experiment") areas.push("experiments")

	return [...new Set(areas)]
}

const areaLabel = (area: Exclude<ProjectArea, "all">) =>
	areaFilters.find((item) => item.value === area)?.label ?? area

const matchesAvailability = (project: ProjectRecord, filter: AvailabilityFilter) => {
	if (filter === "all") return true
	if (filter === "live") {
		return project.links.some(
			(item) => ["demo", "report"].includes(item.kind) && item.availability === "live"
		)
	}
	if (filter === "source") {
		return project.links.some((item) => item.kind === "source" && item.availability !== "unavailable")
	}
	if (filter === "archived") return project.status === "archived"

	return Boolean(
		project.problem &&
		(project.contribution?.length || project.implementation?.length || project.decisions.length)
	)
}

const isArea = (value: string | null): value is ProjectArea =>
	areaFilters.some((item) => item.value === value)

const isAvailability = (value: string | null): value is AvailabilityFilter =>
	availabilityFilters.some((item) => item.value === value)

export function ProjectIndex({ projects }: ProjectIndexProps) {
	const [query, setQuery] = useState("")
	const [area, setArea] = useState<ProjectArea>("all")
	const [availability, setAvailability] = useState<AvailabilityFilter>("all")
	const [technology, setTechnology] = useState("all")
	const [activeId, setActiveId] = useState("")
	const [hasReadUrl, setHasReadUrl] = useState(false)

	const technologies = useMemo(
		() => [...new Set(projects.flatMap((project) => project.technologies))].sort((a, b) => a.localeCompare(b)),
		[projects]
	)

	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const initialArea = params.get("area")
		const initialAvailability = params.get("view")
		const initialTechnology = params.get("technology")

		const frame = requestAnimationFrame(() => {
			setQuery(params.get("q") ?? "")
			if (isArea(initialArea)) setArea(initialArea)
			if (isAvailability(initialAvailability)) setAvailability(initialAvailability)
			if (initialTechnology && technologies.includes(initialTechnology)) setTechnology(initialTechnology)
			setHasReadUrl(true)
		})

		return () => cancelAnimationFrame(frame)
	}, [technologies])

	useEffect(() => {
		if (!hasReadUrl) return

		const url = new URL(window.location.href)
		if (query.trim()) url.searchParams.set("q", query.trim())
		else url.searchParams.delete("q")
		if (area !== "all") url.searchParams.set("area", area)
		else url.searchParams.delete("area")
		if (availability !== "all") url.searchParams.set("view", availability)
		else url.searchParams.delete("view")
		if (technology !== "all") url.searchParams.set("technology", technology)
		else url.searchParams.delete("technology")

		window.history.replaceState({}, "", `${url.pathname}${url.search}#index`)
	}, [area, availability, hasReadUrl, query, technology])

	const filteredProjects = useMemo(() => {
		const normalizedQuery = query.trim().toLocaleLowerCase()

		return projects.filter((project) => {
			const queryMatches = !normalizedQuery || [
				projectTerms(project),
				...(project.role ?? []).map((item) => item.toLocaleLowerCase()),
			].some((item) => item.includes(normalizedQuery))
			const areaMatches = area === "all" || projectAreas(project).includes(area)
			const availabilityMatches = matchesAvailability(project, availability)
			const technologyMatches = technology === "all" || project.technologies.includes(technology)

			return queryMatches && areaMatches && availabilityMatches && technologyMatches
		})
	}, [area, availability, projects, query, technology])

	const clearFilters = () => {
		setQuery("")
		setArea("all")
		setAvailability("all")
		setTechnology("all")
		setActiveId("")
	}

	const hasFilters = query || area !== "all" || availability !== "all" || technology !== "all"

	return (
		<section id="index" aria-labelledby="index-title">
			<div className="archive-shell index-shell">
				<header className="section-heading index-heading">
					<p className="section-label">Complete project index</p>
					<h2 id="index-title">The whole working record.</h2>
				</header>

				<div className="index-controls">
					<label className="search-field">
						<span>Search by project, technology or topic</span>
						<div>
							<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
							<input
								type="search"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Try Python, mobile or R"
							/>
							{query ? <button type="button" onClick={() => setQuery("")}>Clear</button> : null}
						</div>
					</label>

					<label className="filter-select">
						<span>Area</span>
						<select name="area" value={area} onChange={(event) => setArea(event.target.value as ProjectArea)}>
							{areaFilters.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
						</select>
					</label>

					<label className="filter-select">
						<span>Availability</span>
						<select
							name="view"
							value={availability}
							onChange={(event) => setAvailability(event.target.value as AvailabilityFilter)}
						>
							{availabilityFilters.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
						</select>
					</label>

					<details className="more-filters">
						<summary>More filters</summary>
						<label>
							<span>Technology</span>
							<select name="technology" value={technology} onChange={(event) => setTechnology(event.target.value)}>
								<option value="all">All technologies</option>
								{technologies.map((item) => <option value={item} key={item}>{item}</option>)}
							</select>
						</label>
					</details>
				</div>

				<div className="index-result-bar">
					<p className="index-count" aria-live="polite">
						Showing <strong>{filteredProjects.length}</strong> of <strong>{projects.length}</strong> projects
					</p>
					{hasFilters ? <button type="button" onClick={clearFilters}>Clear filters</button> : null}
				</div>

				{filteredProjects.length ? (
					<div className="project-registry" role="list">
						<div className="registry-head" aria-hidden="true">
							<span>Year</span><span>Project and summary</span><span>Area</span><span>Status</span><span>Key technologies</span><span>Links</span>
						</div>
						{filteredProjects.map((project) => {
							const isActive = activeId === project.id
							const primaryArea = projectAreas(project)[0]

							return (
								<div className="registry-record" data-project-row data-selected={isActive ? "true" : "false"} key={project.id} role="listitem">
									<div className="registry-row">
										<button
											className="registry-disclosure"
											type="button"
											aria-expanded={isActive}
											aria-controls={`drawer-${project.slug}`}
											onClick={() => setActiveId(isActive ? "" : project.id)}
										>
											<time>{project.period.end ?? project.period.start ?? project.period.label}</time>
											<span className="registry-project">
												<span className="registry-title">{project.title}</span>
												<span className="registry-summary">{project.shortDescription}</span>
											</span>
											<span>{primaryArea ? areaLabel(primaryArea) : categoryLabel[project.category]}</span>
											<span>{statusLabel[project.status]}</span>
											<span className="registry-stack">{project.technologies.slice(0, 3).join(", ")}</span>
											<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
										</button>
										<ProjectActions project={project} compact />
									</div>
									{isActive ? (
										<div className="inline-project-drawer" id={`drawer-${project.slug}`}>
											<ProjectDrawer project={project} compact />
										</div>
									) : null}
								</div>
							)
						})}
					</div>
				) : (
					<div className="empty-index">
						<h3>No project matches those filters.</h3>
						<p>Try another term or clear the filters to restore the full archive.</p>
						<button className="primary-action" type="button" onClick={clearFilters}>Clear filters</button>
					</div>
				)}
			</div>
		</section>
	)
}
