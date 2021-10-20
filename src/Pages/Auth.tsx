import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { Login } from '../Components/';
import ForgotPassword from '../Components/Forgot';

const Auth: React.FC = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  useEffect(()=>{
    if(sessionStorage.getItem("authToken")){
      history.replace('/dashboard');
    }
  },[history])
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
