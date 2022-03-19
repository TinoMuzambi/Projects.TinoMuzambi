import { useContext } from "react";
import { useRouter } from "next/router";

import Meta from "../../components/Meta";
import Project from "../../components/Project";
import { AppContext } from "../../context/AppContext";

const Tags: React.FC = (): JSX.Element => {
	const router = useRouter();
	const { projects } = useContext(AppContext);
	const name = router.query.name as string;

	const filteredProjects = projects.filter((eachItem) => {
		return eachItem["keywords"].includes(name);
	});
	const title = name.charAt(0).toUpperCase() + name.slice(1);

	return (
		<>
			<Meta title={`${title} | Projects.TinoMuzambi`} />
			<h1 className="project-title">{title}</h1>
			<div className="projects" data-aos="fade-up">
				<Project projects={filteredProjects} />
			</div>
		</>
	);
};

export default Tags;
