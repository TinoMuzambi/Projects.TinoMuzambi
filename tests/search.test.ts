import { strict as assert } from "assert";
import { suite } from "uvu";

import {
	createSearchRedirect,
	getSearchDestination,
} from "../pages/search/[query]";

const search = suite("Search route");

search("redirects a legacy search URL to the home-page query", () => {
	assert.deepEqual(createSearchRedirect("android"), {
		redirect: {
			destination: "/?text=android",
			permanent: false,
		},
	});
});

search("safely encodes search text in the redirect", () => {
	assert.equal(getSearchDestination("react native"), "/?text=react%20native");
});

search.run();
