import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";

import Meta from "../../components/Meta";
import { ProjectsHolderProps, Project } from "../../interfaces";
import { getProjects } from "../../utils/fetch";
import { applyFilters } from "../../utils/helpers";

const AllTags: React.FC<ProjectsHolderProps> = ({ projects }): JSX.Element => {
	const [links, setLinks] = useState<string[]>([]);

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
		<>
			<Meta
				title="Tags | Projects.TinoMuzambi"
				description="View languages, tools and technologies I've used in my projects."
			/>
			<main className="tags-page">
				<h1>Tags</h1>
				<div className="cards">
					{links.map((link, key) => (
						<Link key={key} href={`/tags/${link}`}>
							<a className="card">{link}</a>
						</Link>
					))}
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const projects: Project[] = await getProjects();

	return {
		props: {
			projects,
		},
	};
};

export default AllTags;
