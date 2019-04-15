/* eslint-disable require-atomic-updates */
/**
 * 版本检测
 */
// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');
const Router = require('koa-router');
const compareVersion = require('compare-versions');
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:route:utils');

const ReleaseModel = require('../models/release');
const FeedbackModel = require('../models/feedback');

const APP_SECRET = process.env.APP_SECRET;
const OPEN_EXTERNAL = 'openExternal';
const OPEN_MODAL = 'openModal';
const router = new Router();

router.post('/version/check', ctx => {
  // debug(ReleaseModel.CURR_VALID_RELEASE);
  const defaultConfig = {
    hasMore: {
      action: OPEN_EXTERNAL, // openExternal, openModal
      url: 'https://wesy.club' // wesy.club
    },
    configBtns: []
  };
  const { body } = ctx.request;
  const { platform, appVersion = '0.0.0' } = body;
  // const platform = ctx.params.platform;
  const updateItem = ReleaseModel.CURR_VALID_RELEASE.find(
    i => i._id === platform
  );
  debug({ body });
  if (updateItem && compareVersion(updateItem.version, appVersion) === 1) {
    defaultConfig.configBtns.push({
      _id: 'newVersion',
      name: '新版本',
      color: '#3f51b5',
      action: OPEN_EXTERNAL,
      url: 'http://download.wesy.club'
    });
  }
  defaultConfig.configBtns.push({
    _id: 'support',
    name: '支持',
    color: '',
    action: OPEN_MODAL,
    modal: 'donate'
  });
  ctx.body = {
    config: defaultConfig
  };
});

router.post('/feedback', async ctx => {
  let tokenInfo = { openId: '' };
  try {
    const token = ctx.getAuthorizationToken();
    tokenInfo = jwt.verify(token, APP_SECRET);
  } catch (err) {
    // console.error(err, '-----');
  }
  const record = {
    openId: tokenInfo.openId,
    ...ctx.request.body
  };
  debug(record);
  await FeedbackModel.record(record);
  ctx.status = 204;
});

// machineId
router.get('/feedback', async ctx => {
  const machineId = ctx.query.machineId;
  let tokenInfo = { openId: '' };
  try {
    const token = ctx.getAuthorizationToken();
    tokenInfo = jwt.verify(token, APP_SECRET);
  } catch (err) {
    // console.error(err, '-----');
  }
  const reuslts = await FeedbackModel.loadFeedback({
    machineId,
    openId: tokenInfo.openId
  });
  ctx.body = {
    feedbacks: reuslts
  };
});

module.exports = router;
