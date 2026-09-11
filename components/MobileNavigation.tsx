"use client"

import Link from "next/link"
import { useRef } from "react"

import { cvUrl, githubUrl, portfolioUrl } from "@/lib/projects"

export function MobileNavigation() {
	const detailsRef = useRef<HTMLDetailsElement>(null)

	const closeMenu = () => {
		if (detailsRef.current) detailsRef.current.open = false
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDetailsElement>) => {
		if (event.key !== "Escape" || !detailsRef.current?.open) return
		event.preventDefault()
		closeMenu()
		detailsRef.current.querySelector<HTMLElement>("summary")?.focus()
	}

	return (
		<details className="mobile-navigation" ref={detailsRef} onKeyDown={handleKeyDown}>
			<summary>Menu</summary>
			<nav aria-label="Mobile navigation" onClick={closeMenu}>
				<Link href="/#featured">Selected work</Link>
				<Link href="/#index">Project index</Link>
				<a href={portfolioUrl}>Main portfolio</a>
				<a href={githubUrl}>GitHub</a>
				<a href={cvUrl}>CV</a>
			</nav>
		</details>
	)
}
