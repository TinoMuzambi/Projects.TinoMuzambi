import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Project = ({ projects }) => (
	<>
		{projects.length > 0 ? (
			projects.map((project, key) => (
				<motion.div
					className={`wrapper ${
						project.title === "ReComments" ? "featured" : ""
					}`}
					key={key}
					layout
				>
					<Link to={`/showcase/${project.name}`}>
						<h2 className="projects-title">{project.title}</h2>
						<div className="project-desc">
							<div className="project-image">
								<p className="project-image-text">{project.shortname}</p>
							</div>
							<p className="project-desc-text">{project.content[0]}</p>
						</div>
					</Link>
				</motion.div>
			))
		) : (
			<h1>There are no projects that match that search term.</h1>
		)}
	</>
);

export default Project;
