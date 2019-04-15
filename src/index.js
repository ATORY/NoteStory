import React from 'react';
import ReactDOM from 'react-dom';
import { Resolver } from 'found-relay';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import { environment } from 'web/App';
import Router from 'web/Routers';

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

ReactDOM.render(
  <ThemeProvider
    theme={createMuiTheme({
      breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        up: key => `@media (max-width:${values[key]}px)`
      }
    })}
  >
    <Router resolver={new Resolver(environment)} />
  </ThemeProvider>,
  document.getElementById('root')
);
