/* eslint-disable require-atomic-updates */
/**
 * 文件上传
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:http:upload');

const {
  cos,
  filePathGenerator,
  appSecret,
  appHostURI,
  appImagePathPre
} = require('../utils');

const imagePathPre = appImagePathPre();
const router = new Router();

// TODO: sharp image
router.put('/image', async ctx => {
  const token = ctx.getAuthorizationToken();
  if (!token) return ctx.throw(401, 'no token');
  const tokenInfo = jwt.verify(token, appSecret());
  const { ext = '' } = ctx.query;
  const { openId } = tokenInfo;
  debug({ openId });
  const time = Date.now();
  const random = Math.random()
    .toString(36)
    .substr(2);
  const tmpPath = filePathGenerator(`${openId}/${random}${time}`, {
    tmp: true
  });
  const algorithm = 'md5';
  const shasum = crypto.createHash(algorithm);
  const writable = fs.createWriteStream(tmpPath);
  const uri = await new Promise((resolve, reject) => {
    writable.on('finish', () => {
      const md5hash = shasum.digest('hex');
      const filePath = path.join(`${openId}/${md5hash}${ext ? `${ext}` : ''}`);
      if (process.env.NODE_ENV !== 'production') {
        const savePath = filePathGenerator(filePath);
        try {
          fs.renameSync(tmpPath, savePath);
          resolve(appHostURI() + path.join(imagePathPre, filePath));
        } catch (error) {
          reject(error);
        }
        return;
      }
      cos.putObject(
        {
          Bucket: 'notestory-1252915680',
          Region: 'ap-chongqing',
          Key: path.join('images', filePath),
          Body: fs.createReadStream(tmpPath),
          onProgress: function(progressData) {
            console.log(progressData);
          }
        },
        function(err, data) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(appHostURI() + path.join(imagePathPre, filePath));
            console.log(data);
          }
          fs.unlink(tmpPath, err => {
            if (err) console.error(err);
          });
        }
      );
    });
    // uri = await new Promise((resolve, reject) => {
    ctx.req.on('data', chunk => {
      shasum.update(chunk);
      writable.write(chunk, 'binary');
    });
    ctx.req.on('end', () => {
      writable.end();
    });
    ctx.req.on('error', reject);
  });
  // for await (const data of ctx.req) {
  //   shasum.update(data)
  //   writable.write(data, 'binary')
  // }
  // writable.end()
  debug({ uri });
  ctx.body = { uri };
});

module.exports = router;
