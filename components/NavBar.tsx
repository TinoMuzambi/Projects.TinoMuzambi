import Link from "next/link";

const NavBar = ({ setQueryText }: any) => (
	<nav className="nav">
		<div className="nav-menu flex-row">
			<div className="nav-brand">
				<Link href="/">
					<a className="text-gray" onClick={() => setQueryText("")}>
						Projects.TinoMuzambi
					</a>
				</Link>
			</div>
		</div>
	</nav>
);

export default NavBar;
