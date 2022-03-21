import { GetServerSideProps } from "next";
import Meta from "../components/Meta";
import Project from "../components/Project";
import { Project as P, ProjectsHolderProps } from "../interfaces";
import { getProjects } from "../utils/fetch";

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
					{projects.map((project, key) => (
						<Project project={project} key={key} />
					))}
				</div>
			</main>
		</>
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
export default Featured;
