import React from "react";
import projects from "../data/projects-content";
import Project from "../components/Project";

const Tags = ({ match }) => {
	const name = match.params.name;

	const filteredProjects = projects.filter((eachItem) => {
		return eachItem["keywords"].includes(name);
	});
	const title = name.charAt(0).toUpperCase() + name.slice(1);
	document.title = `${title} | Projects.TinoMuzambi`;
	return (
		<>
			<h1 className="project-title">{title}</h1>
			<div className="projects">
				<Project projects={filteredProjects} />
			</div>
		</>
	);
};

export default Tags;
