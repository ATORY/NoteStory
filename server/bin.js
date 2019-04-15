/* eslint-disable no-console */
const { serverV } = require('../package.json');
const { exec } = require('pkg');

console.log({ serverV });
exec([
  'server/index.js',
  '--target',
  'node10-linux-x64',
  '--output',
  `server/note@v${serverV}`
])
  .then(result => {
    console.log(`server/note@v${serverV}`, '--buildDone');
    console.log({ result });
  })
  .catch(err => {
    console.error({ err });
  });
