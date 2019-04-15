import React from 'react';
import ReactDOM from 'react-dom';
import App from 'electron/App';
import root from 'window-or-global';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

// import Router from 'Router'
import { ERROR_IN_WINDOW, REPORT_APP } from 'cover/ipcChannel';
import GlobalStyle from 'components/electron/GlobalStyle';
// console.log(process.env);

const values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

// let prepareTimer = '';
// let appReady = false;
if (root.isElectron) {
  const { ipcRenderer } = window.require('electron');
  ipcRenderer.send(REPORT_APP, localStorage.getItem('token'));
  ReactDOM.render(
    <ThemeProvider
      theme={createMuiTheme({
        breakpoints: {
          keys: ['xs', 'sm', 'md', 'lg', 'xl'],
          up: key => `@media (max-width:${values[key]}px)`
        }
      })}
    >
      <GlobalStyle />
      <App />
    </ThemeProvider>,
    document.getElementById('root')
  );
  window.onerror = function(error, url, line) {
    ipcRenderer.send(ERROR_IN_WINDOW, { error, url, line });
  };
  /**
  ipcRenderer.on('app-ready', () => {
    if (prepareTimer) {
      clearInterval(prepareTimer);
      prepareTimer = '';
    }
    appReady = true;
  });
  if (!appReady) {
    ipcRenderer.send('check-app-ready');
    prepareTimer = setInterval(() => {
      ipcRenderer.send('check-app-ready');
    }, 900);
    document
      .getElementById('prepare')
      .insertAdjacentHTML('beforeend', '<p>正在准备数据...</p>');
  }
  */
} else {
  ReactDOM.render(
    <div>please use electron</div>,
    document.getElementById('root')
  );
}
