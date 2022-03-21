import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Meta from "../../components/Meta";
import Project from "../../components/Project";
import { nameParam, Project as P, TagsProps } from "../../interfaces";
import { GetStaticPaths, GetStaticProps } from "next";
import { getProjects } from "../../utils/fetch";

const Tags: React.FC<TagsProps> = ({ filteredProjects }): JSX.Element => {
	const [title, setTitle] = useState("");
	const [name, setName] = useState("");
	const router = useRouter();

	useEffect(() => {
		if (name) {
			setTitle(name.charAt(0).toUpperCase() + name.slice(1));
		}
	}, [name]);

	useEffect(() => {
		setName(router.query.name as string);
	}, [router.query]);

	return (
		<>
			<Meta
				title={`${title} | Projects.TinoMuzambi`}
				description={`All ${title} projects on Projects.TinoMuzambi`}
			/>
			<main className="tags-page">
				<h1>{title}</h1>
				<div className="projects" data-aos="fade-up">
					{filteredProjects.map((project, key) => (
						<Project project={project} key={key} />
					))}
				</div>
			</main>
		</>
	);
};

export const getStaticProps: GetStaticProps = async (context) => {
	const { name } = context.params as nameParam;
	const projects: P[] = await getProjects();
	const filteredProjects = projects.filter((eachItem) => {
		return eachItem.keywords.includes(name);
	});

	return {
		props: { filteredProjects },
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projects: P[] = await getProjects();

	let allKeywords: any = projects.map((project) => project.keywords);
	allKeywords = allKeywords.reduce(
		(a: string[], b: string[]) => a.concat(b),
		[]
	);
	allKeywords = [...Array.from(new Set(allKeywords))];

	let paths = allKeywords.map((name: string) => {
		return {
			params: { name },
		};
	});

	return { paths, fallback: false };
};

export default Tags;
