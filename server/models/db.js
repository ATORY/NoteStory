const mongoose = require('mongoose');
const debug = require('debug')('app:database');

const DB_URL = process.env.APP_MONGODB_STORY_DB_URL;
// console.log(DB_URL);
mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
mongoose.connection.on('error', error => {
  debug(error);
  setTimeout(() => {
    process.exit(1);
  }, 500);
});
mongoose.connection.once('open', () => {
  debug('Mongodb,连接成功', DB_URL);
});
