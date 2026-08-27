import StoryblokClient from "storyblok-js-client";

import { Project, ProjectsHolderProps } from "../interfaces";

type UnknownRecord = Record<string, unknown>;
type FetchProjectStories = () => Promise<unknown>;
type ReadAccessToken = () => string | undefined;
type ProjectsPagePropsLoader = () => Promise<{
	props: ProjectsHolderProps;
}>;
type ProjectRequestDiagnostic = {
	type: "AxiosError" | "Error" | "TypeError" | "UnknownError";
	code?: string;
	status?: number;
};
type ReportStaleProjects = (error: ProjectRequestError) => void;
const SAFE_REQUEST_CODES = [
	"EAI_AGAIN",
	"ECONNABORTED",
	"ECONNRESET",
	"ENOTFOUND",
	"ERR_BAD_REQUEST",
	"ERR_BAD_RESPONSE",
	"ERR_CANCELED",
	"ERR_INVALID_URL",
	"ERR_NETWORK",
	"ERR_NOT_SUPPORT",
	"ETIMEDOUT",
] as const;
const TRANSIENT_REQUEST_CODES: readonly string[] = [
	"EAI_AGAIN",
	"ECONNABORTED",
	"ECONNRESET",
	"ENOTFOUND",
	"ERR_NETWORK",
	"ETIMEDOUT",
];

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

const safeRequestDiagnostic = (error: unknown): ProjectRequestDiagnostic => {
	const errorRecord = isRecord(error) ? error : {};
	const response = isRecord(errorRecord.response) ? errorRecord.response : {};
	const code =
		typeof errorRecord.code === "string" &&
		SAFE_REQUEST_CODES.some((safeCode) => safeCode === errorRecord.code)
			? errorRecord.code
			: undefined;
	const status =
		typeof response.status === "number" &&
		Number.isInteger(response.status) &&
		response.status >= 100 &&
		response.status <= 599
			? response.status
			: undefined;
	const type =
		errorRecord.isAxiosError === true
			? "AxiosError"
			: error instanceof TypeError
			? "TypeError"
			: error instanceof Error
			? "Error"
			: "UnknownError";

	return {
		type,
		...(code ? { code } : {}),
		...(status ? { status } : {}),
	};
};

class ProjectRequestCause extends Error {
	readonly code?: string;
	readonly status?: number;

	constructor(diagnostic: ProjectRequestDiagnostic) {
		super("Storyblok request failed.");
		this.name = diagnostic.type;
		this.code = diagnostic.code;
		this.status = diagnostic.status;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export class ProjectRequestError extends Error {
	readonly cause: ProjectRequestCause;
	readonly transient: boolean;

	constructor(error: unknown) {
		super("Unable to load projects from Storyblok.");
		this.name = "ProjectRequestError";
		this.cause = new ProjectRequestCause(safeRequestDiagnostic(error));
		this.transient =
			this.cause.name === "AxiosError" &&
			(this.cause.status === 429 ||
				(this.cause.status !== undefined && this.cause.status >= 500) ||
				(this.cause.code !== undefined &&
					TRANSIENT_REQUEST_CODES.includes(this.cause.code)));
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

const parseProject = (story: unknown, index: number): Project => {
	if (!isRecord(story) || !isRecord(story.content)) {
		throw new Error(`Storyblok project ${index + 1} has invalid content.`);
	}

	const { content } = story;

	return {
		name: requiredString(content, "name", index + 1),
		shortname: requiredString(content, "shortname", index + 1),
		title: requiredString(content, "title", index + 1),
		content: requiredString(content, "content", index + 1).split("\n"),
		link: requiredString(content, "link", index + 1),
		github: requiredString(content, "github", index + 1),
		keywords: requiredString(content, "keywords", index + 1).split("\n"),
		featured: Boolean(content.featured),
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
});

const fetchProjectStories = createStoryblokProjectFetcher(
	Storyblok,
	() => process.env.REACT_APP_STORYBLOK_KEY
);

export const getProjects = createGetProjects(fetchProjectStories);
export const loadProjectsPageProps = createProjectsPagePropsLoader(getProjects);
