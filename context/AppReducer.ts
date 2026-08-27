import type { AppAction, AppState } from "../interfaces";

export const appReducer = (state: AppState, action: AppAction): AppState => {
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

export default appReducer;
