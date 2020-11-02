import React from 'react';

import { NavLink } from 'react-router-dom'

import './RightNav.css'

const RightNav = () => {
    return (
        <ul className="navbar-right-side">
            <li className="navbar-right-side__home">
                <NavLink to="/" className="navbar-header__home">Home</NavLink>
            </li>
            <li>
                <NavLink to="/favorites" className="navbar-header__favorites">Favorites</NavLink>
            </li> 
        </ul>
    )
}

export default RightNav
