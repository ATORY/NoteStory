const fs = require('fs');
const path = require('path');
const url = require('url');
const { ipcMain, BrowserWindow } = require('electron');
const zlib = require('zlib');
const crypto = require('crypto');
const tar = require('tar-fs');
const fse = require('fs-extra');
const util = require('util');

const markdownit = require('markdown-it');
const implicitFigures = require('markdown-it-implicit-figures');
const markdownitKaTex = require('@atory/markdown-it-katex');
const markdownImageFloat = require('../src/cover/markdownImageFloat');
const Prism = require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-javascript');

const md = markdownit({
  // html: true
  linkify: true,
  typography: true,
  breaks: true,
  highlight: (str, lang) => {
    let hl;

    try {
      hl = Prism.highlight(str, Prism.languages[lang]);
    } catch (error) {
      // console.error(error);
      hl = md.utils.escapeHtml(str);
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  }
});
// markdown allowed protocal
// var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
const BAD_PROTO_RE = /^(vbscript|javascript|data):/;
const GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

md.validateLink = url => {
  // url should be normalized at this point, and existing entities are decoded
  const str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str)
    ? GOOD_DATA_RE.test(str)
      ? true
      : false
    : true;
};
md.use(implicitFigures, {
  dataType: false, // <figure data-type="image">, default: false
  figcaption: false, // <figcaption>alternative text</figcaption>, default: false
  tabindex: false, // <figure tabindex="1+n">..., default: false
  link: false // <a href="img.png"><img src="img.png"></a>, default: false
})
  .use(markdownImageFloat, {})
  .use(markdownitKaTex);

const scrypt = util.promisify(crypto.scrypt);

const { getTmpPath, getDBPath, getImagePath } = require('./paths');
const {
  EXPORT_DATA_TO_LOCAL,
  IMPORT_DATA_FROM_LOCAL,
  SAVE_MD,
  SAVE_PDF,
  REPLY
} = require('../src/cover/ipcChannel');

const debug = /--debug/.test(process.argv[2]);

const algorithm = 'aes-192-cbc';
const defaultPassword = 'notestory';
const salt = 'notestory';

const keyLen = 24;
const ivLen = 16;
const iv = crypto.scryptSync(defaultPassword, salt, ivLen);

let windowPDF;
ipcMain.on(SAVE_PDF, async (event, data) => {
  const reply = `${SAVE_PDF}-${REPLY}`;
  const { filename, mdStr, title } = data;
  windowPDF = new BrowserWindow({
    // show: false,
    show: !!debug,
    width: 800,
    height: 1500,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });
  if (debug) windowPDF.webContents.openDevTools();

  // console.log(mdStr);
  let html = md.render(mdStr);
  if (process.platform === 'win32') {
    html = html.replace(/%5C/g, '\\');
  }
  // console.log(html);
  var file =
    'data:text/html;charset=UTF-8,' +
    encodeURIComponent(
      loadView({
        title,
        html,
        localPath: url.format({
          protocol: 'file',
          pathname: path.join(__dirname, 'build')
        })
      })
    );
  await windowPDF.loadURL(file);
  // windowPDF.loadFile();
  // console.log(filename, option);
  const option = {
    landscape: false,
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    pageSize: 'A4'
  };
  windowPDF.webContents.printToPDF(option, (err, data) => {
    // windowPDF.destroy();
    windowPDF = null;
    if (err) {
      event.sender.send(reply, { success: false });
      return;
    }
    // try {
    //   fs.writeFileSync(filename, data);
    //   event.sender.send(reply, { success: true });
    // } catch (err) {
    //   event.sender.send(reply, { success: false });
    // }
    const writer = fs.createWriteStream(filename);
    writer.on('finish', () => {
      event.sender.send(reply, { success: true });
    });
    writer.on('error', () => {
      event.sender.send(reply, { success: false });
    });
    writer.write(data);
    writer.end();
  });
});

ipcMain.on(SAVE_MD, (event, data) => {
  // console.log('save-md');
  const reply = `${SAVE_MD}-${REPLY}`;
  let file = '';
  const { filename, mdStr } = data;
  file = filename;
  if (path.extname(file) !== '.md') file += '.md';
  const writer = fs.createWriteStream(file);
  writer.on('finish', () => {
    event.sender.send(reply, { success: true });
  });
  writer.on('error', () => {
    event.sender.send(reply, { success: false });
  });
  writer.write(mdStr);
  writer.end();
});

ipcMain.on(EXPORT_DATA_TO_LOCAL, async (event, arg) => {
  const reply = `${EXPORT_DATA_TO_LOCAL}-${REPLY}`;

  const { password, filename } = arg;
  const pwd = password || defaultPassword;
  // const key = crypto.scryptSync(pwd, salt, 24);
  const key = await scrypt(pwd, salt, keyLen);
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
  // console.log(arg);
  const { password, filename } = arg;
  const pwd = password || defaultPassword;
  const key = await scrypt(pwd, salt, keyLen);
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

function loadView({ title, html, localPath = '.' }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="${localPath}/bower_components/katex/dist/katex.min.css">
        <link rel="stylesheet" href="${localPath}/bower_components/prism/themes/prism.css">
        <link rel="stylesheet" href="${localPath}/bower_components/github-markdown-css/github-markdown.css">
        <link rel="stylesheet" href="${localPath}/css/index.css">
        <title>${title}</title>
      </head>
      <body>
        <h1>${title}</h1>
        <div class='markdown-body'>
          ${html}
        </div>
      </body>
    </html>
  `;
}
