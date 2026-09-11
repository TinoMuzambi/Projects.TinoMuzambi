import assert from "node:assert/strict"
import test from "node:test"

import { featuredProjects, projects } from "@/content/projects"
import { llmsText, projectArchiveJson } from "@/lib/public-data"

const legacySlugs = [
	"clock-in-out",
	"trainerr",
	"advice",
	"landon-hotel",
	"colour-schemes",
	"tailwind-expo",
	"paystack",
	"recomments",
	"marvel-characters",
	"clash-ratios",
	"ml-video-annotations",
	"tweet-streams",
	"next-blog",
	"cubingalgos",
	"tinomuzambi",
	"working-with-clash",
	"table-time",
	"projects.tinomuzambi",
	"whatsapp-analyser",
	"remove-contractions",
	"amount-divider",
	"blog.tinomuzambi",
	"twibot",
	"go-conversion-tool",
	"automate-mail",
	"android-calculator",
	"student-number-generator",
]

test("project IDs, slugs and legacy routes are unique", () => {
	assert.equal(new Set(projects.map((project) => project.id)).size, projects.length)
	assert.equal(new Set(projects.map((project) => project.slug)).size, projects.length)

	const migratedSlugs = projects.flatMap((project) => project.legacySlugs)
	assert.equal(new Set(migratedSlugs).size, migratedSlugs.length)
	for (const slug of legacySlugs) assert.ok(migratedSlugs.includes(slug), `Missing ${slug}`)
})

test("only the four required projects are featured", () => {
	const required = [
		"music-rec-path-signatures",
		"advice",
		"clock-in-out-analysis",
		"recomments",
	]
	const featuredSlugs = featuredProjects.map((project) => project.slug)

	assert.deepEqual(featuredSlugs, required)
	assert.equal(featuredProjects[0]?.title, "Music Recommendation Evaluation")
})

test("machine-readable outputs use the canonical project records", () => {
	assert.equal(projectArchiveJson.projectCount, projects.length)
	assert.equal(projectArchiveJson.projects.length, projects.length)

	for (const project of projects) {
		assert.ok(llmsText.includes(project.id))
		assert.ok(llmsText.includes(`/projects/${project.slug}`))
	}
})

test("public project copy avoids em dashes and semicolons", () => {
	const publicCopy = JSON.stringify(projects)
	assert.doesNotMatch(publicCopy, /—/)
	assert.doesNotMatch(publicCopy, /;/)
})

test("every external project link records its audit date", () => {
	for (const project of projects) {
		for (const item of project.links) {
			assert.match(item.url, /^https:\/\//)
			assert.equal(item.checkedAt, "2026-09-11")
		}
	}
})

test("known retired deployments are never exposed as live actions", () => {
	for (const slug of ["advice", "recomments"]) {
		const project = projects.find((item) => item.slug === slug)
		assert.ok(project)
		assert.ok(project.links.some((item) => item.kind === "demo" && item.availability === "unavailable"))
		assert.equal(
			project.links.some((item) => item.kind === "demo" && item.availability === "live"),
			false
		)
	}
})
