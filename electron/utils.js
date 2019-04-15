const { ipcMain, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const request = require('request');
const { machineId } = require('node-machine-id');
const os = require('os');

const pkg = require('../package.json');
const { headersGen, host } = require('./network');
const { FEEDBACK, HELP } = require('../src/cover/ipcChannel');

const FEEDBACK_ROUTER = '/utils/feedback';
const debug = /--debug/.test(process.argv[2]);

let helpWindow = '';
ipcMain.on(HELP, () => {
  if (helpWindow) {
    helpWindow.show();
    return;
  }
  helpWindow = new BrowserWindow({
    show: true,
    frame: false,
    width: 800,
    height: 560,
    webPreferences: {
      nodeIntegration: true
    }
  });
  const viewUrl = debug
    ? 'http://localhost:5000/help.html'
    : url.format({
        pathname: path.join(__dirname, 'build/help.html'),
        protocol: 'file:',
        slashes: true
      });
  if (debug) {
    helpWindow.webContents.openDevTools();
  }
  helpWindow.loadURL(viewUrl);
  helpWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    helpWindow = null;
  });
});

let feedBackWindow = '';
ipcMain.on(FEEDBACK, () => {
  if (feedBackWindow) {
    feedBackWindow.show();
    return;
  }
  feedBackWindow = new BrowserWindow({
    show: true,
    frame: false,
    width: 800,
    height: 560,
    webPreferences: {
      nodeIntegration: true
    }
  });
  const viewUrl = debug
    ? 'http://localhost:5000/feedback.html'
    : url.format({
        pathname: path.join(__dirname, 'build/feedback.html'),
        protocol: 'file:',
        slashes: true
      });
  if (debug) {
    feedBackWindow.webContents.openDevTools();
  }
  feedBackWindow.loadURL(viewUrl);
  feedBackWindow.on('closed', function() {
    feedBackWindow = null;
  });
});

ipcMain.on('feedback-content', (event, arg) => {
  const reply = 'feedback-content-reply';
  console.log(arg);
  if (!host) {
    return;
  }
  const { content, token } = arg;
  const { platform, arch } = process;
  const { headers } = headersGen({ token });
  machineId(true).then(id => {
    request.post(
      `${host}${FEEDBACK_ROUTER}`,
      {
        headers,
        json: {
          appVersion: pkg.version,
          machineId: id,
          platform,
          arch,
          release: os.release(),
          content
        }
      },
      (error, res) => {
        // report
        if (error) console.error(error);
        else console.log(res.statusCode);
      }
    );
  });
  event.sender.send(reply, {});
});

ipcMain.on('feedback-record', (event, arg) => {
  const reply = 'feedback-record-reply';
  const { token } = arg;
  const { headers } = headersGen({ token });
  machineId(true)
    .then(id => {
      request.get(
        `${host}${FEEDBACK_ROUTER}?machineId=${id}`,
        {
          headers
        },
        (error, res) => {
          // report
          if (error) {
            // console.error(error);
            event.sender.send(reply, { feedbacks: [] });
          } else if (res.statusCode === 200) {
            const result = JSON.parse(res.body);
            event.sender.send(reply, result);
          } else {
            event.sender.send(reply, { feedbacks: [] });
          }
        }
      );
    })
    .catch(error => {
      console.error(error);
      event.sender.send(reply, {
        feedbacks: []
      });
    });
});
