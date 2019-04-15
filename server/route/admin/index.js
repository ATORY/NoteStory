/* eslint-disable require-atomic-updates */
const debug = require('debug')('app:route:admin');
const Router = require('koa-router');
const jwt = require('jsonwebtoken');

const role = require('../../role');
const UserModel = require('../../models/user');
const tagRouter = require('./tag');
const storyRouter = require('./story');
const releaseRouter = require('./release');
const userRouter = require('./user');

const APP_SECRET = process.env.APP_SECRET;
const router = new Router({});

const checAuth = async (ctx, next) => {
  try {
    const token = ctx.getTokenCookies();
    const tokenInfo = jwt.verify(token, APP_SECRET);
    debug(tokenInfo);
    if (tokenInfo.role & role.MANAGER) {
      ctx.token = token;
      ctx.tokenInfo = tokenInfo;
      await next();
    } else {
      throw new Error('invalid role');
    }
  } catch (error) {
    ctx.status = 401;
    ctx.body = '';
  }
  // if (!token) debug({ token });
  // ctx.token = token;
  // await next();
};

router.get('/', ctx => {
  ctx.body = 'admin';
});

router.use('/tag', checAuth, tagRouter.routes(), tagRouter.allowedMethods());
router.use(
  '/story',
  checAuth,
  storyRouter.routes(),
  storyRouter.allowedMethods()
);
router.use(
  '/release',
  checAuth,
  releaseRouter.routes(),
  releaseRouter.allowedMethods()
);
router.use('/user', checAuth, userRouter.routes(), userRouter.allowedMethods());

router.get('/auth', checAuth, ctx => {
  ctx.body = {};
});

router.post('/login', async ctx => {
  const { body } = ctx.request;
  const { email, password } = body;
  debug(body);
  const token = await UserModel.adminLogin({ email, password });
  ctx.setTokenCookies(token, 3600 * 1000);
  ctx.body = {};
});

router.post('/logout', ctx => {
  ctx.clearTokenCookies();
  ctx.body = {
    login: ''
  };
});
module.exports = router;
