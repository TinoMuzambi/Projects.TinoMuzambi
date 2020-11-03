import React, { Component } from "react";
import Project from "../components/Project";
import projects from "../data/projects-content";
import SearchProjects from "../components/SearchProjects";

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
		const filteredProjects = projects.filter((eachItem) => {
			return (
				eachItem["title"]
					.toLowerCase()
					.includes(this.state.queryText.toLowerCase()) ||
				eachItem["keywords"].join().includes(this.state.queryText.toLowerCase())
			);
		});
		return (
			<>
				<div className="headline">
					<h1 className="project-title">Projects</h1>
					<SearchProjects searchProj={this.searchProj} />
				</div>
				<div className="projects">
					<Project projects={filteredProjects} />
				</div>
			</>
		);
	}
}

export default ProjectsHolder;
