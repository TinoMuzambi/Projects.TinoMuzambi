import { useContext, useEffect, useMemo } from "react";
import type { GetServerSideProps } from "next";
import AOS from "aos";

import Project from "../components/Project";
import SearchProjects, {
	NoSearchResults,
} from "../components/SearchProjects";
import { applyFilters } from "../utils/helpers";
import { loadProjectsPageProps } from "../utils/fetch";
import { AppContext } from "../context/AppContext";
import type { ProjectsHolderProps } from "../interfaces";
import { useRouter } from "next/router";
import Tags from "../components/Tags";
import "aos/dist/aos.css";

const ProjectsHolder: React.FC<ProjectsHolderProps> = ({
	projects,
}): JSX.Element => {
	const router = useRouter();
	const { setProjects, queryText, setQueryText } = useContext(AppContext);
	const routeText = router.query["text"];

	useEffect(() => {
		AOS.init();
		setProjects(projects);
	}, [projects, setProjects]);

	useEffect(() => {
		if (typeof routeText === "string") {
			setQueryText(routeText);
		} else if (routeText?.[0]) {
			setQueryText(routeText[0]);
		}
	}, [routeText, setQueryText]);

	const searchProj = (query: string): void => setQueryText(query);

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
				<NoSearchResults showMessage={filteredProjects.length === 0} />
				{filteredProjects.map((project, key: number) => (
					<Project key={key} project={project} />
				))}
			</div>
		</main>
	);
};

export const getServerSideProps: GetServerSideProps<ProjectsHolderProps> =
	loadProjectsPageProps;

export default ProjectsHolder;
