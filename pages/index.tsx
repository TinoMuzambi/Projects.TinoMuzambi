import { useContext, useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";
import AOS from "aos";

import Project from "../components/Project";
import SearchProjects from "../components/SearchProjects";
import { applyFilters } from "../utils/helpers";
import { loadProjectsPageProps } from "../utils/fetch";
import { AppContext } from "../context/AppContext";
import { ProjectsHolderProps } from "../interfaces";
import { useRouter } from "next/router";
import Tags from "../components/Tags";
import "aos/dist/aos.css";

const ProjectsHolder: React.FC<ProjectsHolderProps> = ({
	projects,
}): JSX.Element => {
	const router = useRouter();
	const { setProjects, queryText, setQueryText } = useContext(AppContext);

	useEffect(() => {
		AOS.init();

		if (setProjects) setProjects(projects);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [projects]);

	useEffect(() => {
		const routeText = router.query.text;

		if (typeof routeText === "string") {
			if (setQueryText) setQueryText(routeText);
		} else if (routeText?.[0]) {
			if (setQueryText) setQueryText(routeText[0]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query.text]);

	const searchProj = (query: string) => {
		if (setQueryText) setQueryText(query);
	};

	const filteredProjects = useMemo(() => {
		const normalizedQuery = queryText.toLowerCase();

		return projects.filter((project) => {
			return (
				project.title.toLowerCase().includes(normalizedQuery) ||
				project.keywords.join().includes(normalizedQuery)
			);
		});
	}, [projects, queryText]);

	const links = useMemo(() => {
		const uniqueTags = Array.from(
			new Set(projects.flatMap((project) => project.keywords))
		);

		return applyFilters(uniqueTags);
	}, [projects]);

	return (
		<main>
			<Tags links={links} />
			<div className="headline">
				<h1>Projects</h1>
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

export const getServerSideProps: GetServerSideProps = loadProjectsPageProps;

export default ProjectsHolder;
