import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const OpenSearch = ({ setQueryText, blogsRef }) => {
	const location = useLocation();
	const history = useHistory();

	useEffect(() => {
		const query = location.pathname.substring(8);
		setQueryText(query);
		history.push({
			pathname: "/",
			state: {
				fromOpenSearch: true,
			},
		});
	}, [location.pathname, history, setQueryText]);

	return null;
};

export default OpenSearch;
