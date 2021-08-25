import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { Login } from '../Components/';
import ForgotPassword from '../Components/Forgot';

const Auth: React.FC = () => {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Redirect to={`${url}${url.endsWith('/') ? 'login' : '/login'}`} />
        </Route>
        <Route exact path={`${path}/login`}>
          <Login />
        </Route>
        <Route exact path={`${path}/help`}>
          <ForgotPassword />
        </Route>
      </Switch>
    </>
  );
};

export default Auth;
