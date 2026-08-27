import { expect, test } from "@playwright/test";

import { createGetProjects, parseProjectStories } from "../utils/fetch";

const projectContent = {
	name: "projects.tinomuzambi",
	shortname: "PT",
	title: "Projects.TinoMuzambi",
	content: "First paragraph.\nSecond paragraph.",
	link: "https://projects.tinomuzambi.com",
	github: "https://github.com/TinoMuzambi/Projects.TinoMuzambi",
	keywords: "next.js\ntypescript",
	featured: true,
};

test("maps the existing Storyblok project contract without changing content", async () => {
	const getProjects = createGetProjects(async () => ({
		data: { stories: [{ content: projectContent }] },
	}));

	await expect(getProjects()).resolves.toEqual([
		{
			name: "projects.tinomuzambi",
			shortname: "PT",
			title: "Projects.TinoMuzambi",
			content: ["First paragraph.", "Second paragraph."],
			link: "https://projects.tinomuzambi.com",
			github: "https://github.com/TinoMuzambi/Projects.TinoMuzambi",
			keywords: ["next.js", "typescript"],
			featured: true,
		},
	]);
});

test("preserves the existing false default for featured projects", () => {
	const { featured: _featured, ...contentWithoutFeatured } = projectContent;

	expect(
		parseProjectStories({
			data: { stories: [{ content: contentWithoutFeatured }] },
		})
	).toEqual([
		expect.objectContaining({
			name: "projects.tinomuzambi",
			featured: false,
		}),
	]);
});

test("rejects an empty CMS response instead of publishing an empty site", () => {
	expect(() => parseProjectStories({ data: { stories: [] } })).toThrow(
		"Storyblok returned no projects."
	);
});

test("rejects malformed project fields at the CMS boundary", () => {
	expect(() =>
		parseProjectStories({
			data: {
				stories: [
					{
						content: { ...projectContent, keywords: ["next.js"] },
					},
				],
			},
		})
	).toThrow('Storyblok project 1 field "keywords" must be a string.');
});

test("reports request failures without leaking upstream error details", async () => {
	const upstreamMessage = "request failed with private-token-value";
	const getProjects = createGetProjects(async () => {
		throw new Error(upstreamMessage);
	});

	await expect(getProjects()).rejects.toThrow(
		"Unable to load projects from Storyblok."
	);
	await getProjects().catch((error: Error) => {
		expect(error.message).not.toContain(upstreamMessage);
	});
});
