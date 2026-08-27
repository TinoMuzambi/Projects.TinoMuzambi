import StoryblokClient, { type ISbStoriesParams } from "storyblok-js-client";
import type { GetServerSidePropsResult } from "next";

import type { Project, ProjectsHolderProps } from "../interfaces";

type UnknownRecord = Record<string, unknown>;
type FetchProjectStories = () => Promise<unknown>;
type ReadAccessToken = () => string | undefined;
type ProjectsPagePropsLoader = () => Promise<
	GetServerSidePropsResult<ProjectsHolderProps>
>;
type ProjectRequestDiagnostic = {
	type: "StoryblokError" | "Error" | "TypeError" | "UnknownError";
	status?: number;
};
type ReportStaleProjects = (error: ProjectRequestError) => void;
const STORYBLOK_TRANSPORT_ERROR_STATUS = 599;

type StoryblokProjectParams = Required<
	Pick<ISbStoriesParams, "per_page" | "sort_by" | "starts_with" | "token">
>;

type StoryblokProjectsClient = {
	getAll: (
		slug: string,
		params: StoryblokProjectParams,
		entity: string
	) => Promise<unknown[]>;
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

export const createStoryblokFetch =
	(request: typeof fetch): typeof fetch =>
	async (...args) => {
		try {
			return await request(...args);
		} catch {
			return new Response(
				JSON.stringify({ error: "Storyblok transport request failed." }),
				{
					headers: { "content-type": "application/json" },
					status: STORYBLOK_TRANSPORT_ERROR_STATUS,
				}
			);
		}
	};

const safeRequestDiagnostic = (error: unknown): ProjectRequestDiagnostic => {
	const errorRecord = isRecord(error) ? error : {};
	const responseValue = errorRecord["response"];
	const response: UnknownRecord = isRecord(responseValue) ? responseValue : {};
	const statusValue = errorRecord["status"] ?? response["status"];
	const status =
		typeof statusValue === "number" &&
		Number.isInteger(statusValue) &&
		statusValue >= 100 &&
		statusValue <= 599
			? statusValue
			: undefined;
	const type =
		!(error instanceof Error) && typeof errorRecord["message"] === "string"
			? "StoryblokError"
			: error instanceof TypeError
			? "TypeError"
			: error instanceof Error
			? "Error"
			: "UnknownError";

	return {
		type,
		...(status !== undefined ? { status } : {}),
	};
};

class ProjectRequestCause extends Error {
	readonly status: number | undefined;

	constructor(diagnostic: ProjectRequestDiagnostic) {
		super("Storyblok request failed.");
		this.name = diagnostic.type;
		this.status = diagnostic.status;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export class ProjectRequestError extends Error {
	override readonly cause: ProjectRequestCause;
	readonly transient: boolean;

	constructor(error: unknown) {
		super("Unable to load projects from Storyblok.");
		this.name = "ProjectRequestError";
		this.cause = new ProjectRequestCause(safeRequestDiagnostic(error));
		this.transient =
			this.cause.name === "StoryblokError" &&
			this.cause.status !== undefined &&
			(this.cause.status === 429 ||
				this.cause.status >= 500);
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

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

const requiredLines = (
	content: UnknownRecord,
	field: string,
	projectNumber: number
): [string, ...string[]] => {
	const [firstLine = "", ...remainingLines] = requiredString(
		content,
		field,
		projectNumber
	).split("\n");

	return [firstLine, ...remainingLines];
};

const parseProject = (story: unknown, index: number): Project => {
	if (!isRecord(story) || !isRecord(story["content"])) {
		throw new Error(`Storyblok project ${index + 1} has invalid content.`);
	}

	const content = story["content"];

	return {
		name: requiredString(content, "name", index + 1),
		shortname: requiredString(content, "shortname", index + 1),
		title: requiredString(content, "title", index + 1),
		content: requiredLines(content, "content", index + 1),
		link: requiredString(content, "link", index + 1),
		github: requiredString(content, "github", index + 1),
		keywords: requiredLines(content, "keywords", index + 1),
		featured: Boolean(content["featured"]),
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

		return client.getAll(
			"cdn/stories",
			{
				per_page: 100,
				sort_by: "created_at:desc",
				starts_with: "projects/",
				token: accessToken,
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

			throw new ProjectRequestError(error);
		}

		return parseProjectStories(stories);
	};

const reportStaleProjects: ReportStaleProjects = (error) => {
	console.error(
		"Unable to refresh projects from Storyblok; serving the last successful response.",
		error.cause
	);
};

export const createProjectsPagePropsLoader = (
	loadProjects: () => Promise<Project[]>,
	reportFailure: ReportStaleProjects = reportStaleProjects
): ProjectsPagePropsLoader => {
	let lastSuccessfulProjects: Project[] | undefined;

	return async () => {
		try {
			const projects = await loadProjects();
			lastSuccessfulProjects = projects;

			return {
				props: {
					projects,
				},
			};
		} catch (error) {
			if (
				!lastSuccessfulProjects ||
				!(error instanceof ProjectRequestError) ||
				!error.transient
			) {
				throw error;
			}

			reportFailure(error);

			return {
				props: {
					projects: lastSuccessfulProjects,
				},
			};
		}
	};
};

const Storyblok = new StoryblokClient({
	cache: {
		clear: "auto",
		type: "memory",
	},
	fetch: createStoryblokFetch(fetch),
});

const fetchProjectStories = createStoryblokProjectFetcher(
	Storyblok,
	() => process.env["REACT_APP_STORYBLOK_KEY"]
);

export const getProjects = createGetProjects(fetchProjectStories);
export const loadProjectsPageProps = createProjectsPagePropsLoader(getProjects);
