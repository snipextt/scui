import { IStackStyles, Stack } from '@fluentui/react';
import React from 'react';
import { Auth, Dashboard, VirtualClassroom } from './Pages';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const rootStyles: Partial<IStackStyles> = {
  root: {
    height: '100%',
    minHeight: '100vh',
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
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/virtual-classroom/lodge">
            <VirtualClassroom />
          </Route>
        </Switch>
      </Stack>
    </Router>
  );
}

export default App;
