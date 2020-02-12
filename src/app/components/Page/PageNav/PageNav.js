import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNav = ({ routes, children }) => {
  return (
    <nav>
      {routes && (
        <ul>
          {routes
            .filter(route => route.navigation)
            .map(route => (
              <li key={route.name}>
                <NavLink to={route.path}>{route.linkText}</NavLink>
              </li>
            ))}
        </ul>
      )}
      {children && children}
    </nav>
  );
};

export default PageNav;
