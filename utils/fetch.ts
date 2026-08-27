import StoryblokClient from "storyblok-js-client";

import { Project, ProjectsHolderProps } from "../interfaces";

type UnknownRecord = Record<string, unknown>;
type FetchProjectStories = () => Promise<unknown>;
type ReadAccessToken = () => string | undefined;
type ProjectsPagePropsLoader = () => Promise<{
	props: ProjectsHolderProps;
}>;

type StoryblokProjectsClient = {
	getAll: (
		slug: string,
		params: {
			per_page: number;
			sort_by: string;
			starts_with: string;
		},
		entity: string
	) => Promise<unknown[]>;
	setToken: (accessToken: string) => void;
};

export class ProjectConfigurationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ProjectConfigurationError";
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

const isRecord = (value: unknown): value is UnknownRecord =>
	typeof value === "object" && value !== null && !Array.isArray(value);

const requiredString = (
	content: UnknownRecord,
	field: string,
	projectNumber: number
): string => {
	const value = content[field];

	if (typeof value !== "string") {
		throw new Error(
			`Storyblok project ${projectNumber} field "${field}" must be a string.`
		);
	}

	return value;
};

const parseProject = (story: unknown, index: number): Project => {
	if (!isRecord(story) || !isRecord(story.content)) {
		throw new Error(`Storyblok project ${index + 1} has invalid content.`);
	}

	const { content } = story;
	const featured = content.featured;

	if (featured !== undefined && typeof featured !== "boolean") {
		throw new Error(
			`Storyblok project ${index + 1} field "featured" must be a boolean.`
		);
	}

	return {
		name: requiredString(content, "name", index + 1),
		shortname: requiredString(content, "shortname", index + 1),
		title: requiredString(content, "title", index + 1),
		content: requiredString(content, "content", index + 1).split("\n"),
		link: requiredString(content, "link", index + 1),
		github: requiredString(content, "github", index + 1),
		keywords: requiredString(content, "keywords", index + 1).split("\n"),
		featured: featured ?? false,
	};
};

export const parseProjectStories = (stories: unknown): Project[] => {
	if (!Array.isArray(stories)) {
		throw new Error("Storyblok returned an invalid projects response.");
	}

	if (stories.length === 0) {
		throw new Error("Storyblok returned no projects.");
	}

	return stories.map(parseProject);
};

export const createStoryblokProjectFetcher =
	(client: StoryblokProjectsClient, readAccessToken: ReadAccessToken) =>
	async (): Promise<unknown[]> => {
		const accessToken = readAccessToken();

		if (!accessToken) {
			throw new ProjectConfigurationError(
				"Missing required REACT_APP_STORYBLOK_KEY environment variable."
			);
		}

		client.setToken(accessToken);

		return client.getAll(
			"cdn/stories",
			{
				per_page: 100,
				sort_by: "created_at:desc",
				starts_with: "projects/",
			},
			"stories"
		);
	};

export const createGetProjects =
	(fetchProjectStories: FetchProjectStories) => async (): Promise<Project[]> => {
		let stories: unknown;

		try {
			stories = await fetchProjectStories();
		} catch (error) {
			if (error instanceof ProjectConfigurationError) {
				throw error;
			}

			throw new Error("Unable to load projects from Storyblok.");
		}

		return parseProjectStories(stories);
	};

export const createProjectsPagePropsLoader =
	(loadProjects: () => Promise<Project[]>): ProjectsPagePropsLoader => async () => ({
		props: {
			projects: await loadProjects(),
		},
	});

const Storyblok = new StoryblokClient({
	cache: {
		clear: "auto",
		type: "memory",
	},
});

const fetchProjectStories = createStoryblokProjectFetcher(
	Storyblok,
	() => process.env.REACT_APP_STORYBLOK_KEY
);

export const getProjects = createGetProjects(fetchProjectStories);
export const loadProjectsPageProps = createProjectsPagePropsLoader(getProjects);
