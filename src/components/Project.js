import React from "react";
import { Link } from "react-router-dom";

const Project = ({ projects }) => (
	<>
		{projects.map((project, key) => (
            <div className='wrapper'>
                <Link key={key} to={`/showcase/${project.name}`}>
                    <h2 className="projects-title">{project.title}</h2>
                    <div className="project-desc">
                        <div className="project-image">
                            <p className="project-image-text">{project.shortname}</p>
                        </div>
                        <p className="project-desc-text">{project.content}</p>
                    </div>
                </Link>
            </div>
		))}
		{/* <div class="wrapper">
			<h2 className="project-title">Title</h2>
            <div className="project-desc">
                <img src={WA} className="project-image" alt="WA"/>
                <p className="project-desc-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                    fringilla tristique vulputate. Praesent cursus ante sed diam tempus
                    feugiat. Nulla condimentum dolor congue mollis blandit. Aliquam ac
                    bibendum mauris. Mauris nunc elit, accumsan at pretium ut, rutrum sit
                    amet nisi. Nullam eu turpis ac neque accumsan dignissim. Morbi nec
                    mauris eu metus vulputate auctor ac ut massa. Nunc scelerisque, elit
                    vitae mattis tempor, purus lorem tincidunt justo, vitae cursus velit
                    ipsum vitae nulla. Suspendisse in venenatis leo, sit amet ultricies
                    nulla. Nunc elementum enim at feugiat feugiat. Maecenas justo felis,
                    ultrices at suscipit eget, aliquet sit amet nisi. Nulla id placerat
                    libero, vitae maximus ligula. Donec eleifend id justo quis rhoncus.
                    Aliquam ut sem enim. Nulla vitae ligula a dolor vehicula sollicitudin.
                </p>
            </div>
		</div> */}
	</>
);

export default Project;
