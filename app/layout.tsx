import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import "@fontsource-variable/bricolage-grotesque"
import "@fontsource-variable/noto-sans"

import { SiteFooter } from "@/components/SiteFooter"
import { SiteHeader } from "@/components/SiteHeader"
import { siteUrl } from "@/lib/projects"

import "./globals.css"

const description =
	"Tino Muzambi's engineering archive, with selected research, data and software projects documented through implementation decisions, outcomes, limitations and public evidence."

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Engineering archive | Tino Muzambi",
		template: "%s | Tino Muzambi",
	},
	description,
	applicationName: "Tino Muzambi engineering archive",
	authors: [{ name: "Tino Muzambi", url: "https://tinomuzambi.com" }],
	creator: "Tino Muzambi",
	publisher: "Tino Muzambi",
	category: "technology",
	keywords: [
		"Tino Muzambi",
		"software engineering",
		"data science",
		"research engineering",
		"Next.js",
		"TypeScript",
		"Python",
		"R",
	],
	alternates: {
		canonical: "/",
		types: {
			"text/plain": "/llms.txt",
			"application/json": "/projects.json",
		},
	},
	openGraph: {
		type: "website",
		url: siteUrl,
		title: "Engineering archive | Tino Muzambi",
		description,
		siteName: "Tino Muzambi engineering archive",
		locale: "en_ZA",
	},
	twitter: {
		card: "summary_large_image",
		title: "Engineering archive | Tino Muzambi",
		description,
	},
	icons: {
		icon: "/favicon.ico",
		apple: "/logo192.png",
	},
	manifest: "/manifest.webmanifest",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	colorScheme: "light",
	themeColor: "#ffffff",
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en-ZA">
			<body>
				<a className="skip-link" href="#main-content">Skip to main content</a>
				<SiteHeader />
				{children}
				<SiteFooter />
			</body>
		</html>
	)
}
