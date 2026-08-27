import { createContext, useCallback, useReducer } from "react";

import AppReducer from "./AppReducer";
import type {
	AppProviderProps,
	AppState,
	ContextProps,
	Project,
} from "../interfaces";

const initialState: AppState = {
	projects: [],
	queryText: "",
};

export const AppContext = createContext<ContextProps>({
	...initialState,
	setProjects: () => undefined,
	setQueryText: () => undefined,
});

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setProjects = useCallback((value: Project[]): void => {
		dispatch({
			type: "SET_PROJECTS",
			projects: value,
		});
	}, []);

	const setQueryText = useCallback((value: string): void => {
		dispatch({
			type: "SET_QUERY_TEXT",
			queryText: value,
		});
	}, []);

	return (
		<AppContext.Provider
			value={{
				projects: state.projects,
				setProjects,
				queryText: state.queryText,
				setQueryText,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
