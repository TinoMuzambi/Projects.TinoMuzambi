import type { NextConfig } from "next"

import { projects } from "./content/projects"

const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	async redirects() {
		const projectRedirects = projects.flatMap((project) =>
			project.legacySlugs.map((legacySlug) => ({
				source: `/showcase/${legacySlug}`,
				destination: `/projects/${project.slug}`,
				permanent: true,
			}))
		)

		return [
			...projectRedirects,
			{
				source: "/featured",
				destination: "/#featured",
				permanent: true,
			},
			{
				source: "/search/:query",
				destination: "/?q=:query#index",
				permanent: false,
			},
			{
				source: "/tags/:path*",
				destination: "/#index",
				permanent: false,
			},
		]
	},
}

export default nextConfig
