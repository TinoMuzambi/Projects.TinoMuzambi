import { AppProps } from "next/app";
import { useEffect } from "react";

import Wrapper from "../components/Wrapper";
import "../sass/App.scss";

type ReactDevToolsWindow = Window & {
	__REACT_DEVTOOLS_GLOBAL_HOOK__?: Record<string, unknown>;
};

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	useEffect(() => {
		const disableReactDevTools = (): void => {
			const noop = (): void => undefined;
			const devTools = (window as ReactDevToolsWindow)
				.__REACT_DEVTOOLS_GLOBAL_HOOK__;

			if (devTools) {
				for (const [key, value] of Object.entries(devTools)) {
					devTools[key] = typeof value === "function" ? noop : null;
				}
			}
		};
		if (process.env.NODE_ENV === "production") disableReactDevTools();
	}, []);

	return (
		<Wrapper>
			<Component {...pageProps} />
		</Wrapper>
	);
};

export default MyApp;
