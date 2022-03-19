import { AppProvider } from "../context/AppContext";
import { WrapperProps } from "../interfaces";
import Footer from "./Footer";

import Meta from "./Meta";
import NavBar from "./NavBar";

const Wrapper: React.FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<AppProvider>
			<Meta />
			<NavBar />
			{children as JSX.Element}
			<Footer />
		</AppProvider>
	);
};

export default Wrapper;
