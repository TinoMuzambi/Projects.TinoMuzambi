import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const NavBar: React.FC = (): JSX.Element => {
	const { setQueryText } = useContext(AppContext);

	return (
		<header>
			<nav className="nav">
				<Link href="/">
					<a
						onClick={() => {
							if (setQueryText) setQueryText("");
						}}
					>
						Projects.TinoMuzambi
					</a>
				</Link>
				<div className="secondary">
					<Link href="/tags">
						<a>Tags</a>
					</Link>
					<Link href="/featured">
						<a>Featured</a>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
