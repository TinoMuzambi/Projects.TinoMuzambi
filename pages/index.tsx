import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import AOS from "aos";

import Project from "../components/Project";
import SearchProjects from "../components/SearchProjects";
import { applyFilters } from "../utils/helpers";
import { getProjects } from "../utils/fetch";
import { AppContext } from "../context/AppContext";
import { Project as P, ProjectsHolderProps } from "../interfaces";
import { useRouter } from "next/router";
import Tags from "../components/Tags";
import "aos/dist/aos.css";

const ProjectsHolder: React.FC<ProjectsHolderProps> = ({
	projects,
}): JSX.Element => {
	const [filteredProjects, setFilteredProjects] = useState<P[]>([]);
	const [links, setLinks] = useState<string[]>([]);
	const router = useRouter();
	const { setProjects, queryText, setQueryText } = useContext(AppContext);

	useEffect(() => {
		AOS.init();

		if (setProjects) setProjects(projects);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projects]);

	useEffect(() => {
		if (router.query.text) {
			if (setQueryText) setQueryText(router.query.text);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.text]);

	const searchProj = (query: string) => {
		if (setQueryText) setQueryText(query);
	};

	useEffect(() => {
		setFilteredProjects(
			projects.filter((eachItem) => {
				return (
					eachItem["title"].toLowerCase().includes(queryText.toLowerCase()) ||
					eachItem["keywords"].join().includes(queryText.toLowerCase())
				);
			})
		);
	}, [projects, queryText]);

	useEffect(() => {
		let linkTags: string[] = [];
		projects.forEach((project) => {
			project.keywords.forEach((keyword: string) => linkTags.push(keyword));
		});
		linkTags = Array.from(new Set(linkTags));

		linkTags = applyFilters(linkTags);
		setLinks(linkTags);
	}, [projects]);

	return (
		<main>
			<Tags links={links} />
			<div className="headline">
				<h1 className="project-title">Projects</h1>
				<SearchProjects query={queryText} searchProj={searchProj} />
			</div>
			<div className="projects" data-aos="fade-up" data-aos-delay="200">
				{filteredProjects.length > 0 ? (
					filteredProjects.map((project, key: number) => (
						<Project key={key} project={project} />
					))
				) : (
					<h1>There are no projects that match that search term.</h1>
				)}
			</div>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const projects: P[] = await getProjects();

	return {
		props: {
			projects,
		},
	};
};

export default ProjectsHolder;
