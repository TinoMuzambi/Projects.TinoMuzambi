import Link from "next/link";

import type { HomeTagsProps } from "../interfaces";

const Tags: React.FC<HomeTagsProps> = ({ links }): JSX.Element => {
	return (
		<section className="tags" aria-labelledby="project-tags-heading">
			<h1 id="project-tags-heading">Tags</h1>
			<nav
				aria-label="Project tags"
				className="quick-links"
				data-aos="fade-up"
			>
				{links
					.sort((a, b) => a.localeCompare(b))
					.map((i, key) => (
						<Link key={key} href={`/tags/${i}`} className="tag">
							{i}
						</Link>
					))}
			</nav>
		</section>
	);
};

export default Tags;
