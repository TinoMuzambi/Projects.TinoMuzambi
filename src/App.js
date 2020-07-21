import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import ProjectsHolder from "./components/ProjectsHolder";
import ShowCase from "./components/ShowCase";
import Tags from "./components/Tags";
import Footer from "./components/Footer";
import NotFoundPage from "./components/NotFoundPage";
import AOS from "aos";
import "./aos.css";
import "./App.css";

class App extends Component {
	componentDidMount() {
		// or simply just AOS.init();
		AOS.init();
	}

	render() {
		return (
			<>
				<Router>
					<NavBar />
					<div className="page-body">
						<Switch>
							<Route path="/" component={ProjectsHolder} exact />
							<Route path="/showcase/:name" component={ShowCase} />
							<Route path="/tags/:name" component={Tags} />
							<Route component={NotFoundPage} />
						</Switch>
					</div>
					<Footer />
				</Router>
			</>
		);
	}
}

export default App;
