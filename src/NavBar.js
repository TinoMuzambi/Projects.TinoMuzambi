import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => (

    <nav className="nav">
        <div className="nav-menu flex-row">
            <div className="nav-brand">
                <Link className="text-gray" to="/">Projects.TinoMuzambi</Link>
            </div>
        </div>
    </nav>
);

export default NavBar;