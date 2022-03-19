import { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";
import { AppProviderProps, ContextProps, Project } from "../interfaces";

const initialState: ContextProps = {
	projects: [],
};

export const AppContext = createContext<ContextProps>(initialState);

export const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	const setProjects: Function = (value: Project[]) => {
		dispatch({
			type: "SET_PROJECTS",
			projects: value,
		});
	};

	return (
		<AppContext.Provider
			value={{
				projects: state.projects,
				setProjects,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
