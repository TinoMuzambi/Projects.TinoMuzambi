import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

export const getSearchDestination = (
	query: string | string[] | undefined
): string => {
	const searchText = (Array.isArray(query) ? query[0] : query) ?? "";

	return `/?text=${encodeURIComponent(searchText)}`;
};

type SearchRedirect = {
	redirect: {
		destination: string;
		permanent: false;
	};
};

interface SearchParams extends ParsedUrlQuery {
	query: string;
}

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
	Record<string, never>,
	SearchParams
> = async ({ params }) => createSearchRedirect(params?.query);

export default OpenSearch;
