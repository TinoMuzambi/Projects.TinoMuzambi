import type { NameParams, Project } from "../interfaces";

export const applyFilters = (tags: string[]): string[] => {
	return tags.filter(
		(i) =>
			i !== "jsx" &&
			i !== "content management system" &&
			i !== "teachable machine" &&
			i !== "clash of clans" &&
			i !== "server-side-rendering" &&
			i !== "custom components" &&
			i !== "responsive" &&
			i !== "nextjs" &&
			i !== "nodejs" &&
			i !== "socketio" &&
			i !== "ml5js" &&
			i !== "p5js" &&
			i !== "google" &&
			i !== "dark mode" &&
			i !== "godaddy" &&
			i !== "video" &&
			i !== "table tennis" &&
			i !== "sports" &&
			i !== "obs studio" &&
			i !== "seo" &&
			i !== "go" &&
			i !== "mathematics" &&
			i !== "email" &&
			i !== "uct" &&
			i !== "classification" &&
			i !== "youtube" &&
			i !== "bot" &&
			i !== "paystack"
	);
};

export const getRequiredNameParam = (
	params: NameParams | undefined
): string => {
	if (!params?.name) {
		throw new Error("Missing required route name parameter.");
	}

	return params.name;
};

export const getRequiredProject = (
	projects: Project[],
	name: string
): Project => {
	const project = projects.find((candidate) => candidate.name === name);

	if (!project) {
		throw new Error("Missing required project for showcase route.");
	}

	return project;
};
