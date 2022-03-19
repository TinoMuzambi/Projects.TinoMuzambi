import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = (): JSX.Element => (
	<footer>
		<div className="rights flex-row">
			<h4>Made with React. Copyright © Tino Muzambi 2020 - 2021</h4>
		</div>
		<div className="flex-row social">
			<a
				href="https://bit.ly/TinoLinkedIn"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>
					<FaLinkedinIn />
				</span>
			</a>
			<a
				href="https://bit.ly/TinoGitHub"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>
					<FaGithub />
				</span>
			</a>
		</div>
	</footer>
);

export default Footer;
