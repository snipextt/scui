import { IStackStyles, mergeStyles } from '@fluentui/react';
import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { Classroom, Labs, Recordings, Assignments, Teachers } from '..';
import { Navbar } from '../../Components';

const scrollSectionStyles = mergeStyles({
  '.simplebar-content': {
    background: '#F8F8F8 linear-gradient(to right, #F8F8F8, #F8F8F9);',
    height: '100%',
  },
});

const Dashboard: React.FC = () => {
  const { path, url } = useRouteMatch();
  return (
    <>
      <SimpleBar
        className={scrollSectionStyles}
        style={{
          maxWidth: '100%',
          height: '100vh',
        }}
      >
        <Navbar />
        <Switch>
          <Route exact path={path}>
            <Redirect
              to={`${url}${url.endsWith('/') ? 'classroom' : '/classroom'}`}
            />
          </Route>
          <Route path={`${path}/classroom`}>
            <Classroom />
          </Route>
          <Route exact path={`${path}/assignments`}>
            <Assignments />
          </Route>
          <Route exact path={`${path}/teachers`}>
            <Teachers />
          </Route>
          <Route exact path={`${path}/labs`}>
            <Labs />
          </Route>
          <Route exact path={`${path}/recordings`}>
            <Recordings />
          </Route>
        </Switch>
      </SimpleBar>
    </>
  );
};

export default Dashboard;
