import { useContext } from "react";
import Link from "next/link";

import { AppContext } from "../context/AppContext";

const NavBar: React.FC = (): JSX.Element => {
	const { setQueryText } = useContext(AppContext);

	return (
		<header>
			<nav className="nav">
				<Link
					href="/"
					onClick={() => {
						if (setQueryText) setQueryText("");
					}}
				>
					Projects.TinoMuzambi
				</Link>
				<div className="secondary">
					<Link href="/featured" className="link">
						Featured Projects
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
