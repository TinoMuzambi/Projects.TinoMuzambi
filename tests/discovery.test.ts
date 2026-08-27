import { strict as assert } from "assert";
import { suite } from "uvu";

const discovery = suite("Test discovery");

discovery("runs TypeScript test files added to the test directory", () => {
	assert.equal(true, true);
});

discovery.run();
