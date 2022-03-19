const SearchProjects = ({ query, searchProj }: any) => {
	return (
		<div className="search-field">
			<input
				type="text"
				id="searchProj0"
				placeholder="Search Projects"
				value={query}
				onChange={(e) => searchProj(e.target.value)}
			/>
		</div>
	);
};

export default SearchProjects;
