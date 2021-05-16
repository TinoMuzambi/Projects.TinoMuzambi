import React from "react";

import Project from "../components/Project";
import SearchProjects from "../components/SearchProjects";
import { applyFilters } from "../utils/helpers";

const ProjectsHolder = ({ queryText, setQueryText, projects }) => {
	const searchProj = (query) => {
		setQueryText(query);
	};

	const filteredProjects = projects.filter((eachItem) => {
		return (
			eachItem["title"].toLowerCase().includes(queryText.toLowerCase()) ||
			eachItem["keywords"].join().includes(queryText.toLowerCase())
		);
	});

	let linkTags = [];
	projects.forEach((project) => {
		project.keywords.forEach((keyword) => linkTags.push(keyword));
	});
	linkTags = Array.from(new Set(linkTags));

	linkTags = applyFilters(linkTags);
	return (
		<>
			<div className="headline">
				<h1 className="project-title">Projects</h1>
				<SearchProjects query={queryText} searchProj={searchProj} />
			</div>
			<div className="quick-links">
				{linkTags.map((i, key) => (
					<a key={key} href={`/tags/${i}`} className="tags">
						{i}
					</a>
				))}
			</div>
			<div className="projects" data-aos="fade-up">
				<Project projects={filteredProjects} />
			</div>
		</>
	);
};

export default ProjectsHolder;
