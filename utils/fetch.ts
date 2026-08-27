import StoryblokClient from "storyblok-js-client";

import { Project } from "../interfaces";

type UnknownRecord = Record<string, unknown>;
type FetchProjectStories = () => Promise<unknown>;

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

export const parseProjectStories = (response: unknown): Project[] => {
	if (
		!isRecord(response) ||
		!isRecord(response.data) ||
		!Array.isArray(response.data.stories)
	) {
		throw new Error("Storyblok returned an invalid projects response.");
	}

	if (response.data.stories.length === 0) {
		throw new Error("Storyblok returned no projects.");
	}

	return response.data.stories.map(parseProject);
};

export const createGetProjects =
	(fetchProjectStories: FetchProjectStories) => async (): Promise<Project[]> => {
		let response: unknown;

		try {
			response = await fetchProjectStories();
		} catch {
			throw new Error("Unable to load projects from Storyblok.");
		}

		return parseProjectStories(response);
	};

const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});

export const getProjects = createGetProjects(() =>
	Storyblok.get("cdn/stories", {
		starts_with: "projects/",
		sort_by: "created_at:desc",
	})
);
