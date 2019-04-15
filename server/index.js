require('./utils').readConfig();

const zlib = require('zlib');
const Koa = require('koa');
// const apm = require('elastic-apm-node');
const compress = require('koa-compress');
const logger = require('koa-logger');
// const moment = require('moment');
// const serve = require('koa-static');
// const debug = require('debug')('app:http');

const packageInfo = require('../package.json');
const router = require('./route');
require('./models/db');

const serviceName = packageInfo.name.toUpperCase();
const serviceVersion = packageInfo.serverV;

const PORT = process.env.APP_PORT || 3000;

const app = new Koa();

const production = process.env.NODE_ENV === 'production';

const tokenMaxAge = 60 * 60 * 1000;
app.keys = ['im a newer secret', 'i like turtle'];
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

// eslint-disable-next-line no-unused-vars
app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
   */
  // if (APM_ENABLE) {
  //   // apm.captureError(err);
  //   // apm.endTransaction('', new Date().getTime());
  // } else {
  console.error(err, ctx.method, ctx.path);
  // }
  ctx.status = 500;
  ctx.body = 'server err';
});

if (process.env.NODE_ENV !== 'production') app.use(logger());
app.use(async (ctx, next) => {
  // if (APM_ENABLE)
  //   apm.startTransaction(ctx.path, 'router', {
  //     startTime: new Date().getTime()
  //   });

  /**
   * setCookieWith
   * @param {Object} info - info
   * @param {string} info.token - token
   * @param {Object} info.ctx - ctx
   */
  ctx.setTokenCookies = (token, maxAge = tokenMaxAge) => {
    ctx.cookies.set('token', token, { maxAge, httpOnly: true });
  };
  ctx.clearTokenCookies = () => {
    ctx.cookies.set('token', '', { maxAge: 0, httpOnly: true });
  };
  ctx.getTokenCookies = () => {
    const token = ctx.cookies.get('token');
    return token;
  };
  ctx.getAuthorizationToken = () => {
    const { authorization = 'Bearer ' } = ctx.headers;
    const token = authorization.split('Bearer ')[1] || '';
    return token;
  };
  try {
    // debug(ctx.req.headers);
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 10000)
    // })
    await next();
    // if (APM_ENABLE)
    //   apm.endTransaction(ctx.res.statusCode, new Date().getTime());
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = production ? '.>_<.' : err.message;
    ctx.app.emit('error', err, ctx);
  } finally {
    // one request
  }
});
app
  .use(
    compress({
      filter: contentType => /text|json/i.test(contentType),
      threshold: 2048,
      flush: zlib.Z_SYNC_FLUSH
    })
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    ctx.compress = true;
    await next();
  });
// app.use(serve('./build'));

app.close = () => {
  // eslint-disable-next-line no-console
  console.log('close some dependence service');
};

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // if (APM_ENABLE) {
    //   apm.start({
    //     serviceName,
    //     serviceVersion,
    //     serverUrl: process.env.APP_APM_SERVER_URL
    //   });
    // }

    // eslint-disable-next-line no-console
    console.log(
      `${serviceName}-${serviceVersion} start at ${PORT} in ${process.env.NODE_ENV}@${process.version}`
    );
  });
} else {
  module.exports = app;
}
