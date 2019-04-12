const Router = require('koa-router');
const debug = require('debug')('app:http')
const apm = require('elastic-apm-node');

const graphqlHTTP = require('koa-graphql');
const packageInfo = require('../package.json');

const {
  schema, rootValue,
} = require('./data/schema');

const serviceName = packageInfo.name.toUpperCase();
const serviceVersion = packageInfo.version;

const router = new Router();

const startTime = new Date().toISOString();
const extensions = ({
  // document, variables, operationName, result,
  context,
}) => ({
  // runTime: Date.now() - context.startTime,
  // durations: moment(start).fromNow(),
  startTime,
  timeSpend: Date.now() - context.requstTime,
});

router.all('/graphql',
  async (ctx, next) => {
    ctx.requstTime = Date.now();
    await next();
    ctx.set('Accept-Encoding', 'gzip, deflate');
    ctx.set('Cache-Control', 'no-cache');
  },
  graphqlHTTP({
    schema,
    rootValue,
    // context: { startTime: Date.now() },
    formatError: (err) => {
      debug('-------------');
      debug(err);
      debug('+++++++++++++');
      // errors.report(err, req);   // <-- log the error
      return {
        message: err.message,
        code: err.originalError && err.originalError.code,
        // locations: err.locations,
        // path: err.path
      };
    },
    graphiql: process.env.NODE_ENV !== 'production',
    extensions,
  }));


router.get('/check', (ctx) => {
  ctx.body = `
    ${serviceName}-${serviceVersion} in ${process.env.NODE_ENV}
    apm:
      version: ${apm.version}
      isStarted: ${apm.isStarted()}
  `;
});

module.exports = router;
