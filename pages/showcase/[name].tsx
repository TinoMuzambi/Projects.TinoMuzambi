import { useEffect } from "react";
import Link from "next/link";

import { nameParam, Project, ShowcaseProps } from "../../interfaces";
import Meta from "../../components/Meta";
import { getProjects } from "../../utils/fetch";
import { GetStaticPaths, GetStaticProps } from "next";

const ShowCase: React.FC<ShowcaseProps> = ({ project }): JSX.Element => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Meta
				title={`${project?.title} | Projects.TinoMuzambi`}
				description={project?.content[0]}
			/>
			<main className="showcase">
				<h1 className="title">{project?.title}</h1>
				<div className="project" data-aos="flip-up" data-aos-delay="200">
					<div className="body">
						<div className="image">
							<p className="text">{project?.shortname}</p>
						</div>
						<div className="description">
							{project?.content.map((paragraph: string, key: number) => (
								<p key={key} className="text">
									{paragraph}
								</p>
							))}
						</div>
					</div>
					<div className="project-footer">
						<p className={project?.link === "" ? "link-hide" : ""}>
							Link:{" "}
							<a target="_blank" rel="noopener noreferrer" href={project?.link}>
								{project?.link.substring(0, 5) === "https"
									? project?.link.substring(8)
									: project?.link.substring(7)}
							</a>
						</p>
						<p className={project?.github === "" ? "link-hide" : ""}>
							GitHub:{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={project?.github}
							>
								{project?.github.substring(19)}
							</a>
						</p>
						<ul className="tag">
							{project?.keywords.map((keyword: string, key: number) => (
								<li className="tags" key={key}>
									<Link href={`/tags/${keyword}`}>
										<a>
											<p className="tag-text">{keyword}</p>
										</a>
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

export const getStaticProps: GetStaticProps = async (context) => {
	const { name } = context.params as nameParam;
	const projects: Project[] = await getProjects();
	const project: Project = (await projects.find(
		(project) => project.name === name
	)) as Project;

	return {
		props: { project },
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projects: Project[] = await getProjects();

	const paths = projects.map((el) => {
		const name = el.name;
		return {
			params: { name },
		};
	});
	return { paths, fallback: false };
};

export default ShowCase;
