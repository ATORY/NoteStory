/* eslint-disable require-atomic-updates */
const Router = require('koa-router');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:route:admin:tag');

const StoryModel = require('../../models/story');

const tagRouter = new Router({});

tagRouter.get('/', async ctx => {
  const [labels, tags] = await Promise.all([
    StoryModel.loadAllStoryLabel(),
    StoryModel.loadAllStoryTags()
  ]);
  ctx.body = {
    labels,
    tags,
    path: 'admin/tag'
  };
});

tagRouter.post('/', async ctx => {
  const { body } = ctx.request;
  const result = await StoryModel.tagModel.create({ name: body.tag });
  ctx.body = { _id: result._id };
});

tagRouter.put('/:id', async ctx => {
  const { id } = ctx.params;
  const { body } = ctx.request;
  const result = await StoryModel.tagModel.updateOne(
    { _id: id },
    { name: body.tag }
  );
  ctx.body = result;
});

tagRouter.delete('/:id', async ctx => {
  const { id } = ctx.params;
  const result = await StoryModel.tagModel.remove({ _id: id });
  ctx.body = result;
});

module.exports = tagRouter;
