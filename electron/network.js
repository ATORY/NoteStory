const { ipcMain } = require('electron');
const request = require('request');
const { machineId } = require('node-machine-id');
const os = require('os');
// const compareVersions = require('compare-versions');
const pkg = require('../package.json');
const {
  REPORT_APP,
  UPDATE_CHECK,
  REPLY,
  OPEN_EXTERNAL,
  OPEN_MODAL
} = require('../src/cover/ipcChannel');

const CHECK_UPDATE_VERSION = '/utils/version/check';
const COUNT_ELECTRON = '/count/electron';
const COUNT_ELECTRON_ERR = '/count/electron/error';

// const debug = /--debug/.test(process.argv[2]);
const host = process.env.NOTESTORY_APP_SERVER_URI;

function headersGen({ token }) {
  const headers = {
    // 'Content-Type': contentType,
    'x-client-name': `${process.env.REACT_APP_NAME}@electron}`,
    'x-client-version': process.env.NOTESTORY_APP_VERSION
  };
  const authorization = token ? `Bearer ${token}` : '';
  if (authorization) headers.authorization = authorization;
  return { headers };
}

ipcMain.on(REPORT_APP, (event, token) => {
  const { headers } = headersGen({ token });
  if (!host) {
    return;
  }
  const { platform, arch } = process;
  machineId(true).then(id => {
    request.post(
      `${host}${COUNT_ELECTRON}`,
      {
        headers,
        json: {
          appVersion: pkg.version,
          machineId: id,
          platform,
          arch,
          release: os.release()
        }
      },
      (error, res) => {
        // report
        if (error) console.error(error);
        else console.log(res.statusCode);
      }
    );
  });
});

ipcMain.on(UPDATE_CHECK, (event, token) => {
  const reply = `${UPDATE_CHECK}-${REPLY}`;
  const { headers } = headersGen({ token });
  if (!host) {
    return;
  }
  const { platform, arch } = process;
  machineId(true).then(id => {
    // report machine info
    // console.log({ id });
    const defaultConfig = {
      hasMore: {
        action: OPEN_EXTERNAL, // openExternal, openModal
        url: 'https://wesy.club' // wesy.club
      },
      configBtns: [
        {
          _id: '1',
          name: '支持',
          color: '',
          action: OPEN_MODAL,
          modal: 'donate',
          url: ''
        }
      ]
    };
    request.post(
      `${host}${CHECK_UPDATE_VERSION}`,
      {
        headers,
        json: {
          appVersion: pkg.version,
          machineId: id,
          platform,
          arch,
          release: os.release()
        }
      },
      (error, res) => {
        // report
        if (error) {
          // console.error(error);
          event.sender.send(reply, defaultConfig);
        } else {
          // console.log(res.statusCode, res.body);
          if (res.statusCode === 200) event.sender.send(reply, res.body.config);
          else event.sender.send(reply, defaultConfig);
        }
      }
    );
  });
});

exports.host = host;
exports.headersGen = headersGen;
exports.reportErr = (error, callback) => {
  let timer = setTimeout(() => {
    if (timer) clearTimeout(timer);
    timer = '';
    callback('timerdone');
  }, 2 * 1000);
  const { headers } = headersGen({});
  const { platform, arch } = process;
  request.post(
    `${host}${COUNT_ELECTRON_ERR}`,
    {
      headers,
      json: {
        error,
        appVersion: pkg.version,
        platform,
        arch,
        release: os.release()
      }
    },
    (error, res) => {
      // report
      if (timer) clearTimeout(timer);
      timer = '';
      callback('report');
      if (error) console.error(error);
      else console.log(res.statusCode);
    }
  );
  // console.log(err);
};
