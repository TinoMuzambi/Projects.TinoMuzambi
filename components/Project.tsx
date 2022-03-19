import Link from "next/link";
import { motion } from "framer-motion";

const Project = ({ projects }: any) => (
	<>
		{projects.length > 0 ? (
			projects.map((project: any, key: any) => (
				<motion.div
					className={`wrapper${
						project.title === "ReComments" ||
						project.title === "Landon Hotel" ||
						project.title === "Tailwind Expo"
							? " featured"
							: ""
					}`}
					key={key}
					layout
				>
					<Link href={`/showcase/${project.name}`}>
						<a>
							<h2 className="projects-title">{project.title}</h2>
							<div className="project-desc">
								<div className="project-image">
									<p className="project-image-text">{project.shortname}</p>
								</div>
								<p className="project-desc-text">{project.content[0]}</p>
							</div>
						</a>
					</Link>
				</motion.div>
			))
		) : (
			<h1>There are no projects that match that search term.</h1>
		)}
	</>
);

export default Project;
