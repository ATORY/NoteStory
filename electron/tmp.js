const { ipcMain } = require('electron');
const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const tar = require('tar-fs');
const fse = require('fs-extra');

const { getTmpPath, getDBPath, getImagePath } = require('./paths');
const {
  EXPORT_DATA_TO_LOCAL,
  IMPORT_DATA_FROM_LOCAL,
  REPLY
} = require('../src/cover/ipcChannel');

const algorithm = 'aes-192-cbc';
const defaultPassword = 'notestory';
const salt = 'notestory';

const keyLen = 24;
const ivLen = 16;
const iv = crypto.scryptSync('notestory', salt, ivLen);

ipcMain.on(EXPORT_DATA_TO_LOCAL, async (event, arg) => {
  const reply = `${EXPORT_DATA_TO_LOCAL}-${REPLY}`;

  const { password, filename } = arg;
  const pwd = password || defaultPassword;

  // const key = crypto.scryptSync(pwd, salt, 24);
  const key = await crypto.scrypt(pwd, salt, keyLen);
  const encrypt = crypto.createCipheriv(algorithm, key, iv);
  const writableStream = fs.createWriteStream(filename);
  writableStream.on('error', async err => {
    console.error(err);
    event.sender.send(reply, { success: false });
  });
  writableStream.on('finish', async () => {
    await cleanTmpData();
    event.sender.send(reply, { success: true });
  });
  const tmpPath = await cpDataToTmp();
  tar
    .pack(tmpPath)
    .pipe(zlib.Gzip())
    .pipe(encrypt)
    .pipe(writableStream);
  // const categoryQuery =
  // console.log({ categoryQuery }, arg);
});

ipcMain.on(IMPORT_DATA_FROM_LOCAL, async (event, arg) => {
  const reply = `${IMPORT_DATA_FROM_LOCAL}-${REPLY}`;
  const { password, filename } = arg;
  const pwd = password || defaultPassword;
  const key = await crypto.scrypt(pwd, salt, keyLen);
  const decrypt = crypto.createDecipheriv(algorithm, key, iv);
  const tmpPath = getTmpPath();
  const writableStream = tar.extract(tmpPath);
  writableStream.on('error', async err => {
    console.error(err);
    event.sender.send(reply, { success: false });
  });
  writableStream.on('finish', async () => {
    await restoreDataFromTmp();
    await cleanTmpData();
    event.sender.send(reply, { success: true });
  });
  fs.createReadStream(filename)
    .pipe(decrypt)
    .pipe(zlib.Gunzip())
    .pipe(writableStream);
  // const categoryQuery =
  // console.log({ categoryQuery }, arg);
});

// eslint-disable-next-line no-unused-vars
ipcMain.on('backupDataToCloud', (event, arg) => {
  // const categoryQuery =
  // console.log({ categoryQuery }, arg);
});

// eslint-disable-next-line no-unused-vars
ipcMain.on('restoreDataFromCloud', (event, arg) => {
  // const categoryQuery =
  // console.log({ categoryQuery }, arg);
});

async function restoreDataFromTmp() {
  const tmpPath = getTmpPath();
  const imagePath = getImagePath();
  const dbPath = getDBPath();
  await fse.copy(`${tmpPath}/image`, imagePath);
  await fse.copy(`${tmpPath}/db`, dbPath);
}

async function cpDataToTmp() {
  const tmpPath = getTmpPath();
  const imagePath = getImagePath();
  const dbPath = getDBPath();
  await fse.copy(imagePath, `${tmpPath}/image`);
  await fse.copy(dbPath, `${tmpPath}/db`);
  return tmpPath;
}

async function cleanTmpData() {
  const tmpPath = getTmpPath();
  await fse.remove(tmpPath);
}
