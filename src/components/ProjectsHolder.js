import React from "react";
import Project from "./Project";
import { Link } from 'react-router-dom';

const ProjectsHolder = () => (
	<>
		<h1 className="projects-title">Projects</h1>
        <Link to="/showcase"><Project /></Link>
        <Link to="/showcase"><Project /></Link>
        <Link to="/showcase"><Project /></Link>
	</>
);

export default ProjectsHolder;
