import { ImageResponse } from "next/og"

export const alt = "Tino Muzambi engineering archive"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					display: "flex",
					width: "100%",
					height: "100%",
					background: "#ffffff",
					color: "#000000",
					fontFamily: "Arial, sans-serif",
				}}
			>
				<div
					style={{
						display: "flex",
						width: 180,
						alignItems: "center",
						justifyContent: "center",
						borderRight: "4px solid #000000",
						background: "#6437b6",
						color: "#ffffff",
						fontSize: 36,
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
						padding: "70px 82px",
					}}
				>
					<div style={{ color: "#6437b6", fontSize: 25, fontWeight: 700 }}>
						Tino Muzambi
					</div>
					<div style={{ marginTop: 22, fontSize: 78, fontWeight: 800, letterSpacing: -4, lineHeight: 0.95 }}>
						Engineering archive
					</div>
					<div style={{ marginTop: 34, fontSize: 26 }}>
						Research, data and software projects with the working notes attached.
					</div>
				</div>
				<div style={{ width: 55, borderLeft: "4px solid #000000", background: "#58cdb7" }} />
			</div>
		),
		size
	)
}
