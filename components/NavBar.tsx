import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const NavBar: React.FC = (): JSX.Element => {
	const { setQueryText } = useContext(AppContext);

	return (
		<nav className="nav">
			<div className="nav-menu flex-row">
				<div className="nav-brand">
					<Link href="/">
						<a
							className="text-gray"
							onClick={() => {
								if (setQueryText) setQueryText("");
							}}
						>
							Projects.TinoMuzambi
						</a>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
