import type { IconType } from "react-icons"
import { SiNextdotjs, SiPython, SiR, SiTypescript } from "react-icons/si"

import type { ProjectRecord } from "@/types/projects"

const projectMarks: Record<string, { Icon: IconType; label: string }> = {
	"music-rec-path-signatures": { Icon: SiPython, label: "Python" },
	advice: { Icon: SiNextdotjs, label: "Next.js" },
	"clock-in-out-analysis": { Icon: SiR, label: "R" },
	recomments: { Icon: SiTypescript, label: "TypeScript" },
}

export function TechnologyAnchor({ project }: { project: ProjectRecord }) {
	const mark = projectMarks[project.slug]
	if (!mark) return null

	return (
		<div className="technology-anchor" aria-label={`Core technology: ${mark.label}`}>
			<mark.Icon aria-hidden="true" focusable="false" />
			<span>{mark.label}</span>
		</div>
	)
}
