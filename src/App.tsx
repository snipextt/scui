import { IStackStyles, Stack } from '@fluentui/react';
import React from 'react';
import { Auth, Dashboard } from './Pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const rootStyles: Partial<IStackStyles> = {
  root: {
    height: '100%',
  },
};

function App() {
  return (
    <Router>
      <Stack styles={rootStyles} className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth" />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Stack>
    </Router>
  );
}

export default App;
