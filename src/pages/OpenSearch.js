import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OpenSearch = ({ setQueryText }) => {
	const location = useLocation();

	useEffect(() => {
		const query = location.pathname.substring(8);
		setQueryText(query);
	}, [location.pathname, setQueryText]);

	return null;
};

export default OpenSearch;
