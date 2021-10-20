import { IStackProps, Label, mergeStyles, Spinner, SpinnerSize, Stack } from '@fluentui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouteMatch, Switch, Route, Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const [userDetails,setUserDetails] = useState<any>(null)
  const [isLoading,setIsLoading] = useState(true);
  const rowProps: IStackProps = { horizontal: true, verticalAlign: 'center', horizontalAlign: 'center' };

  const tokens = {
    sectionStack: {
      childrenGap: 10,
    },
    spinnerStack: {
      childrenGap: 20,
    },
  };
  useEffect(()=>{
    if(!sessionStorage.getItem("authToken")){
      history.replace('/auth');
    }
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("authToken")!;
    axios.get("http://localhost:3000/user/profile").then(res=>{
      setUserDetails(res.data);
      setIsLoading(false)
    })
  },[history])
  return (
    <>
              {isLoading && <Stack style={
            {
              height: "100%",
              zIndex: 1,
              background: 'rgba(255,255,255,0.9)',
              position: "absolute",
              width: "100%"
            }
          } {...rowProps} tokens={tokens.spinnerStack}>
        <Spinner size={SpinnerSize.large} />
      </Stack>}
      <SimpleBar
        className={scrollSectionStyles}
        style={{
          maxWidth: '100%',
          height: '100vh',
        }}
      >
        <Navbar userDetails={userDetails} />
        <Switch>
          <Route exact path={path}>
            <Redirect
              to={`${url}${url.endsWith('/') ? 'classroom' : '/classroom'}`}
            />
          </Route>
          <Route path={`${path}/classroom`}>
            <Classroom userDetails={userDetails} />
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
