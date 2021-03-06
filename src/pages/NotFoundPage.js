import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
	<div className="not-found">
		<h1 className="four04-title">404</h1>
		<p className="four04-body">Looks like I'm still working on that project.</p>
		<p className="four04-body2">
			Let's talk about it on{" "}
			<a href="https://www.linkedin.com/in/tinomuzambi/">LinkedIn.</a>
		</p>
		<p className="four04-body2">or</p>
		<Link to="/">
			<p className="four04-redirect">Return to home</p>
		</Link>
	</div>
);

export default NotFoundPage;
