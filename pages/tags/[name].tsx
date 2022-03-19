import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Meta from "../../components/Meta";
import Project from "../../components/Project";
import { AppContext } from "../../context/AppContext";
import { Project as P } from "../../interfaces";

const Tags: React.FC = (): JSX.Element => {
	const router = useRouter();
	const { projects } = useContext(AppContext);
	const [name, setName] = useState(router.query.name as string);
	const [title, setTitle] = useState("");
	const [filteredProjects, setFilteredProjects] = useState<P[]>([]);

	useEffect(() => {
		if (name) {
			setTitle(name.charAt(0).toUpperCase() + name.slice(1));
			setFilteredProjects(
				projects.filter((eachItem) => {
					return eachItem.keywords.includes(name);
				})
			);
		}
	}, [name]);

	useEffect(() => {
		setName(router.query.name as string);
	}, [router.query]);

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
