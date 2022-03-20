import { SearchProjectsProps } from "../interfaces";

const SearchProjects: React.FC<SearchProjectsProps> = ({
	query,
	searchProj,
}): JSX.Element => {
	return (
		<input
			type="text"
			placeholder="Search Projects"
			value={query}
			onChange={(e) => searchProj(e.target.value)}
		/>
	);
};

export default SearchProjects;
