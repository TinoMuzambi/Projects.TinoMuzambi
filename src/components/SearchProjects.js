import React from "react";

const SearchProjects = ({ searchProj }) => {
	return (
		<div className="search-field">
			<input
				type="text"
				id="searchProj0"
				placeholder="Search Projects"
				onChange={(e) => searchProj(e.target.value)}
			/>
		</div>
	);
};

export default SearchProjects;
