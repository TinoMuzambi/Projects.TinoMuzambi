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
	const upstreamError = Object.assign(new Error(upstreamMessage), {
		code: "ECONNRESET",
		config: {
			token: "private-token-value",
		},
		isAxiosError: true,
		response: {
			status: 429,
		},
	});
	const getProjects = createGetProjects(async () => {
		throw upstreamError;
	});

	await assert.rejects(getProjects, (error: ProjectRequestError) => {
		assert.equal(error.name, "ProjectRequestError");
		assert.equal(error.message, "Unable to load projects from Storyblok.");
		assert.equal(error.message.includes(upstreamMessage), false);
		assert.equal(error.cause.name, "AxiosError");
		assert.equal(error.cause.message, "Storyblok request failed.");
		assert.equal(error.cause.code, "ECONNRESET");
		assert.equal(error.cause.status, 429);
		assert.equal(error.transient, true);
		assert.equal(JSON.stringify(error).includes("private-token-value"), false);
		return true;
	});
});

projects("drops hostile values from request diagnostics", async () => {
	const privateValue = "private-token-value";
	const upstreamError = Object.assign(new Error(privateValue), {
		code: privateValue,
		config: { token: privateValue },
		isAxiosError: true,
		name: privateValue,
		request: { url: `https://example.com?token=${privateValue}` },
		response: { status: 401 },
	});
	const getProjects = createGetProjects(async () => {
		throw upstreamError;
	});

	await assert.rejects(getProjects, (error: ProjectRequestError) => {
		assert.equal(error.cause.name, "AxiosError");
		assert.equal(error.cause.code, undefined);
		assert.equal(error.cause.status, 401);
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
	const requests: {
		page: number;
		params: unknown;
		perPage: number;
		url: string;
	}[] = [];
	const client = new StoryblokClient({});
	Object.defineProperty(client, "makeRequest", {
		value: async (
			url: string,
			params: unknown,
			perPage: number,
			page: number
		) => {
			requests.push({ page, params, perPage, url });
			const offset = (page - 1) * perPage;

			return {
				data: {
					stories: stories.slice(offset, offset + perPage),
				},
				headers: {},
				perPage,
				total: stories.length,
			};
		},
	});
	const fetchProjectStories = createStoryblokProjectFetcher(
		client,
		() => "fixture-token"
	);

	const result = await createGetProjects(fetchProjectStories)();

	assert.equal(result.length, 150);
	assert.equal(client.getToken(), "fixture-token");
	assert.deepEqual(requests, [
		{
			page: 1,
			params: {
				per_page: 100,
				sort_by: "created_at:desc",
				starts_with: "projects/",
			},
			perPage: 100,
			url: "/cdn/stories",
		},
		{
			page: 2,
			params: {
				per_page: 100,
				sort_by: "created_at:desc",
				starts_with: "projects/",
			},
			perPage: 100,
			url: "/cdn/stories",
		},
	]);
	assert.deepEqual(
		result.map((project) => project.name),
		stories.map((_, index) => `project-${index + 1}`)
	);
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

projects("refreshes and isolates the last successful SSR payload", async () => {
	let response: unknown = [projectStory()];
	const reportedErrors: ProjectRequestError[] = [];
	const getProjects = createGetProjects(async () => {
		if (response instanceof Error) throw response;
		return response;
	});
	const loadProjectsPageProps = createProjectsPagePropsLoader(
		getProjects,
		(error) => reportedErrors.push(error)
	);
	const firstSuccessfulResponse = await loadProjectsPageProps();
	response = Object.assign(
		new Error("request failed with private-token-value"),
		{
			isAxiosError: true,
			response: { status: 503 },
		}
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
	response = Object.assign(new Error("another private-token-value"), {
		isAxiosError: true,
		response: { status: 503 },
	});
	assert.deepEqual(await loadProjectsPageProps(), replacementResponse);
	assert.deepEqual(
		reportedErrors.map((error) => ({
			name: error.cause.name,
			status: error.cause.status,
		})),
		[
			{ name: "AxiosError", status: 503 },
			{ name: "AxiosError", status: 503 },
		]
	);
	assert.equal(
		JSON.stringify(reportedErrors).includes("private-token-value"),
		false
	);

	const isolatedLoader = createProjectsPagePropsLoader(getProjects);
	await assert.rejects(isolatedLoader, (error: ProjectRequestError) => {
		assert.equal(error.cause.status, 503);
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
