import React, { useState } from "react";
import Project from "../components/Project";
import projects from "../data/projects-content";
import SearchProjects from "../components/SearchProjects";

const ProjectsHolder = () => {
	const [queryText, setQueryText] = useState("");

	const searchProj = (query) => {
		setQueryText(query);
	};

	const filteredProjects = projects.filter((eachItem) => {
		return (
			eachItem["title"].toLowerCase().includes(queryText.toLowerCase()) ||
			eachItem["keywords"].join().includes(queryText.toLowerCase())
		);
	});
	return (
		<>
			<div className="headline">
				<h1 className="project-title">Projects</h1>
				<SearchProjects searchProj={searchProj} />
			</div>
			<div className="projects">
				<Project projects={filteredProjects} />
			</div>
		</>
	);
};

export default ProjectsHolder;
