import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import * as pages from 'js/pages';
import { appPath } from 'config';
import routerConfig from './router.config.js';

const SetTitleRoute = ({ title, ...rest }) => {
  if (title) {
    document.title = title;
  }
  return <Route {...rest} />;
};

const Router = () => (
  <BrowserRouter>
    <Switch>
      {routerConfig.map((item, index) => (
        <SetTitleRoute
          key={index}
          exact
          title={item.title}
          path={appPath + item.path}
          component={pages[item.component]}
        />
      ))}
      <Redirect path="*" to={`${appPath}index`} />
    </Switch>
  </BrowserRouter>
);

export default Router;
