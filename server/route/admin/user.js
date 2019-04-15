/* eslint-disable require-atomic-updates */
const Router = require('koa-router');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:route:admin:user');

const UserModel = require('../../models/user');

const userRouter = new Router({});

userRouter.get('/', async ctx => {
  const list = await UserModel.lists({});
  ctx.body = {
    list,
    path: 'admin/user'
  };
});

module.exports = userRouter;
