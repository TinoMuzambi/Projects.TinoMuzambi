import Link from "next/link";
import { motion } from "framer-motion";

import { ProjectProps } from "../interfaces";

const Project: React.FC<ProjectProps> = ({ project }): JSX.Element => (
	<>
		<motion.div className={`card${project.featured ? " featured" : ""}`} layout>
			<Link href={`/showcase/${project.name}`}>
				<a>
					<h2 className="title">{project.title}</h2>
					<div className="body">
						<div className="image">
							<p className="text">{project.shortname}</p>
						</div>
						<p className="description">{project.content[0]}</p>
					</div>
				</a>
			</Link>
		</motion.div>
	</>
);

export default Project;
