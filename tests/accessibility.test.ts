import { strict as assert } from "assert";
import { createElement, isValidElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { suite } from "uvu";

import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchProjects, {
	NoSearchResults,
} from "../components/SearchProjects";
import Tags from "../components/Tags";
import MyDocument from "../pages/_document";
import AllTags from "../pages/tags";
import type { Project } from "../interfaces";

const accessibility = suite("Accessible markup");

accessibility("declares the document language", () => {
	const documentElement: unknown = MyDocument.prototype.render();

	assert(isValidElement<{ lang?: string }>(documentElement));
	assert.equal(documentElement.props.lang, "en");
});

accessibility("names social links without exposing decorative icons", () => {
	const markup = renderToStaticMarkup(createElement(Footer));

	assert.match(markup, /<p class="copyright">/);
	assert.doesNotMatch(markup, /<h4>/);
	assert.match(markup, /aria-label="Tino Muzambi on LinkedIn"/);
	assert.match(markup, /aria-label="Tino Muzambi on GitHub"/);
	assert.equal((markup.match(/aria-hidden="true"/g) ?? []).length, 2);
	assert.equal((markup.match(/focusable="false"/g) ?? []).length, 2);
});

accessibility("gives the project search a persistent accessible name", () => {
	const markup = renderToStaticMarkup(
		createElement(SearchProjects, {
			query: "",
			searchProj: () => undefined,
		})
	);

	assert.match(markup, /aria-label="Search projects"/);
});

accessibility("announces an empty project search", () => {
	const waitingMarkup = renderToStaticMarkup(
		createElement(NoSearchResults, { showMessage: false })
	);
	const emptyMarkup = renderToStaticMarkup(
		createElement(NoSearchResults, { showMessage: true })
	);

	assert.match(waitingMarkup, /role="status"/);
	assert.match(waitingMarkup, /class="[^"]*empty-results/);
	assert.doesNotMatch(waitingMarkup, /There are no projects/);
	assert.match(emptyMarkup, /role="status"/);
	assert.match(emptyMarkup, /class="[^"]*empty-results/);
	assert.match(
		emptyMarkup,
		/There are no projects that match that search term\./
	);
});

accessibility("names project tag navigation", () => {
	const project: Project = {
		name: "projects.tinomuzambi",
		shortname: "PT",
		title: "Projects.TinoMuzambi",
		content: ["Project description"],
		link: "https://projects.tinomuzambi.com",
		github: "https://github.com/TinoMuzambi/Projects.TinoMuzambi",
		keywords: ["typescript"],
		featured: true,
	};
	const homeMarkup = renderToStaticMarkup(
		createElement(Tags, { links: ["typescript"] })
	);
	const indexMarkup = renderToStaticMarkup(
		createElement(AllTags, { projects: [project] })
	);
	const mainNavigationMarkup = renderToStaticMarkup(createElement(NavBar));

	assert.match(mainNavigationMarkup, /aria-label="Main"/);
	assert.match(homeMarkup, /<nav aria-label="Project tags"/);
	assert.match(indexMarkup, /<nav class="cards" aria-label="All project tags"/);
});

accessibility.run();
