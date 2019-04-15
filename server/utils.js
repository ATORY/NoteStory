/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const moment = require('moment');
// console.log(process.argv)
// const debug = require('debug')('app:util');

exports.cos = new COS({
  SecretId: 'AKIDsZ1ECyupysgFYco7WifPt87uUpzut7ML',
  SecretKey: 'wfARTO3TejZDj05wXt2xeBZkgNo7D6k8'
});

exports.appHostURI = () => {
  return process.env.APP_HOST_URI;
};

exports.appSecret = () => {
  return process.env.APP_SECRET;
};

const appImageRoot = () => {
  return process.env.APP_IMAGE_ROOT || path.resolve(process.cwd(), 'image');
};
exports.appImageRoot = appImageRoot;

exports.appImagePathPre = () => {
  return '/image_s';
};

exports.filePathGenerator = (pathname, config = { tmp: false }) => {
  const filePath = path.join(
    config.tmp ? `/tmp/image/${moment().format('YYYY-MM-DD')}` : appImageRoot(),
    pathname
  );
  const fileDir = path.dirname(filePath);
  fs.mkdirSync(fileDir, { recursive: true });
  return filePath;
};

exports.readConfig = () => {
  const args = Array.from(process.argv);
  // console.log({ args });
  const index_c = args.indexOf('-c');
  const configFileName = args[index_c + 1];
  const configFile = path.resolve(process.cwd(), configFileName);
  console.log({ configFile });
  if (!fs.existsSync(configFile)) {
    console.log('config file not exits');
    process.exit(1);
  }
  // console.log(configFile)
  const configStr = fs.readFileSync(configFile, { encoding: 'utf-8' });
  let config = {};
  try {
    config = JSON.parse(configStr);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  const configGen = {};
  // console.log(config);
  parseConfigKey(config);
  function parseConfigKey(config, pre = '') {
    Object.keys(config).forEach(key => {
      if (config[key] instanceof Object && !(config[key] instanceof Array)) {
        parseConfigKey(config[key], pre ? `${pre}_${key}` : `${key}`);
      } else {
        const genKey = pre ? `${pre}_${key}` : `${key}`;
        configGen[genKey] = config[key];
      }
    });
  }

  // console.log(configGen);
  // TODO: require env key check
  Object.keys(configGen).forEach(key => {
    process.env[key] = configGen[key];
  });
};

exports.sleep = async time =>
  await new Promise(resolve => {
    setTimeout(resolve, time * 1000);
  });
