const { buildSchema } = require('graphql');
const { baseType, baseQuerys } = require('./baseType');
const { typeDefines: pageTypeDefines } = require('./pagination');
const {
  typeDefines: userTypeDefines,
  querys: userQueries,
  mutations: userMutations
  // root: userRoot
} = require('./user');
const {
  typeDefines: storyTypeDefines,
  querys: storyQueries,
  mutations: storyMutations
  // root: storyRoot
} = require('./story');

const {
  typeDefines: topicTypeDefines,
  querys: topicQueries,
  mutations: topicMutations
} = require('./topic');
// const { typeDefines: commentTypeDefines } = require('./comment');
const {
  typeDefines: viewerTypeDefines,
  querys: viewerQuerys
} = require('./viewer');

exports.schema = buildSchema(`
  ${baseType}
  ${pageTypeDefines}
  ${userTypeDefines}
  ${storyTypeDefines}
  ${topicTypeDefines}
  ${viewerTypeDefines}

  # FIELD_DEFINITION
  # directive @isAuthenticated on QUERY | FIELD
  # directive @isEmail on FIELD | INPUT_FIELD_DEFINITION

  type Query {
    hello: String
    ${baseQuerys}
    ${userQueries}
    ${storyQueries}
    ${topicQueries}
    ${viewerQuerys}
  }

  type Mutation {
    ${userMutations}
    ${storyMutations}
    ${topicMutations}
  }
`);
