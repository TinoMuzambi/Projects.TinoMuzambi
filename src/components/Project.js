import React from "react";
import { Link } from "react-router-dom";

const Project = ({ projects }) => (
	<>
		{projects.map((project, key) => (
            <div className='wrapper' key={key} data-aos="flip-up" data-aos-delay="200">
                <Link to={`/showcase/${project.name}`}>
                    <h2 className="projects-title">{project.title}</h2>
                    <div className="project-desc">
                        <div className="project-image">
                            <p className="project-image-text">{project.shortname}</p>
                        </div>
                        <p className="project-desc-text">{project.content[0]}</p>
                    </div>
                </Link>
            </div>
		))}
	</>
);

export default Project;
