import { useContext, useEffect, useState } from "react";
import AOS from "aos";

import Project from "../components/Project";
import SearchProjects from "../components/SearchProjects";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { applyFilters } from "../utils/helpers";
import { getProjects } from "../utils/fetch";
import { Project as P } from "../interfaces";
import { AppContext } from "../context/AppContext";

const ProjectsHolder = () => {
	const [queryText, setQueryText] = useState("");
	const [fetching, setFetching] = useState(true);

	const { projects, setProjects } = useContext(AppContext);

	useEffect(() => {
		AOS.init();
		const getData = async () => {
			const data = await getProjects();
			if (setProjects) setProjects(data);
			setFetching(false);
		};
		getData();
	}, []);

	const searchProj = (query: string) => {
		setQueryText(query);
	};

	const filteredProjects = projects.filter((eachItem) => {
		return (
			eachItem["title"].toLowerCase().includes(queryText.toLowerCase()) ||
			eachItem["keywords"].join().includes(queryText.toLowerCase())
		);
	});

	let linkTags: string[] = [];
	projects.forEach((project) => {
		project.keywords.forEach((keyword: string) => linkTags.push(keyword));
	});
	linkTags = Array.from(new Set(linkTags));

	linkTags = applyFilters(linkTags);

	if (fetching) return null;

	return (
		<>
			<NavBar setQueryText={setQueryText} />
			<div className="headline">
				<h1 className="project-title">Projects</h1>
				<SearchProjects query={queryText} searchProj={searchProj} />
			</div>
			<div className="quick-links" data-aos="fade-up">
				{linkTags.map((i, key) => (
					<a key={key} href={`/tags/${i}`} className="tags">
						{i}
					</a>
				))}
			</div>
			<div className="projects" data-aos="fade-up" data-aos-delay="200">
				<Project projects={filteredProjects} />
			</div>
			<Footer />
		</>
	);
};

export default ProjectsHolder;
