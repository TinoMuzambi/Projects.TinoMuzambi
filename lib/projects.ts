import type { ProjectCategory, ProjectStatus } from "@/types/projects"

export const siteUrl = "https://projects.tinomuzambi.com"
export const portfolioUrl = "https://tinomuzambi.com"
export const githubUrl = "https://github.com/TinoMuzambi"
export const linkedinUrl = "https://www.linkedin.com/in/tinomuzambi/"
export const cvUrl = "https://tinomuzambi.com/tinotenda-muzambi-cv.pdf"
export const email = "tino@tinomuzambi.com"

export const categoryLabel: Record<ProjectCategory, string> = {
	research: "Research",
	data: "Data",
	product: "Product",
	systems: "Systems",
	"developer-tool": "Developer tool",
	experiment: "Experiment",
}

export const statusLabel: Record<ProjectStatus, string> = {
	active: "Active",
	maintained: "Maintained",
	completed: "Completed",
	published: "Published",
	archived: "Archived",
	experiment: "Experiment",
}
