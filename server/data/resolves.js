// const { buildSchema } = require('graphql');
const { baseRoot } = require('./baseType');
// const { typeDefines: pageTypeDefines } = require('./pagination');
const { root: userRoot } = require('./user');
const { root: storyRoot } = require('./story');
const { root: topicRoot } = require('./topic');
const { root: viewerRoot } = require('./viewer');
// const { typeDefines: commentTypeDefines } = require('./comment');

exports.rootValue = {
  hello: () => 'hello world',
  // isAuthenticated: (next, source, args, context) => {
  //   console.log(next, source, args, context);
  // },
  // isEmail: (next, source, args, context) => {
  //   console.log('---', next, source, args, context);
  //   return next();
  // },
  ...baseRoot.query,
  ...userRoot.query,
  ...userRoot.mutation,
  ...storyRoot.query,
  ...storyRoot.mutation,
  ...topicRoot.query,
  ...topicRoot.mutation,
  ...viewerRoot.query
};
