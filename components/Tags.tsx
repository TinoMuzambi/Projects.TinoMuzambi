import Link from "next/link";

const Tags = ({ links }) => {
	return (
		<div className="quick-links" data-aos="fade-up">
			{links.map((i, key) => (
				<Link key={key} href={`/tags/${i}`}>
					<a className="tags">{i}</a>
				</Link>
			))}
		</div>
	);
};

export default Tags;
