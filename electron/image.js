const { ipcMain, dialog } = require('electron');
// const userDataPath = app.getPath('userData');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const request = require('request');
const sharp = require('sharp');
// const log = require('electron-log');

const { headersGen, host } = require('./network');
const { getImagePath } = require('./paths');
const {
  REPLY,
  IMAGE_DATA,
  OPEN_IMAGE_LIB,
  UPLOAD_LOCAL_IMAGE
} = require('../src/cover/ipcChannel');

const MAX_IMAGE_WIDTH = 700;
// const debug = /--debug/.test(process.argv[2]);
// console.log({ userDataPath });
// const db = new Datastore({
//   filename: '/Users/micro-ttang/note-story/story.db',
//   autoload: true
// });
// const imageRootPath = debug ? __dirname : userDataPath;

// `${imageRootPath}/image`;
const imagePath = getImagePath();

// 添加 image 到 editor，copy image for keep
ipcMain.on(IMAGE_DATA, (event, arg) => {
  // console.log(arg);
  const base64Arr = arg.split(';base64,');
  const base64Image = base64Arr.pop();
  const imageExt = base64Arr.pop().replace('data:image/', '');
  const data = Buffer.from(base64Image, 'base64');
  const shasum = crypto.createHash('md5');
  shasum.update(data);
  const md5hash = shasum.digest('hex');
  const _filePath = path.join(imagePath, md5hash);
  const filePath = `${_filePath}${imageExt ? `.${imageExt}` : ''}`;
  const fileUrl = url.format({
    protocol: 'file',
    pathname: filePath,
    query: {}
  });
  // const myURL = new url.URL(fileUrl);
  // console.log({ myURL });
  // fs.readFile(myURL, (err, data) => {});
  fs.writeFile(filePath, data, err => {
    if (err) throw err;
    event.sender.send(`${IMAGE_DATA}-${REPLY}`, {
      filePath: process.platform === 'darwin' ? encodeURI(fileUrl) : fileUrl
    });
    // console.log('The file has been saved!');
  });
});

ipcMain.on(UPLOAD_LOCAL_IMAGE, async (event, { key, localSrc, token }) => {
  // upload timer
  const { headers } = headersGen({ token });
  // log.info({ localSrc });
  const localFile = url.parse(localSrc);
  const localFilePath = decodeURI(localFile.pathname);
  // log.info(localFilePath);
  const ext = path.extname(localFilePath);
  const metadata = await sharp(localFilePath).metadata();
  // console.log('stat', stat);
  const putStream = request(`${host}/upload/image?ext=${ext}`, {
    method: 'PUT',
    headers
  });
  const decoder = new StringDecoder('utf8');
  let imageObj = '{}';
  let status = 0;
  putStream.on('response', resp => {
    status = resp.statusCode;
    // console.log(resp.body);
    // console.log(resp.toJSON());
  });
  putStream.on('data', chunk => {
    imageObj = decoder.write(chunk);
    // console.log(chunk.toString());
  });
  putStream.on('end', () => {
    // console.log({ imageObj });
    if (status === 200) {
      const { uri } = JSON.parse(imageObj);
      event.sender.send(`${UPLOAD_LOCAL_IMAGE}-${REPLY}-${key}`, {
        imageSrc: uri,
        key
      });
    } else {
      const options = {
        type: 'info',
        title: '信息',
        message: imageObj,
        buttons: ['是']
      };
      dialog.showMessageBox(options);
    }
  });
  putStream.on('error', err => {
    event.sender.send(`${UPLOAD_LOCAL_IMAGE}-${REPLY}-${key}`, {
      message: err.message,
      key
    });
    console.log('error', err);
  });
  if (metadata.width > MAX_IMAGE_WIDTH) {
    fs.createReadStream(localFilePath)
      .pipe(sharp().resize(MAX_IMAGE_WIDTH))
      .pipe(putStream);
  } else {
    fs.createReadStream(localFilePath).pipe(putStream);
  }
  // console.log({ key, localSrc });
});

ipcMain.on(OPEN_IMAGE_LIB, event => {
  const options = {
    title: '图库',
    defaultPath: imagePath,
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif', 'jpeg'] }]
    // filters: [{ name: 'mdFile', extensions: ['md'] }]
  };
  // eslint-disable-next-line no-unused-vars
  dialog.showOpenDialog(options, data => {
    // console.log({ filename });
    if (!data) return;
    const [filename] = data;
    if (!filename) return;
    event.sender.send(`${IMAGE_DATA}-${REPLY}`, { filePath: filename });
  });
  // fs.readdir(imagePath, (err, files) => {
  //   const images = files.filter(item =>
  //     ['.jpg', '.png', '.jpeg', '.gif'].includes(path.extname(item))
  //   );
  //   event.sender.send(`${OPEN_IMAGE_LIB}-${REPLY}`, { images, imagePath });
  // });
});
