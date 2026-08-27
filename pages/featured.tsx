import type { GetServerSideProps } from "next";
import Meta from "../components/Meta";
import Project from "../components/Project";
import type { ProjectsHolderProps } from "../interfaces";
import { loadProjectsPageProps } from "../utils/fetch";

const Featured: React.FC<ProjectsHolderProps> = ({ projects }): JSX.Element => {
	return (
		<>
			<Meta
				title="Featured Projects | Projects.TinoMuzambi"
				description="View my featured projects."
			/>
			<main className="featured">
				<h1>Featured Projects</h1>
				<div className="cards">
					{projects.map((project, key) =>
						project.featured ? (
							<Project project={project} key={key} />
						) : null
					)}
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<ProjectsHolderProps> =
	loadProjectsPageProps;
export default Featured;
