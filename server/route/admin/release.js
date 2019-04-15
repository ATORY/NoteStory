/* eslint-disable require-atomic-updates */
const Router = require('koa-router');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:route:admin:release');

const ElectronAppModel = require('../../models/electronApp');
const ReleaseModel = require('../../models/release');

const releaseRouter = new Router({});

releaseRouter.get('/installed', async ctx => {
  const lists = await ElectronAppModel.installed();
  ctx.body = {
    lists,
    path: 'admin/release/installed'
  };
});

releaseRouter.get('/list', async ctx => {
  const lists = await ReleaseModel.allRelease();
  const curr = ReleaseModel.CURR_VALID_RELEASE;
  ctx.body = {
    lists,
    curr,
    path: 'admin/release'
  };
});

releaseRouter.post('/', async ctx => {
  const { body } = ctx.request;
  const { platform, version, release } = body;
  const result = await ReleaseModel.model.create({
    platform,
    version,
    release
  });
  ctx.body = { result };
});

releaseRouter.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const result = await ReleaseModel.model.remove({ _id: id });
  ctx.body = { result };
});

module.exports = releaseRouter;
