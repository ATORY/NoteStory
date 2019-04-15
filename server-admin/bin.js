/* eslint-disable no-console */
const { adminV } = require('../package.json');
const { exec } = require('pkg');

console.log({ adminV });
exec([
  'server-admin/index.js',
  '--config',
  'server-admin/config.json',
  '--output',
  `server-admin/note-admin@v${adminV}`
])
  .then(result => {
    console.log(`server-admin/note-admin@v${adminV}`, '--buildDone');
    console.log({ result });
  })
  .catch(err => {
    console.error({ err });
  });
