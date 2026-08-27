import { strict as assert } from "assert";
import StoryblokClient from "storyblok-js-client";
import { suite } from "uvu";

import {
	createGetProjects,
	createProjectsPagePropsLoader,
	createStoryblokProjectFetcher,
	parseProjectStories,
	ProjectConfigurationError,
	ProjectRequestError,
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

const projectStory = (content: object = projectContent) => ({ content });

const storyblokRequestError = (
	status: number | undefined,
	message: string
): object => {
	if (status === undefined) return { message };

	return {
		message,
		status,
		response: {
			data: { error: message },
			headers: {},
			status,
			statusText: "",
		},
	};
};

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
	const contentWithoutFeatured: Partial<typeof projectContent> = {
		...projectContent,
	};
	delete contentWithoutFeatured.featured;
	const [project] = parseProjectStories([projectStory(contentWithoutFeatured)]);

	assert.equal(project.name, "projects.tinomuzambi");
	assert.equal(project.featured, false);
});

projects("preserves legacy truthiness for optional featured values", () => {
	for (const featured of ["", null, 0, false]) {
		const [project] = parseProjectStories([
			projectStory({ ...projectContent, featured }),
		]);
		assert.equal(project.featured, false);
	}

	for (const featured of ["true", 1, true]) {
		const [project] = parseProjectStories([
			projectStory({ ...projectContent, featured }),
		]);
		assert.equal(project.featured, true);
	}
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
	const upstreamError = storyblokRequestError(429, upstreamMessage);
	const getProjects = createGetProjects(async () => {
		throw upstreamError;
	});

	await assert.rejects(getProjects, (error: ProjectRequestError) => {
		assert.equal(error.name, "ProjectRequestError");
		assert.equal(error.message, "Unable to load projects from Storyblok.");
		assert.equal(error.message.includes(upstreamMessage), false);
		assert.equal(error.cause.name, "StoryblokError");
		assert.equal(error.cause.message, "Storyblok request failed.");
		assert.equal(error.cause.status, 429);
		assert.equal(error.transient, true);
		assert.equal(JSON.stringify(error).includes("private-token-value"), false);
		return true;
	});
});

projects("drops hostile values from request diagnostics", async () => {
	const privateValue = "private-token-value";
	const upstreamError = storyblokRequestError(401, privateValue);
	const getProjects = createGetProjects(async () => {
		throw upstreamError;
	});

	await assert.rejects(getProjects, (error: ProjectRequestError) => {
		assert.equal(error.cause.name, "StoryblokError");
		assert.equal(error.cause.status, 401);
		assert.equal(error.transient, false);
		assert.equal(JSON.stringify(error).includes(privateValue), false);
		return true;
	});
});

projects("keeps message-only transport failures transient and private", async () => {
	const privateValue = "private-token-value";
	const client = new StoryblokClient({
		cache: { clear: "manual", cv: "manual", type: "none" },
		fetch: async () => {
			throw new TypeError(privateValue);
		},
	});
	const getProjects = createGetProjects(
		createStoryblokProjectFetcher(client, () => "fixture-token")
	);

	await assert.rejects(getProjects, (error: ProjectRequestError) => {
		assert.equal(error.cause.name, "StoryblokError");
		assert.equal(error.cause.status, undefined);
		assert.equal(error.transient, true);
		assert.equal(JSON.stringify(error).includes(privateValue), false);
		return true;
	});
});

projects("adapts Storyblok v7 HTTP failures without leaking responses", async () => {
	const privateValue = "private-token-value";
	const client = new StoryblokClient({
		cache: { clear: "manual", cv: "manual", type: "none" },
		fetch: async () =>
			new Response(JSON.stringify({ error: privateValue }), {
				headers: { "content-type": "application/json" },
				status: 503,
			}),
	});
	const getProjects = createGetProjects(
		createStoryblokProjectFetcher(client, () => "fixture-token")
	);

	await assert.rejects(getProjects, (error: ProjectRequestError) => {
		assert.equal(error.cause.name, "StoryblokError");
		assert.equal(error.cause.status, 503);
		assert.equal(error.transient, true);
		assert.equal(JSON.stringify(error).includes(privateValue), false);
		return true;
	});
});

projects("fetches every Storyblok page instead of stopping at 25 projects", async () => {
	const stories = Array.from({ length: 150 }, (_, index) =>
		projectStory({
			...projectContent,
			name: `project-${index + 1}`,
			title: `Project ${index + 1}`,
		})
	);
	const requests: Array<{
		page: number;
		perPage: number;
		sortBy: string | null;
		startsWith: string | null;
		token: string | null;
	}> = [];
	const fetchStub: typeof fetch = async (input) => {
		const url = new URL(
			typeof input === "string"
				? input
				: input instanceof URL
					? input.href
					: input.url
		);
		const page = Number(url.searchParams.get("page"));
		const perPage = Number(url.searchParams.get("per_page"));
		const offset = (page - 1) * perPage;

		requests.push({
			page,
			perPage,
			sortBy: url.searchParams.get("sort_by"),
			startsWith: url.searchParams.get("starts_with"),
			token: url.searchParams.get("token"),
		});

		return new Response(
			JSON.stringify({
				cv: 1,
				links: [],
				rels: [],
				stories: stories.slice(offset, offset + perPage),
			}),
			{
				headers: {
					"content-type": "application/json",
					"per-page": String(perPage),
					total: String(stories.length),
				},
				status: 200,
			}
		);
	};
	const client = new StoryblokClient({
		cache: { clear: "manual", cv: "manual", type: "none" },
		fetch: fetchStub,
	});
	const fetchProjectStories = createStoryblokProjectFetcher(
		client,
		() => "fixture-token"
	);

	const result = await createGetProjects(fetchProjectStories)();

	assert.equal(result.length, 150);
	assert.deepEqual(requests, [
		{
			page: 1,
			perPage: 100,
			sortBy: "created_at:desc",
			startsWith: "projects/",
			token: "fixture-token",
		},
		{
			page: 2,
			perPage: 100,
			sortBy: "created_at:desc",
			startsWith: "projects/",
			token: "fixture-token",
		},
	]);
	assert.deepEqual(
		result.map((project) => project.name),
		stories.map((_, index) => `project-${index + 1}`)
	);
});

projects("names a missing Storyblok variable without exposing a value", async () => {
	let clientCalled = false;
	const fetchProjectStories = createStoryblokProjectFetcher(
		{
			getAll: async () => {
				clientCalled = true;
				return [];
			},
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
	assert.equal(clientCalled, false);
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

projects("refreshes and isolates the last successful SSR payload", async () => {
	let response: unknown = [projectStory()];
	const reportedErrors: ProjectRequestError[] = [];
	const getProjects = createGetProjects(async () => {
		if (Array.isArray(response)) return response;
		throw response;
	});
	const loadProjectsPageProps = createProjectsPagePropsLoader(
		getProjects,
		(error) => reportedErrors.push(error)
	);
	const firstSuccessfulResponse = await loadProjectsPageProps();
	response = storyblokRequestError(
		503,
		"request failed with private-token-value"
	);
	assert.deepEqual(await loadProjectsPageProps(), firstSuccessfulResponse);

	response = [
		projectStory({
			...projectContent,
			name: "replacement-project",
			title: "Replacement Project",
		}),
	];
	const replacementResponse = await loadProjectsPageProps();
	response = storyblokRequestError(undefined, "another private-token-value");
	assert.deepEqual(await loadProjectsPageProps(), replacementResponse);
	assert.deepEqual(
		reportedErrors.map((error) => ({
			name: error.cause.name,
			status: error.cause.status,
		})),
		[
			{ name: "StoryblokError", status: 503 },
			{ name: "StoryblokError", status: undefined },
		]
	);
	assert.equal(
		JSON.stringify(reportedErrors).includes("private-token-value"),
		false
	);

	const isolatedLoader = createProjectsPagePropsLoader(getProjects);
	await assert.rejects(isolatedLoader, (error: ProjectRequestError) => {
		assert.equal(error.cause.status, undefined);
		return true;
	});
});

projects("does not hide malformed CMS data behind the SSR cache", async () => {
	let stories: unknown[] = [projectStory()];
	const loadProjectsPageProps = createProjectsPagePropsLoader(
		createGetProjects(async () => stories)
	);

	await loadProjectsPageProps();
	stories = [];

	await assert.rejects(
		loadProjectsPageProps,
		/Storyblok returned no projects\./
	);
});

projects("does not hide configuration failures behind the SSR cache", async () => {
	let configurationMissing = false;
	const loadProjectsPageProps = createProjectsPagePropsLoader(
		createGetProjects(async () => {
			if (configurationMissing) {
				throw new ProjectConfigurationError(
					"Missing required REACT_APP_STORYBLOK_KEY environment variable."
				);
			}

			return [projectStory()];
		})
	);

	await loadProjectsPageProps();
	configurationMissing = true;

	await assert.rejects(loadProjectsPageProps, ProjectConfigurationError);
});

projects("does not hide implementation failures behind the SSR cache", async () => {
	let implementationBroken = false;
	const loadProjectsPageProps = createProjectsPagePropsLoader(
		createGetProjects(async () => {
			if (implementationBroken) {
				throw new TypeError("Unexpected Storyblok response shape.");
			}

			return [projectStory()];
		})
	);

	await loadProjectsPageProps();
	implementationBroken = true;

	await assert.rejects(
		loadProjectsPageProps,
		(error: ProjectRequestError) => {
			assert.equal(error.cause.name, "TypeError");
			assert.equal(error.transient, false);
			return true;
		}
	);
});

projects.run();
