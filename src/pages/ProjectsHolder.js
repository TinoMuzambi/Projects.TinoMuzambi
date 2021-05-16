import React from "react";

import Project from "../components/Project";
import SearchProjects from "../components/SearchProjects";

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

	console.log(filteredProjects);
	let tags = [];
	projects.forEach((i) => {
		i.keywords.forEach((j) => tags.push(j));
	});
	tags = Array.from(new Set(tags));
	console.log(tags);
	return (
		<>
			<div className="headline">
				<h1 className="project-title">Projects</h1>
				<SearchProjects query={queryText} searchProj={searchProj} />
			</div>
			<div className="quick-links">
				{tags.map((i, key) => (
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
