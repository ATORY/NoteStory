const Router = require('koa-router');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:route:index');
// const apm = require('elastic-apm-node');
// const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const graphqlHTTP = require('koa-graphql');
const packageInfo = require('../../package.json');

const { schema } = require('../data/defines/schema');
const { rootValue } = require('../data/resolves');
const counter = require('./count');
const uploader = require('./upload');
const utilsRouter = require('./utils');
const staticer = require('./static');
const adminer = require('./admin');

const serviceName = packageInfo.name.toUpperCase();
const serviceVersion = packageInfo.version;

const router = new Router();

const startTime = new Date().toISOString();
const extensions = ({
  // document, variables, operationName, result,
  context
}) => ({
  // runTime: Date.now() - context.startTime,
  // durations: moment(start).fromNow(),
  startTime,
  timeSpend: Date.now() - context.requstTime
});

// /image_s
router.use(staticer.routes(), staticer.allowedMethods());

router.use('/admin', bodyParser(), adminer.routes(), adminer.allowedMethods());
router.use('/count', bodyParser(), counter.routes(), counter.allowedMethods());
router.use('/upload', uploader.routes(), uploader.allowedMethods());
router.use(
  '/utils',
  bodyParser(),
  utilsRouter.routes(),
  utilsRouter.allowedMethods()
);

router.all(
  '/graphql',
  async (ctx, next) => {
    ctx.requstTime = Date.now();
    await next();
    ctx.set('Accept-Encoding', 'gzip, deflate');
    ctx.set('Cache-Control', 'no-cache');
  },
  // cors(),
  async (ctx, next) => {
    const token = ctx.getAuthorizationToken() || ctx.getTokenCookies();
    // debug({ token });
    ctx.token = token || '';
    await next();
  },
  graphqlHTTP({
    schema,
    rootValue,
    // context: { startTime: Date.now() },
    // fieldResolver: () => {
    //   Works: {
    //     resolveType: (obj) => {
    //       console.log('works', obj)
    //       return 'Story'
    //       // if (obj instanceof Todo) return 'Todo'
    //     },
    //   },
    // },
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      // locations: error.locations,
      path: error.path
    }),
    /*
    formatError: err => {
      debug('-------------');
      debug(err);
      debug('+++++++++++++');
      // errors.report(err, req);   // <-- log the error
      return {
        message: err.message,
        code: err.originalError && err.originalError.code
        // locations: err.locations,
        // path: err.path
      };
    },*/
    graphiql: process.env.NODE_ENV !== 'production',
    extensions
  })
);

router.get('/version', ctx => {
  ctx.body = {
    version: serviceVersion,
    description: `${serviceName}-${serviceVersion} @ ${process.env.NODE_ENV} & node-${process.version} build`
  };
});

// router.get('/center', ctx => {
//   ctx.redirect('/center/123');
// });

module.exports = router;
