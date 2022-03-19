import Project from "../components/Project";
import SearchProjects from "../components/SearchProjects";
import { applyFilters } from "../utils/helpers";

const ProjectsHolder = ({ queryText, setQueryText, projects }: any) => {
	const searchProj = (query: string) => {
		setQueryText(query);
	};

	const filteredProjects = projects.filter((eachItem: any) => {
		return (
			eachItem["title"].toLowerCase().includes(queryText.toLowerCase()) ||
			eachItem["keywords"].join().includes(queryText.toLowerCase())
		);
	});

	let linkTags: any[] = [];
	projects.forEach((project: any) => {
		project.keywords.forEach((keyword: string) => linkTags.push(keyword));
	});
	linkTags = Array.from(new Set(linkTags));

	linkTags = applyFilters(linkTags);

	return (
		<>
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
		</>
	);
};

export default ProjectsHolder;
