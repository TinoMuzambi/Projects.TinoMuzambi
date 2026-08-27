import type { ParsedUrlQuery } from "querystring";
import type { ReactNode } from "react";

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
	content: [string, ...string[]];
	link: string;
	github: string;
	keywords: string[];
	featured: boolean;
};

export interface ContextProps {
	projects: Project[];
	setProjects: (projects: Project[]) => void;
	queryText: string;
	setQueryText: (query: string) => void;
}

export interface AppProviderProps {
	children: ReactNode;
}

export type AppState = {
	projects: Project[];
	queryText: string;
};

export type AppAction =
	| { type: "SET_PROJECTS"; projects: Project[] }
	| { type: "SET_QUERY_TEXT"; queryText: string };

export interface NameParams extends ParsedUrlQuery {
	name: string;
}
