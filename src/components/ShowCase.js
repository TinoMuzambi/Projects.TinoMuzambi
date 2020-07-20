import React from "react";
import projects from "../pages/projects-content";
import { Link } from "react-router-dom";

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
					<p className="project-desc-text">{project.content[0]}</p>
				</div>
				<div className="project-footer">
					<p className={project.link==="" ? "link-hide" : ""}>Link: <a href={project.link}>{project.link}</a></p>
					<p>GitHub: <a href={project.github}>{project.github}</a></p>
					<ul className="tag">
						{
							project.keywords.map((keyword, key) => (
								<li className="tags" key={key}>
									<Link to={`/tags/${keyword}`}>
										<p className="tag-text">{keyword}</p>
									</Link>
								</li>
							))}
					</ul>
				</div>
			</div>
		</>
	);
};

export default ShowCase;
