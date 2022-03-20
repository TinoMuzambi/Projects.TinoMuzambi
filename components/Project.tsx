import Link from "next/link";
import { motion } from "framer-motion";

import { ProjectProps } from "../interfaces";

const Project: React.FC<ProjectProps> = ({ project }): JSX.Element => (
	<>
		<motion.div
			className={`wrapper${
				project.title === "ReComments" ||
				project.title === "Landon Hotel" ||
				project.title === "Table Time"
					? " featured"
					: ""
			}`}
			layout
		>
			<Link href={`/showcase/${project.name}`}>
				<a>
					<h2 className="project-title">{project.title}</h2>
					<div className="project-desc">
						<div className="project-image">
							<p className="project-image-text">{project.shortname}</p>
						</div>
						<p className="project-desc-text">{project.content[0]}</p>
					</div>
				</a>
			</Link>
		</motion.div>
	</>
);

export default Project;
