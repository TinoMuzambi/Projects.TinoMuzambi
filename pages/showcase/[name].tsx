import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const ShowCase = ({ match, projects }: any) => {
	const router = useRouter();
	const [name] = useState(router.query.name);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const project = projects.find((project: any) => project.name === name);
	document.title = `${project.title} | Projects.TinoMuzambi`;
	return (
		<>
			<h1 className="project-title">{project.title}</h1>
			<div className="project">
				<div className="wrapper" data-aos="flip-up" data-aos-delay="200">
					<div className="project-desc">
						<div className="project-image">
							<p className="project-image-text">{project.shortname}</p>
						</div>
						<div className="projects-desc-pars">
							{project.content.map((paragraph: any, key: any) => (
								<p key={key} className="project-desc-text">
									{paragraph}
								</p>
							))}
						</div>
					</div>
					<div className="project-footer">
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
						<ul className="tag">
							{project.keywords.map((keyword: any, key: any) => (
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
			</div>
		</>
	);
};

export default ShowCase;
