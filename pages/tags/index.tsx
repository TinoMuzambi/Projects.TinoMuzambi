import { useMemo } from "react";
import type { GetServerSideProps } from "next";
import Link from "next/link";

import Meta from "../../components/Meta";
import type { ProjectsHolderProps } from "../../interfaces";
import { loadProjectsPageProps } from "../../utils/fetch";
import { applyFilters } from "../../utils/helpers";

const AllTags: React.FC<ProjectsHolderProps> = ({ projects }): JSX.Element => {
	const links = useMemo(() => {
		const uniqueTags = Array.from(
			new Set(projects.flatMap((project) => project.keywords))
		);

		return applyFilters(uniqueTags);
	}, [projects]);

	return (
		<>
			<Meta
				title="Tags | Projects.TinoMuzambi"
				description="View languages, tools and technologies I've used in my projects."
			/>
			<main className="tags-page">
				<h1>Tags</h1>
				<div className="cards">
					{links.map((link, key) => (
						<Link key={key} href={`/tags/${link}`} className="card">
							{link}
						</Link>
					))}
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<ProjectsHolderProps> =
	loadProjectsPageProps;

export default AllTags;
