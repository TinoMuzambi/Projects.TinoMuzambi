import { strict as assert } from "assert";
import { suite } from "uvu";

import type { Project } from "../interfaces";
import {
	getRequiredNameParam,
	getRequiredProject,
} from "../utils/helpers";

const routes = suite("Typed route boundaries");

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

routes("reads the required dynamic route name", () => {
	assert.equal(
		getRequiredNameParam({ name: "projects.tinomuzambi" }),
		"projects.tinomuzambi"
	);
});

routes("fails closed when a dynamic route name is missing", () => {
	assert.throws(
		() => getRequiredNameParam(undefined),
		/Missing required route name parameter\./
	);
});

routes("finds the exact project selected by a showcase route", () => {
	assert.equal(
		getRequiredProject([project], "projects.tinomuzambi"),
		project
	);
});

routes("fails closed when Storyblok does not contain a showcase route", () => {
	assert.throws(
		() => getRequiredProject([project], "missing-project"),
		/Missing required project for showcase route\./
	);
});

routes.run();
