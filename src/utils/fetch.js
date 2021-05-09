import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
	accessToken: process.env.REACT_APP_STORYBLOK_KEY,
	cache: {
		clear: "auto",
		type: "memory",
	},
});

export const getProjects = async () => {
	let projects = [];

	await Storyblok.get("cdn/stories?starts_with=projects/", {
		sort_by: "position:desc",
	})
		.then((response) => {
			const strictlyProjects = response.data.stories;
			const prettyprojects = strictlyProjects.map((project) => {
				return {
					name: project.content.name,
					shortname: project.content.shortname,
					title: project.content.title,
					content: project.content.content,
					link: project.content.link,
					github: project.content.github,
					keywords: project.content.keywords,
				};
			});
			projects = prettyprojects;
		})
		.catch((error) => {
			console.error(error);
		});

	return projects;
};