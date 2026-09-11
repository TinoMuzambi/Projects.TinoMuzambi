export type ProjectStatus =
	| "active"
	| "maintained"
	| "completed"
	| "published"
	| "archived"
	| "experiment"

export type ProjectCategory =
	| "research"
	| "data"
	| "product"
	| "systems"
	| "developer-tool"
	| "experiment"

export type ProjectLinkKind =
	| "source"
	| "demo"
	| "documentation"
	| "report"
	| "portfolio"

export type ProjectLink = {
	kind: ProjectLinkKind
	label: string
	url: string
	availability: "live" | "archived" | "unverified" | "unavailable"
	checkedAt: string | null
}

export type ProjectScreenshot = {
	src: string
	alt: string
	width: number
	height: number
}

export type ProjectPeriod = {
	label: string
	start: string | null
	end: string | null
	precision: "day" | "month" | "year" | "approximate"
}

export type ProjectVerification = {
	publiclyVerifiable: boolean
	sources: string[]
	checkedAt: string | null
	notes: string | null
}

export type ProjectRecord = {
	id: `project:${string}`
	slug: string
	legacySlugs: string[]
	title: string
	shortDescription: string
	category: ProjectCategory
	status: ProjectStatus
	period: ProjectPeriod
	featured: {
		enabled: boolean
		order: number | null
		rationale: string | null
	}
	technologies: string[]
	topics: string[]
	role: string[] | null
	problem: string | null
	contribution: string[] | null
	implementation: string[] | null
	decisions: Array<{
		decision: string
		rationale: string | null
	}>
	outcomes: string[] | null
	limitations: string[] | null
	links: ProjectLink[]
	screenshots?: ProjectScreenshot[]
	relatedExperience: Array<{
		label: string
		url: string
	}>
	verification: ProjectVerification
}
