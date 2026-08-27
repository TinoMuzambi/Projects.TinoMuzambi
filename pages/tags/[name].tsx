import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";

import Meta from "../../components/Meta";
import Project from "../../components/Project";
import type { NameParams, TagsProps } from "../../interfaces";
import { getProjects } from "../../utils/fetch";
import { getRequiredNameParam } from "../../utils/helpers";

const Tags: React.FC<TagsProps> = ({ filteredProjects }): JSX.Element => {
	const router = useRouter();
	const routeName = router.query["name"];
	const name = Array.isArray(routeName) ? routeName[0] ?? "" : routeName ?? "";
	const title = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

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

export const getStaticProps: GetStaticProps<TagsProps, NameParams> = async (
	context
) => {
	const name = getRequiredNameParam(context.params);
	const projects = await getProjects();
	const filteredProjects = projects.filter((eachItem) => {
		return eachItem.keywords.includes(name);
	});

	return {
		props: { filteredProjects },
	};
};

export const getStaticPaths: GetStaticPaths<NameParams> = async () => {
	const projects = await getProjects();

	const allKeywords = projects.flatMap((project) => project.keywords);
	const paths = Array.from(new Set(allKeywords)).map((name) => {
		return {
			params: { name },
		};
	});

	return { paths, fallback: false };
};

export default Tags;
