import { IStackStyles, Stack } from '@fluentui/react';
import React from 'react';
import Navbar from '../Components/Navbar';

const rootStyles: Partial<IStackStyles> = {
  root: {
    background: '#F8F8F8 linear-gradient(to right, #F8F8F8, #F8F8F9);',
    height: '100%',
  },
};

const Dashboard: React.FC = () => {
  return (
    <>
      <Stack styles={rootStyles}>
        <Navbar />
      </Stack>
    </>
  );
};

export default Dashboard;
