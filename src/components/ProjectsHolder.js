import React, { Component } from "react";
import Project from "./Project";
import projects from "../pages/projects-content";
import SearchProjects from "./SearchProjects";

class ProjectsHolder extends Component {
	constructor() {
		super();
		this.state = {
			queryText: "",
		};
		this.searchProj = this.searchProj.bind(this);
	}

	searchProj(query) {
		this.setState({ queryText: query });
	}

	render() {
		const filteredProjects = projects.filter(eachItem => {
			return (
				eachItem["title"]
				.toLowerCase()
				.includes(this.state.queryText.toLowerCase()) ||
				eachItem["keywords"]
				.join()
				.includes(this.state.queryText.toLowerCase())
			);
		});
		return (
			<>
				<h1 className="project-title">Projects</h1>
				<SearchProjects searchProj={this.searchProj} />
				<Project projects={filteredProjects} />
			</>
		);
	}
}

export default ProjectsHolder;
