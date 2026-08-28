import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = (): JSX.Element => (
	<footer>
		<p className="copyright">
			Made with React. Copyright © Tino Muzambi 2020 -{" "}
			{new Date().getFullYear()}
		</p>

		<div className="social">
			<a
				aria-label="Tino Muzambi on LinkedIn"
				href="https://bit.ly/TinoLinkedIn"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>
					<FaLinkedinIn aria-hidden="true" focusable="false" />
				</span>
			</a>
			<a
				aria-label="Tino Muzambi on GitHub"
				href="https://bit.ly/TinoGitHub"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>
					<FaGithub aria-hidden="true" focusable="false" />
				</span>
			</a>
		</div>
	</footer>
);

export default Footer;
