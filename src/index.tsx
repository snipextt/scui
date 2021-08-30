import React from 'react';
import ReactDOM from 'react-dom';
import { mergeStyles, initializeIcons } from '@fluentui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'simplebar/dist/simplebar.min.css';

initializeIcons();

mergeStyles({
  ':global(body,html,#root)': {
    margin: 0,
    padding: 0,
    height: '100vh',
    fontFamily:
      'Segoe UI, "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
