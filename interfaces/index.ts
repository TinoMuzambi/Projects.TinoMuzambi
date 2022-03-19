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

export type Project = {
	name: string;
	shortName: string;
	title: string;
	content: string;
	link: string;
	github: string;
	keywords: string;
	image: string;
};
