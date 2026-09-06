import type { MetadataRoute } from "next"

import { projects } from "@/content/projects"
import { siteUrl } from "@/lib/projects"

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: siteUrl, changeFrequency: "monthly", priority: 1 },
		{ url: `${siteUrl}/projects.json`, changeFrequency: "monthly", priority: 0.4 },
		{ url: `${siteUrl}/llms.txt`, changeFrequency: "monthly", priority: 0.4 },
		...projects.map((project) => ({
			url: `${siteUrl}/projects/${project.slug}`,
			changeFrequency: "monthly" as const,
			priority: project.featured.enabled ? 0.8 : 0.6,
		})),
	]
}
