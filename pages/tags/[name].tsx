import { useRouter } from "next/router";

import Project from "../../components/Project";

const Tags: React.FC = (): JSX.Element => {
	const router = useRouter();
	const name = router.query.name as string;

	const filteredProjects = projects.filter((eachItem) => {
		return eachItem["keywords"].includes(name);
	});
	const title = name.charAt(0).toUpperCase() + name.slice(1);
	document.title = `${title} | Projects.TinoMuzambi`;
	return (
		<>
			<h1 className="project-title">{title}</h1>
			<div className="projects" data-aos="fade-up">
				<Project projects={filteredProjects} />
			</div>
		</>
	);
};

export default Tags;
