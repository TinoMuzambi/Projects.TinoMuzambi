import { projects } from "@/content/projects"
import { categoryLabel, siteUrl, statusLabel } from "@/lib/projects"
import type { ProjectRecord } from "@/types/projects"

export const projectArchiveJson = {
	schemaVersion: "1.0",
	title: "Tino Muzambi engineering archive",
	description:
		"Public research, data, product and engineering project records with implementation notes and verification context.",
	canonicalUrl: siteUrl,
	lastAudited: "2026-09-11",
	projectCount: projects.length,
	projects: projects.map((project) => ({
		...project,
		url: `${siteUrl}/projects/${project.slug}`,
	})),
}

const projectText = (project: ProjectRecord) => {
	const externalLinks = project.links
		.map((item) => `- ${item.label}${item.availability === "unavailable" ? " [unavailable]" : ""}: ${item.url}`)
		.join("\n")

	return [
		`## ${project.title}`,
		`Stable ID: ${project.id}`,
		`Project page: ${siteUrl}/projects/${project.slug}`,
		`Category: ${categoryLabel[project.category]}`,
		`Status: ${statusLabel[project.status]}`,
		`Period: ${project.period.label}`,
		`Summary: ${project.shortDescription}`,
		`Public verification: ${project.verification.publiclyVerifiable ? "Yes" : "Partial"}`,
		externalLinks ? `Links:\n${externalLinks}` : "Links: No public external link recorded",
	].join("\n")
}

export const llmsText = [
	"# Tino Muzambi engineering archive",
	"",
	"This is the canonical plain-text index for projects.tinomuzambi.com.",
	"The human pages, projects.json and this file derive from the same typed project records.",
	"I use Claude Code and Codex to accelerate delivery, grounded in software and computer science foundations built before generative AI.",
	"",
	`Main portfolio: https://tinomuzambi.com`,
	`Projects JSON: ${siteUrl}/projects.json`,
	`Sitemap: ${siteUrl}/sitemap.xml`,
	"",
	`Project count: ${projects.length}`,
	"",
	...projects.flatMap((project) => [projectText(project), ""]),
].join("\n")

export const archiveJsonLd = {
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	name: "Tino Muzambi engineering archive",
	url: siteUrl,
	description:
		"An evidence-led archive of Tino Muzambi's research, data and software projects.",
	author: {
		"@type": "Person",
		name: "Tino Muzambi",
		url: "https://tinomuzambi.com",
		sameAs: ["https://github.com/TinoMuzambi", "https://www.linkedin.com/in/tinomuzambi/"],
	},
	mainEntity: {
		"@type": "ItemList",
		numberOfItems: projects.length,
		itemListElement: projects.map((project, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: project.title,
			url: `${siteUrl}/projects/${project.slug}`,
		})),
	},
}

export const getProjectJsonLd = (project: ProjectRecord) => {
	const source = project.links.find((item) => item.kind === "source" && item.availability !== "unavailable")
	const demo = project.links.find(
		(item) => (item.kind === "demo" || item.kind === "report") && item.availability !== "unavailable"
	)

	return {
		"@context": "https://schema.org",
		"@type": source ? "SoftwareSourceCode" : "CreativeWork",
		"@id": `${siteUrl}/projects/${project.slug}#project`,
		name: project.title,
		description: project.shortDescription,
		url: `${siteUrl}/projects/${project.slug}`,
		author: {
			"@type": "Person",
			name: "Tino Muzambi",
			url: "https://tinomuzambi.com",
		},
		dateCreated: project.period.start ?? undefined,
		keywords: [...project.technologies, ...project.topics],
		codeRepository: source?.url,
		sameAs: demo?.url,
		programmingLanguage: project.technologies,
	}
}
