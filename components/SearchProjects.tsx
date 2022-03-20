import { SearchProjectsProps } from "../interfaces";

const SearchProjects: React.FC<SearchProjectsProps> = ({
	query,
	searchProj,
}): JSX.Element => {
	return (
		<input
			type="text"
			id="searchProj0"
			placeholder="Search Projects"
			value={query}
			onChange={(e) => searchProj(e.target.value)}
		/>
	);
};

export default SearchProjects;
