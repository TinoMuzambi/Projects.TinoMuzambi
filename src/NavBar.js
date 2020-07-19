import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => (

    <nav class="nav">
        <div class="nav-menu flex-row">
            <div class="nav-brand">
                <Link class="text-gray" to="/">Projects.TinoMuzambi</Link>
            </div>
            <ul>
                <li class="nav-link">
                    <Link to="/">Home</Link>
                </li>
                <li class="nav-link">
                    <Link to="/contact">Contact Me</Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default NavBar;