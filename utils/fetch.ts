import StoryblokClient from "storyblok-js-client";
import { Project } from "../interfaces";

const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});

export const getProjects = async (): Promise<Project[]> => {
	let projects: any[] = [];

	await Storyblok.get("cdn/stories?starts_with=projects/", {
		sort_by: "created_at:desc",
	})
		.then((response) => {
			const strictlyProjects = response.data.stories;
			const prettyprojects = strictlyProjects.map((project: any) => {
				return {
					name: project.content.name,
					shortname: project.content.shortname,
					title: project.content.title,
					content: project.content.content.split("\n"),
					link: project.content.link,
					github: project.content.github,
					keywords: project.content.keywords.split("\n"),
					featured: project.content?.featured || false,
				};
			});
			projects = prettyprojects;
		})
		.catch((error) => {
			console.error(error);
		});

	return projects;
};
