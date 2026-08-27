import { useEffect } from "react";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";

import type { NameParams, ShowcaseProps } from "../../interfaces";
import Meta from "../../components/Meta";
import { getProjects } from "../../utils/fetch";
import {
	getRequiredNameParam,
	getRequiredProject,
} from "../../utils/helpers";

const ShowCase: React.FC<ShowcaseProps> = ({ project }): JSX.Element => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Meta
				title={`${project.title} | Projects.TinoMuzambi`}
				description={project.content[0]}
			/>
			<main className="showcase">
				<h1 className="title">{project.title}</h1>
				<div className="project" data-aos="flip-up" data-aos-delay="200">
					<div className="body">
						<div className="image">
							<p className="text">{project.shortname}</p>
						</div>
						<div className="description">
							{project.content.map((paragraph, key) => (
								<p key={key} className="text">
									{paragraph}
								</p>
							))}
						</div>
					</div>
					<div className="footer">
						<p className={project.link === "" ? "link-hide" : ""}>
							Link:{" "}
							<a target="_blank" rel="noopener noreferrer" href={project.link}>
								{project.link.substring(0, 5) === "https"
									? project.link.substring(8)
									: project.link.substring(7)}
							</a>
						</p>
						<p className={project.github === "" ? "link-hide" : ""}>
							GitHub:{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={project.github}
							>
								{project.github.substring(19)}
							</a>
						</p>
						<ul className="tags">
							{project.keywords.map((keyword, key) => (
								<li className="tag" key={key}>
									<Link href={`/tags/${keyword}`} className="text">
										{keyword}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps<ShowcaseProps, NameParams> = async (
	context
) => {
	const name = getRequiredNameParam(context.params);
	const projects = await getProjects();
	const project = getRequiredProject(projects, name);

	return {
		props: { project },
	};
};

export const getStaticPaths: GetStaticPaths<NameParams> = async () => {
	const projects = await getProjects();

	const paths = projects.map((el) => {
		const name = el.name;
		return {
			params: { name },
		};
	});
	return { paths, fallback: false };
};

export default ShowCase;
