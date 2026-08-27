import { strict as assert } from "assert";
import { suite } from "uvu";

import {
	createGetProjects,
	createProjectsPagePropsLoader,
	createStoryblokProjectFetcher,
	parseProjectStories,
} from "../utils/fetch";

const projects = suite("Storyblok projects");

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

const projectStory = (
	content: object = projectContent
) => ({ content });

projects(
	"maps the existing Storyblok project contract without changing content",
	async () => {
		const getProjects = createGetProjects(async () => [projectStory()]);

		assert.deepEqual(await getProjects(), [
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
	}
);

projects("preserves the existing false default for featured projects", () => {
	const { featured: _featured, ...contentWithoutFeatured } = projectContent;
	const [project] = parseProjectStories([projectStory(contentWithoutFeatured)]);

	assert.equal(project.name, "projects.tinomuzambi");
	assert.equal(project.featured, false);
});

projects(
	"rejects an empty CMS response instead of publishing an empty site",
	() => {
		assert.throws(
			() => parseProjectStories([]),
			/Storyblok returned no projects\./
		);
	}
);

projects("rejects malformed project fields at the CMS boundary", () => {
	assert.throws(
		() =>
			parseProjectStories([
				projectStory({ ...projectContent, keywords: ["next.js"] }),
			]),
		/Storyblok project 1 field "keywords" must be a string\./
	);
});

projects("reports request failures without upstream error details", async () => {
	const upstreamMessage = "request failed with private-token-value";
	const getProjects = createGetProjects(async () => {
		throw new Error(upstreamMessage);
	});

	await assert.rejects(getProjects, (error: Error) => {
		assert.equal(error.message, "Unable to load projects from Storyblok.");
		assert.equal(error.message.includes(upstreamMessage), false);
		return true;
	});
});

projects("fetches every Storyblok page instead of stopping at 25 projects", async () => {
	const stories = Array.from({ length: 26 }, (_, index) =>
		projectStory({
			...projectContent,
			name: `project-${index + 1}`,
			title: `Project ${index + 1}`,
		})
	);
	const calls: unknown[][] = [];
	let tokenSetCount = 0;
	const fetchProjectStories = createStoryblokProjectFetcher(
		{
			setToken: () => {
				tokenSetCount += 1;
			},
			getAll: async (...args) => {
				calls.push(args);
				return stories;
			},
		},
		() => "fixture-token"
	);

	const result = await createGetProjects(fetchProjectStories)();

	assert.equal(result.length, 26);
	assert.equal(tokenSetCount, 1);
	assert.deepEqual(calls, [
		[
			"cdn/stories",
			{
				per_page: 100,
				sort_by: "created_at:desc",
				starts_with: "projects/",
			},
			"stories",
		],
	]);
});

projects("names a missing Storyblok variable without exposing a value", async () => {
	const fetchProjectStories = createStoryblokProjectFetcher(
		{
			setToken: () => undefined,
			getAll: async () => [],
		},
		() => undefined
	);

	await assert.rejects(
		createGetProjects(fetchProjectStories),
		(error: Error) => {
			assert.equal(error.name, "ProjectConfigurationError");
			assert.equal(
				error.message,
				"Missing required REACT_APP_STORYBLOK_KEY environment variable."
			);
			return true;
		}
	);
});

projects("propagates CMS failures through the page data-loader boundary", async () => {
	const loadProjectsPageProps = createProjectsPagePropsLoader(async () => {
		throw new Error("Unable to load projects from Storyblok.");
	});

	await assert.rejects(
		loadProjectsPageProps,
		/Unable to load projects from Storyblok\./
	);
});

projects.run();
