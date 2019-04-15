const path = require('path');
const zlib = require('zlib');
const fs = require('fs');
const serve = require('koa-static');
const compress = require('koa-compress');
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const Koa = require('koa');

const packageInfo = require('../package.json');
const serviceName = packageInfo.name.toUpperCase();
const serviceVersion = packageInfo.webV;

const PORT = process.env.PORT || 3333;
console.log({ PORT }, process.env.PORT);
const indexHtml = fs.readFileSync(path.join(__dirname, 'build/index.html'), {
  encoding: 'utf8'
});
const app = new Koa();
// console.log(indexHtml);

// fs.readdir(__dirname, (err, data) => {
//   console.log('read dir');
//   console.log(err, data);
// });
app.use(async (ctx, next) => {
  // console.log(ctx.req.headers);
  await next();
});

app.use(conditional());

// add etags

app.use(etag());

app.use(
  compress({
    filter: function(content_type) {
      // console.log({ content_type });
      return (
        /text/i.test(content_type) || content_type === 'application/javascript'
      );
    },
    // threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH
  })
);

app.use(
  serve(path.join(__dirname, 'build'), {
    // maxage: 7 * 24 * 60 * 60 * 1000,
    // gzip: true
  })
);

app.use(ctx => {
  ctx.body = indexHtml;
});

app.listen(PORT, () => {
  console.log(
    `${serviceName}-${serviceVersion}-render start at ${PORT} in ${process.env
      .NODE_ENV || 'development'}@${process.version}`
  );
});
