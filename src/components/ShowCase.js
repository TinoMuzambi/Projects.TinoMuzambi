import React from "react";
import projects from "../pages/projects-content";

const ShowCase = ({ match }) => {
    const name = match.params.name;
    const project = projects.find(project => project.name === name);
	return (
		<>
			<h1 className="project-title">{project.title}</h1>
			<div class="wrapper">
				<div className="project-desc">
					<div className="project-image">
                        <p className="project-image-text">{project.shortname}</p>
					</div>
					<p className="project-desc-text">{project.content}</p>
				</div>
			</div>
		</>
	);
};

export default ShowCase;
