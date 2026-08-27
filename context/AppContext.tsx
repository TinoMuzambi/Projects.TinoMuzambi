import { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
import { AppProviderProps, ContextProps, Project } from "../interfaces";

const initialState: ContextProps = {
	projects: [],
	queryText: "",
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setProjects = (value: Project[]): void => {
		dispatch({
			type: "SET_PROJECTS",
			projects: value,
			queryText: state.queryText,
		});
	};

	const setQueryText = (value: string): void => {
		dispatch({
			type: "SET_QUERY_TEXT",
			queryText: value,
			projects: state.projects,
		});
	};

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
