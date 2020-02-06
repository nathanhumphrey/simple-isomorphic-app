import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { pages } from './pages/';
import { routes } from './routes';

const App = () => {
  return (
    <Switch>
      {routes
        .filter(route => route.page)
        .map(route => (
          <Route exact={route.exact} key={route.page} path={route.path}>
            {pages[route.page]}
          </Route>
        ))}
    </Switch>
  );
};

export default App;
