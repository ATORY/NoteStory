const zlib = require('zlib');
const Koa = require('koa');
const config = require('config');
const apm = require('elastic-apm-node');
const compress = require('koa-compress');
const packageInfo = require('../package.json');
const router = require('./router');

const serviceName = packageInfo.name.toUpperCase();
const serviceVersion = packageInfo.version;

const PORT = config.get('PORT');
const APM_ENABLE = config.get('APM.ENABLE');
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
  if (APM_ENABLE) {
    apm.captureError(err);
    apm.endTransaction('', new Date().getTime());
  } else {
    // eslint-disable-next-line no-console
    console.error(err, ctx.method, ctx.path);
  }
});

app.use(async (ctx, next) => {
  if (APM_ENABLE) apm.startTransaction(ctx.path, 'router', { startTime: new Date().getTime() });

  /**
   * setCookieWith
   * @param {Object} info - info
   * @param {string} info.token - token
   * @param {Object} info.ctx - ctx
   */
  ctx.setTokenCookies = (token) => {
    ctx.cookies.set('token', token, { maxAge: tokenMaxAge, httpOnly: true });
  };
  ctx.clearTokenCookies = () => {
    ctx.cookies.set('token', '', { maxAge: 0, httpOnly: true });
  };
  try {
    await next();
    if (APM_ENABLE) apm.endTransaction(ctx.res.statusCode, new Date().getTime());
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = production ? '.>_<.' : err.message;
    ctx.app.emit('error', err, ctx);
  } finally {
    // one request
  }
});

app.use(compress({
  filter: contentType => /text|json/i.test(contentType),
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH,
}));
app.use(router.routes()).use(router.allowedMethods()).use(async (ctx, next) => {
  ctx.compress = true;
  await next();
});

app.close = () => {
  // eslint-disable-next-line no-console
  console.log('close some dependence service');
};

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    if (APM_ENABLE) {
      apm.start({
        serviceName,
        serviceVersion,
        serverUrl: config.get('APM.SERVER_URL'),
      });
    }

    // eslint-disable-next-line no-console
    console.log(`${new Date()}: ${serviceName}-${serviceVersion} start at ${PORT} in ${process.env.NODE_ENV}`);
  });
} else {
  module.exports = app;
}
