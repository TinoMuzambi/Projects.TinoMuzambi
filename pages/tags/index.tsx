import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

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
		<main>
			{links.map((link, key) => (
				<Link key={key} href={`/tags/${link}`}>
					<a className="card">{link}</a>
				</Link>
			))}
		</main>
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
