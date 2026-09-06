import Link from "next/link"

export default function NotFound() {
	return (
		<main className="archive-shell not-found" id="main-content">
			<p className="section-label text-plum">404</p>
			<h1>That project record is not in the archive.</h1>
			<p>The address may have changed, or the project may not have a public record.</p>
			<Link className="primary-action" href="/#index">Search the project index</Link>
		</main>
	)
}
