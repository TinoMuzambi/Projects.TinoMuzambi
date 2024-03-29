import Head from "next/head";

import { MetaProps } from "../interfaces";
import { BASE_URL } from "../utils";

const Meta: React.FC<MetaProps> = ({
	title,
	description,
	keywords,
	url,
	image,
}): JSX.Element => (
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="theme-color" content="#000000" />
		<meta name="keywords" content={keywords} />
		<meta name="description" content={description} />

		{/* <!-- Google / Search Engine Tags --> */}
		<meta itemProp="name" content={title} />
		<meta itemProp="description" content={description} />
		<meta itemProp="image" content={image} />

		{/* <!-- Facebook Meta Tags --> */}
		<meta property="og:url" content={url} />
		<meta property="og:type" content="website" />
		<meta property="og:title" content={title} />
		<meta property="og:description" content={description} />
		<meta property="og:image" content={image} />

		{/* <!-- Twitter Meta Tags --> */}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={title} />
		<meta name="twitter:description" content={description} />
		<meta name="twitter:image" content={image} />

		<meta charSet="utf-8" />
		<link rel="icon" href="/favicon.ico" />
		<meta name={title} content={description} />
		<link rel="apple-touch-icon" href="/logo192.png" />
		<link rel="manifest" href="/manifest.json" />
		<title>{title}</title>

		<link rel="preconnect" href="https://api.storyblok.com" />
		<link rel="preconnect" href="https://a.storyblok.com" />
		<link rel="preconnect" href="https://www.google-analytics.com" />
	</Head>
);

Meta.defaultProps = {
	title: "Projects.TinoMuzambi",
	keywords: "next.js, react, typescript, projects, tino muzambi",
	description:
		"A landing page for all the projects I've worked on. It provides an overview of each project as well as the stack used in each project and where possible, a link to see it in action.",
	image: "https://a.storyblok.com/f/105639/512x512/03489159d5/logo512.png",
	url: BASE_URL,
};

export default Meta;
