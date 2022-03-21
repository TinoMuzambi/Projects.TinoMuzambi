import Link from "next/link";
import { HomeTagsProps } from "../interfaces";

const Tags: React.FC<HomeTagsProps> = ({ links }): JSX.Element => {
	return (
		<div className="tags">
			<h1>Tags</h1>
			<div className="quick-links" data-aos="fade-up">
				{links.map((i, key) => (
					<Link key={key} href={`/tags/${i}`}>
						<a className="tag">{i}</a>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Tags;
