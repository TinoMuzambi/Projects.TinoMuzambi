import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => (

    <nav className="nav">
        <div className="nav-menu flex-row">
            <div className="nav-brand">
                <Link className="text-gray" to="/">Projects.TinoMuzambi</Link>
            </div>
            <ul>
                <li className="nav-link">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-link">
                    <Link to="/contact">Contact Me</Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default NavBar;