import React from "react";
import Project from "./Project";
import projects from "../pages/projects-content";

const ProjectsHolder = () => (
	<>
		<h1 className="project-title">Projects</h1>
		<Project projects={projects} />
	</>
);

export default ProjectsHolder;
