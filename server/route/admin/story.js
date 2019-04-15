/* eslint-disable require-atomic-updates */
const Router = require('koa-router');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:route:admin:tag');

const StoryModel = require('../../models/story');

const storyRouter = new Router({});

storyRouter.get('/tags', async ctx => {
  const tags = await StoryModel.loadAllStoryTags();
  ctx.body = {
    tags
  };
});

// 分页
storyRouter.get('/', async ctx => {
  const { after = '', first = 10 } = ctx.query;
  const stories = await StoryModel.adminLists({ after, first });
  ctx.body = {
    stories
  };
});

storyRouter.put('/:id', async ctx => {
  const { body } = ctx.request;
  const { id } = ctx.params;
  const result = await StoryModel.updateStory(id, body);
  ctx.body = result;
});

module.exports = storyRouter;
