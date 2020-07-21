import React from 'react';
import projects from '../pages/projects-content';
import Project from './Project';

const Tags = ({ match }) => {
    const name = match.params.name;

    const filteredProjects = projects.filter(eachItem => {
        return (
            eachItem["keywords"]
            .includes(name)
        );
    });
    return (
        <>
				<h1 className="project-title">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
				<Project projects={filteredProjects} />
			</>
    );
}

export default Tags;