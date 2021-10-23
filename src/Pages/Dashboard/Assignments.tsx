import React from 'react';
import { Stack } from '@fluentui/react';
import { SectionHeading } from '../../Components/Typography';

const Assignments: React.FC = () => {
  return (
    <>
      <Stack
        horizontal
        styles={{
          root: {
            justifyContent: 'center',
            paddingTop: 10,
            height: '100%',
          },
        }}
      >
        <SectionHeading
          title="No assignments in your account!"
          align="center"
          color="gray"
        />
      </Stack>
    </>
  );
};

export default Assignments;
