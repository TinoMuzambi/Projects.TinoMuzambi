import { ParsedUrlQuery } from "querystring";
import { ReactNode } from "react";

export interface WrapperProps {
	children: ReactNode;
}

export interface MetaProps {
	title?: string;
	description?: string;
	keywords?: string;
	url?: string;
	image?: string;
}

export interface NavBarProps {
	setQueryText: (query: string) => void;
}

export interface ProjectProps {
	project: Project;
}

export interface SearchProjectsProps {
	query: string;
	searchProj: (query: string) => void;
}

export interface ShowcaseProps {
	project: Project;
}

export interface TagsProps {
	filteredProjects: Project[];
}

export interface HomeTagsProps {
	links: string[];
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
	featured?: boolean;
};

export interface ContextProps {
	projects: Project[];
	setProjects?: (projects: Project[]) => void;
	queryText: string;
	setQueryText?: (query: string) => void;
}

export interface AppProviderProps {
	children: ReactNode;
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
