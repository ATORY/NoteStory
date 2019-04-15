/* eslint-disable no-console */
const { webV } = require('../package.json');
const { exec } = require('pkg');

console.log({ webV });
exec([
  'server-render/index.js',
  '--config',
  'server-render/config.json',
  '--output',
  `server-render/note-render@v${webV}`
])
  .then(result => {
    console.log(`server-render/note-render@v${webV}`, '--buildDone');
    console.log({ result });
  })
  .catch(err => {
    console.error({ err });
  });
