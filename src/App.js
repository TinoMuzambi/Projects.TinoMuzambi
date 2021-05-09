import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AOS from "aos";
import { Helmet } from "react-helmet";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProjectsHolder from "./pages/ProjectsHolder";
import ShowCase from "./pages/ShowCase";
import Tags from "./pages/Tags";
import NotFoundPage from "./pages/NotFoundPage";
import OpenSearch from "./pages/OpenSearch";
import { getProjects } from "./utils/fetch";
import "./App.css";

const App = () => {
	const [queryText, setQueryText] = useState("");
	const [projects, setProjects] = useState([]);
	const [fetching, setFetching] = useState(true);

	useEffect(() => {
		AOS.init();
		let data;
		const getData = async () => {
			data = await getProjects();
			setProjects(data);
			setFetching(false);
		};
		getData();
	}, []);

	if (fetching) return null;

	return (
		<Router>
			<NavBar setQueryText={setQueryText} />
			<div className="page-body">
				<Switch>
					<div className="outer">
						<Route
							path="/"
							exact
							render={() => (
								<>
									<Helmet>
										<title>Projects.TinoMuzambi</title>
									</Helmet>
									<ProjectsHolder
										queryText={queryText}
										setQueryText={setQueryText}
										projects={projects}
									/>
								</>
							)}
						/>

						<Route
							exact
							path="/showcase/:name"
							render={() => <ShowCase projects={projects} />}
						/>
						<Route
							exact
							path="/tags/:name"
							render={() => <Tags projects={projects} />}
						/>
						<Route
							exact
							path="/search/:query"
							render={() => <OpenSearch setQueryText={setQueryText} />}
						/>
						{/* OpenSearch route for searching site.*/}
					</div>
					<Route component={NotFoundPage} />
				</Switch>
			</div>
			<Footer />
		</Router>
	);
};

export default App;
