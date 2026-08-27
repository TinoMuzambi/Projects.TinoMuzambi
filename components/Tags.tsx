import Link from "next/link";

import type { HomeTagsProps } from "../interfaces";

const Tags: React.FC<HomeTagsProps> = ({ links }): JSX.Element => {
	return (
		<div className="tags">
			<h1>Tags</h1>
			<div className="quick-links" data-aos="fade-up">
				{links
					.sort((a, b) => a.localeCompare(b))
					.map((i, key) => (
						<Link key={key} href={`/tags/${i}`} className="tag">
							{i}
						</Link>
					))}
			</div>
		</div>
	);
};

export default Tags;
