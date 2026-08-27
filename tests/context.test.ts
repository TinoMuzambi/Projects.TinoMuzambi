import { strict as assert } from "assert";
import { suite } from "uvu";

import { appReducer } from "../context/AppReducer";
import type { AppState, Project } from "../interfaces";

const context = suite("Application context");

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

const initialState: AppState = {
	projects: [],
	queryText: "existing query",
};

context("updates projects without changing the active search", () => {
	assert.deepEqual(
		appReducer(initialState, {
			type: "SET_PROJECTS",
			projects: [project],
		}),
		{
			projects: [project],
			queryText: "existing query",
		}
	);
});

context("updates the search without changing projects", () => {
	const state = { ...initialState, projects: [project] };

	assert.deepEqual(
		appReducer(state, {
			type: "SET_QUERY_TEXT",
			queryText: "replacement query",
		}),
		{
			projects: [project],
			queryText: "replacement query",
		}
	);
});

context.run();
