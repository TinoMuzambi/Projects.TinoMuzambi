import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { AppContext } from "../../context/AppContext";

const OpenSearch: React.FC = (): JSX.Element => {
	const router = useRouter();
	const { setQueryText } = useContext(AppContext);

	useEffect(() => {
		const query = router.asPath.substring(8);
		if (setQueryText) setQueryText(query);
		router.push("/", {
			query: {
				text: query,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.pathname, setQueryText]);

	return <></>;
};

export default OpenSearch;
