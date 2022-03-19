import { ParsedUrlQuery } from "querystring";

export interface WrapperProps {
	children: JSX.Element | JSX.Element[];
}

export interface MetaProps {
	title?: string;
	description?: string;
	keywords?: string;
	url?: string;
	image?: string;
}

export interface NavBarProps {
	setQueryText: Function;
}

export interface ProjectProps {
	projects: Project[];
}

export interface SearchProjectsProps {
	query: string;
	searchProj: Function;
}

export interface ShowcaseProps {
	project: Project;
}

export interface TagsProps {
	filteredProjects: Project[];
}

export interface ProjectsHolderProps {
	projects: Project[];
}

export type Project = {
	name: string;
	shortname: string;
	title: string;
	content: string[];
	link: string;
	github: string;
	keywords: string[];
	image: string;
};

export interface ContextProps {
	projects: Project[];
	setProjects?: Function;
	queryText: string;
	setQueryText?: Function;
}

export interface AppProviderProps {
	children: JSX.Element[] | JSX.Element;
}

export type State = {
	projects: Project[];
	queryText: string;
};

export type Actions = {
	type: "SET_PROJECTS" | "SET_QUERY_TEXT";
	projects: Project[];
	queryText: string;
};

export interface nameParam extends ParsedUrlQuery {
	name: string;
}
