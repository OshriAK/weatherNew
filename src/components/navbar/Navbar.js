import React from 'react';
import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom';

import RightNav from './RightNav'
import Home from '../home/Home';
import Favorites from '../favorites/Favorites';
import DrawerRight from './DrawerRight'
import './Navbar.css';

const Navbar = () => {
    return (
        <Router>
            <div className="navbar">
                <div className="navbar-header">
                    <div>
                        <NavLink to="/" className="navbar-header__logo">WeatherApp</NavLink>
                    </div>
                    <RightNav /> 
                </div>
                <div className="navbar-drawer">
                    <DrawerRight />
                </div>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/favorites">
                        <Favorites />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default Navbar;
