/* eslint-disable require-atomic-updates */
/**
 * 静态image文件
 */
const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const moment = require('moment');
// const debug = require('debug')('app:http');

const { appImageRoot, appImagePathPre, cos } = require('../utils');

const imagePathPre = appImagePathPre();
// const imageRoot = appImageRoot();

const router = new Router({
  prefix: imagePathPre
});

// TODO: referer check
router.all('*', async ctx => {
  // console.log(ctx.headers);
  const etag = ctx.headers['if-none-match'];
  const relativePath = ctx.path.replace(imagePathPre, '.');
  const fileExt = path.extname(relativePath).replace('.', '');
  if (process.env.NODE_ENV !== 'production') {
    const imageRoot = appImageRoot();
    const filePath = path.resolve(imageRoot, relativePath);
    const fileStats = fs.lstatSync(filePath);
    const fileExt = path.extname(filePath);
    const fileName = path.basename(filePath, fileExt);
    ctx.set({
      'Cache-Control': `max-age=30000`,
      Expires: moment()
        .add(1, 'year')
        .toDate(),
      Etag: fileName,
      'Last-Modified': new Date(fileStats.mtimeMs)
    });
    if (etag === fileName) {
      ctx.status = 304;
      return;
    }
    ctx.type = fileExt.replace('.', 'image/');
    ctx.body = fs.createReadStream(filePath);
    return;
  }
  // console.log({ relativePath });
  const params = {
    Bucket: 'notestory-1252915680',
    Region: 'ap-chongqing',
    Key: path.join('images', relativePath)
    // ResponseContentType : 'STRING_VALUE',            /* 非必须 */
    // ResponseContentLanguage : 'STRING_VALUE',        /* 非必须 */
    // ResponseExpires : 'STRING_VALUE',                /* 非必须 */
    // ResponseCacheControl : 'STRING_VALUE',            /* 非必须 */
    // ResponseContentDisposition : 'STRING_VALUE',    /* 非必须 */
    // ResponseContentEncoding : 'STRING_VALUE',        /* 非必须 */
    // Range : 'STRING_VALUE',                            /* 非必须 */
    // Output: ctx.body
  };
  const headData = await new Promise((resolve, reject) => {
    cos.headObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  if (headData.statusCode === 200) {
    if (etag === headData.ETag) {
      ctx.status = 304;
      return;
    }
  }
  const cosData = await new Promise((resolve, reject) => {
    cos.getObject(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  // console.log(cosData);
  const { Body, ETag, statusCode, headers } = cosData;
  ctx.set({
    'Cache-Control': `max-age=30000`,
    'Content-type': `image/${fileExt}`,
    Expires: moment()
      .add(1, 'year')
      .toDate(),
    Etag: ETag,
    'Last-Modified': new Date(headers['last-modified'])
  });
  ctx.status = statusCode;
  ctx.body = Body;
});

module.exports = router;
