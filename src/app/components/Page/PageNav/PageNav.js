import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNav.css';

const PageNav = ({ routes, children }) => {
  return (
    <nav className="page-nav">
      {routes && (
        <ul className="page-nav__menu">
          {routes
            .filter(route => route.navigation)
            .map(route => (
              <li className="page-nav__menu-item" key={route.name}>
                <NavLink className="page-nav__menu-link" to={route.path}>
                  {route.linkText}
                </NavLink>
              </li>
            ))}
        </ul>
      )}
      {children && children}
    </nav>
  );
};

export default PageNav;
