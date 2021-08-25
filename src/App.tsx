import { IStackStyles, Stack } from '@fluentui/react';
import React from 'react';
import { Auth } from './Pages';

const rootStyles: Partial<IStackStyles> = {
  root: {
    height: '100%',
  },
};

function App() {
  return (
    <Stack styles={rootStyles} className="App">
      <Auth />
    </Stack>
  );
}

export default App;
