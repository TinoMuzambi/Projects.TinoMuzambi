import { ImageResponse } from "next/og"

import { getProject, projects } from "@/content/projects"
import { categoryLabel, statusLabel } from "@/lib/projects"

export const alt = "Project record in Tino Muzambi's engineering archive"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const project = getProject(slug) ?? projects[0]

	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
					background: "#dcd6f7",
					color: "#000000",
					fontFamily: "Arial, sans-serif",
				}}
			>
				<div
					style={{
						display: "flex",
						width: 150,
						alignItems: "center",
						justifyContent: "center",
						borderRight: "4px solid #000000",
						background: "#6437b6",
						color: "#ffffff",
						fontSize: 34,
						fontWeight: 700,
					}}
				>
					T / M
				</div>
				<div
					style={{
						display: "flex",
						flex: 1,
						justifyContent: "center",
						flexDirection: "column",
						padding: "64px 74px",
					}}
				>
					<div style={{ color: "#6437b6", fontSize: 23, fontWeight: 700 }}>
						Tino Muzambi / Engineering archive
					</div>
					<div style={{ marginTop: 22, fontSize: 68, fontWeight: 800, letterSpacing: -3, lineHeight: 0.95 }}>
						{project.title}
					</div>
					<div style={{ display: "flex", marginTop: 34, gap: 16, fontSize: 23, fontWeight: 700 }}>
						<span>{categoryLabel[project.category]}</span>
						<span>/</span>
						<span>{statusLabel[project.status]}</span>
						<span>/</span>
						<span>{project.period.label}</span>
					</div>
				</div>
				<div style={{ width: 50, borderLeft: "4px solid #000000", background: "#58cdb7" }} />
			</div>
		),
		size
	)
}
