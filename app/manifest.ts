import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Tino Muzambi engineering archive",
		short_name: "Tino projects",
		description: "An evidence-led archive of research, data and software projects.",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#6437b6",
		icons: [
			{ src: "/logo192.png", sizes: "192x192", type: "image/png" },
			{ src: "/logo512.png", sizes: "512x512", type: "image/png" },
		],
	}
}
