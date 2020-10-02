import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { pages } from './pages/';
import { routes } from './routes';
import { UserProvider } from './components/User/user-context';

const App = () => {
  return (
    <UserProvider>
      <Switch>
        {routes
          .filter((route) => route.page)
          .map((route) => (
            <Route exact={route.exact} key={route.page} path={route.path}>
              {pages[route.page]}
            </Route>
          ))}
      </Switch>
    </UserProvider>
  );
};

export default App;
