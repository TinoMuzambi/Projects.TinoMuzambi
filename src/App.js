import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectsHolder from "./pages/ProjectsHolder";
import ShowCase from "./pages/ShowCase";
import Tags from "./pages/Tags";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";
import AOS from "aos";
import "./App.css";
import { Helmet } from "react-helmet";
import OpenSearch from "./pages/OpenSearch";

const App = () => {
	const [queryText, setQueryText] = useState("");

	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<Router>
			<NavBar />
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
									/>
								</>
							)}
						/>
						<Route path="/showcase/:name" component={ShowCase} />
						<Route path="/tags/:name" component={Tags} />
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
