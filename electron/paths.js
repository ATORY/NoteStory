const { app } = require('electron');
const fs = require('fs');
const path = require('path');
const userDataPath = app.getPath('userData');

const debug = /--debug/.test(process.argv[2]);

const dataRootPath = debug ? __dirname : userDataPath;

const getImagePath = () => {
  const imagePath = path.join(dataRootPath, 'image');
  // console.log({ imagePath });
  const exists = fs.existsSync(imagePath);
  if (!exists) fs.mkdirSync(imagePath, { recursive: true });
  return imagePath;
};
exports.getImagePath = getImagePath;

const getDBPath = () => {
  const dbPath = path.join(dataRootPath, 'db');
  const exists = fs.existsSync(dbPath);
  if (!exists) fs.mkdirSync(dbPath, { recursive: true });
  return dbPath;
};
exports.getDBPath = getDBPath;

const getTmpPath = () => {
  const tmpPath = path.join(dataRootPath, 'tmp');
  const exists = fs.existsSync(tmpPath);
  if (!exists) fs.mkdirSync(tmpPath, { recursive: true });
  return tmpPath;
};
exports.getTmpPath = getTmpPath;
