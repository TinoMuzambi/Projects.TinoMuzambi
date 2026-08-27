import { GetServerSideProps } from "next";

export const getSearchDestination = (
	query: string | string[] | undefined
): string => {
	const searchText = Array.isArray(query) ? query[0] : query ?? "";

	return `/?text=${encodeURIComponent(searchText)}`;
};

type SearchRedirect = {
	redirect: {
		destination: string;
		permanent: false;
	};
};

export const createSearchRedirect = (
	query: string | string[] | undefined
): SearchRedirect => ({
	redirect: {
		destination: getSearchDestination(query),
		permanent: false,
	},
});

const OpenSearch: React.FC = (): null => null;

export const getServerSideProps: GetServerSideProps<
	Record<string, never>
> = async ({ params }) => createSearchRedirect(params?.query);

export default OpenSearch;
