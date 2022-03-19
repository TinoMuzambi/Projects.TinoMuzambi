import { State, Actions } from "../interfaces";

const Reducer = (state: State, action: Actions): State => {
	switch (action.type) {
		case "SET_PROJECTS":
			return {
				...state,
				projects: action.projects,
			};
		case "SET_QUERY_TEXT": {
			return {
				...state,
				queryText: action.queryText,
			};
		}
	}
};

export default Reducer;
