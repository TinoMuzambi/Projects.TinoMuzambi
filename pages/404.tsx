import Link from "next/link";
import Meta from "../components/Meta";

const NotFoundPage = () => (
	<>
		<Meta title="Page Not Found | Projects.TinoMuzambi" />
		<main className="not-found">
			<h1 className="four04-title">404</h1>
			<p className="four04-body">
				Looks like I&apos;m still working on that project.
			</p>
			<p className="four04-body2">
				Let&apos;s talk about it on{" "}
				<a href="https://www.linkedin.com/in/tinomuzambi/">LinkedIn.</a>
			</p>
			<p className="four04-body2">or</p>
			<Link href="/">
				<a className="four04-redirect">Return to home</a>
			</Link>
		</main>
	</>
);

export default NotFoundPage;
