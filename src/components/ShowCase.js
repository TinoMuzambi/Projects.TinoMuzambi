import React from "react";
import projects from "../pages/projects-content";
import { Link } from "react-router-dom";

const ShowCase = ({ match }) => {
    const name = match.params.name;
	const project = projects.find(project => project.name === name);
	return (
		<>
			<h1 className="project-title">{project.title}</h1>
			<div className="wrapper" data-aos="flip-up" data-aos-delay="200">
				<div className="project-desc">
					<div className="project-image">
                        <p className="project-image-text">{project.shortname}</p>
					</div>
					<div className="projects-desc-pars">
						{project.content.map((paragraph, key) => (
							<p key={key} className="project-desc-text">{paragraph}</p>
						))}
					</div>
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
