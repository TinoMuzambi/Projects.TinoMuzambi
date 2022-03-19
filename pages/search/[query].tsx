import { useEffect } from "react";
import { useRouter } from "next/router";

const OpenSearch: React.FC = ({ setQueryText }: any): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		const query = router.pathname.substring(8);
		setQueryText(query);
		router.push("/", {
			query: {
				fromOpenSearch: true,
			},
		});
	}, [router.pathname, setQueryText]);

	return <></>;
};

export default OpenSearch;
