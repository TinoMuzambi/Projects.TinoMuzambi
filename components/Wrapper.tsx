import { AppProvider } from "../context/AppContext";
import { WrapperProps } from "../interfaces";
import Footer from "./Footer";

import Meta from "./Meta";
import NavBar from "./NavBar";

const Wrapper: React.FC<WrapperProps> = ({ children }): JSX.Element => {
	return (
		<AppProvider>
			<Meta />
			<div className="container">
				<NavBar />
				{children as JSX.Element}
				<Footer />
			</div>
		</AppProvider>
	);
};

export default Wrapper;
