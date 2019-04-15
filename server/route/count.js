/**
 * 统计
 */
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const ElectronAppModel = require('../models/electronApp');

const APP_SECRET = process.env.APP_SECRET;
const router = new Router();

router.post('/electron', ctx => {
  let tokenInfo = { openId: '' };
  try {
    const token = ctx.getAuthorizationToken();
    tokenInfo = jwt.verify(token, APP_SECRET);
  } catch (err) {
    // console.error(err, '-----');
  }
  const userAPP = {
    openId: tokenInfo.openId,
    ...ctx.request.body
  };
  ElectronAppModel.record(userAPP);
  ctx.status = 204;
});

router.post('/eletron/error', ctx => {
  ctx.status = 204;
  console.log(ctx.req.body);
});

module.exports = router;
