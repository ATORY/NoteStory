// require('update-electron-app')({
//   logger: require('electron-log')
// })
const path = require('path');
const fs = require('fs');
const url = require('url');
const {
  app,
  BrowserWindow,
  shell,
  Menu,
  ipcMain,
  dialog
} = require('electron');
const log = require('electron-log');
const dotenv = require('dotenv');

const { ERROR_IN_WINDOW } = require('../src/cover/ipcChannel');
const env = require('./env.json');

process.env['NODE_ENV'] = env.NODE_ENV;

const envPath = path.resolve(
  __dirname,
  `../app_config/.env.${process.env['NODE_ENV']}`
);
if (fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath
  });
}

const debug = /--debug/.test(process.argv[2]);
console.log({ debug });

const userDataPath = app.getPath('userData');
const electronFileDir = debug ? __dirname : userDataPath;

// console.log('...', process.env.NOTESTORY_APP_SERVER_URI);
// if (process.mas) app.setName('Electron APIs');

const electronFile = path.resolve(electronFileDir, './electron.json');

let mainWindow = null;

function initialize() {
  makeSingleInstance();

  function createWindow() {
    // console.log(process.platform);
    let platformWindowOption = {};
    switch (process.platform) {
      case 'linux':
        platformWindowOption = {
          // frame: false
        };
        break;
      case 'darwin':
        platformWindowOption = {
          frame: false,
          titleBarStyle: 'hiddenInset'
        };
        break;
    }
    let electronData = '{}';
    if (fs.existsSync(electronFile)) {
      electronData = fs.readFileSync(electronFile, { encoding: 'utf-8' });
    } else {
      electronData = JSON.stringify({});
    }
    const { bounds = {} } = JSON.parse(electronData);
    const windowOptions = {
      ...{
        backgroundColor: '#fff',
        width: bounds.width || 1280,
        minWidth: 1000,
        // height: 840,
        height: bounds.height || 1000,
        title: app.getName(),
        // titleBarStyle: 'hidden',
        webPreferences: {
          nodeIntegration: true,
          webSecurity: false
        }
      },
      ...platformWindowOption
    };

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(
        __dirname,
        '../assets/app-icon/png/1024.png'
      );
    }

    mainWindow = new BrowserWindow(windowOptions);
    // mainWindow.flashFrame(false);

    const electronUrl =
      process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true
      });
    mainWindow.loadURL(electronUrl);

    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
    // mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    const needDebug = false;
    if (debug && needDebug) {
      const os = require('os');
      const { platform } = process;
      if (platform === 'linux') {
        const reactPath = path.join(
          os.homedir(),
          '.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0'
        );
        BrowserWindow.addDevToolsExtension(reactPath);
      } else if (platform === 'darwin') {
        const reactPath = path.join(
          os.homedir(),
          'Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0'
        );
        BrowserWindow.addDevToolsExtension(reactPath);
        const relayPath = path.join(
          os.homedir(),
          'Library/Application Support/Google/Chrome/Default/Extensions/oppikflppfjfdpjimpdadhelffjpciba/1.4.0_0'
        );
        BrowserWindow.addDevToolsExtension(relayPath);
      }
      mainWindow.webContents.openDevTools();
      mainWindow.maximize();
      // require('devtron').install();
    }
    if (debug) {
      mainWindow.webContents.openDevTools();
    }
    // mainWindow.on('will-resize', (event, newBounds) => {
    //   log.info('willResize', newBounds);
    // });
    mainWindow.on('resize', () => {
      const bounds = mainWindow.getBounds();
      // console.log('resize...', bounds);
      const data = {
        bounds
      };
      fs.writeFile(
        electronFile,
        JSON.stringify(data),
        { encoding: 'utf-8' },
        function(err) {
          if (err) log.error(err);
        }
      );
    });
    mainWindow.on('close', () => {
      log.info('close');
    });
    mainWindow.on('closed', () => {
      log.info('closed');
      mainWindow = null;
    });
    const template = [
      {
        label: 'Application',
        submenu: [
          // {
          //   label: 'About Application',
          //   selector: 'orderFrontStandardAboutPanel:'
          // },
          // { type: 'separator' },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            click: function() {
              app.exit();
            }
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
          {
            label: 'Redo',
            accelerator: 'Shift+CmdOrCtrl+Z',
            selector: 'redo:'
          },
          { type: 'separator' },
          { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
          { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
          { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
          {
            label: 'Select All',
            accelerator: 'CmdOrCtrl+A',
            selector: 'selectAll:'
          }
        ]
      }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    mainWindow.webContents.on('new-window', function(event, url) {
      event.preventDefault();
      // open(url);
      shell.openExternal(url);
    });
    mainWindow.webContents.on('did-fail-load', function() {
      log.error('window failed load');
    });
    // eslint-disable-next-line no-unused-vars
    ipcMain.on(ERROR_IN_WINDOW, (event, { error, url, line }) => {
      log.error(error);
      log.error(url);
      log.error(line);
      mainWindow && mainWindow.close();
      dialog.showErrorBox('出错了', '.>_<.');
      app.exit(0);
      // }
      // dialog.showErrorBox('出错了', '出错了');
      // mainWindow.close();
      // const options = {
      //   type: 'error',
      //   title: '信息',
      //   message: '出错了，',
      //   buttons: ['是', '否']
      // };
      // dialog.showMessageBox(options, index => {
      //   log.info({ index });
      //   // initialize();
      //   // event.sender.send('information-dialog-selection', index)
      // });
    });
  }

  app.on('ready', () => {
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.exit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
}

function makeSingleInstance() {
  if (process.mas) return;

  app.requestSingleInstanceLock();

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

if (!debug) {
  process.on('uncaughtException', err => {
    const messageBoxOptions = {
      type: 'error',
      title: 'Error in Main process',
      message: 'Something failed'
    };
    dialog.showMessageBox(messageBoxOptions);
    throw err;
  });
}

initialize();
console.log('initialized');

require('./db');
require('./image');
require('./file');
require('./network');
require('./utils');

// let appReady = false;
// db.job().then(() => {
//   appReady = true;
//   mainWindow && mainWindow.webContents.send('app-ready');
// });

// ipcMain.on('check-app-ready', event => {
//   console.log('check-app-ready');
//   if (appReady) {
//     event.sender.send('app-ready');
//     // mainWindow && mainWindow.webContents.send('app-ready'); // did work
//   }
// });
