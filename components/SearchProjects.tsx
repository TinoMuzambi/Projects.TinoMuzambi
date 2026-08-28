import type { SearchProjectsProps } from "../interfaces";

interface NoSearchResultsProps {
	showMessage: boolean;
}

const SearchProjects: React.FC<SearchProjectsProps> = ({
	query,
	searchProj,
}): JSX.Element => {
	return (
		<input
			aria-label="Search projects"
			type="text"
			placeholder="Search Projects"
			value={query}
			onChange={(e) => searchProj(e.target.value)}
		/>
	);
};

export const NoSearchResults: React.FC<NoSearchResultsProps> = ({
	showMessage,
}): JSX.Element => (
	<p className="empty-results" role="status">
		{showMessage
			? "There are no projects that match that search term."
			: ""}
	</p>
);

export default SearchProjects;
