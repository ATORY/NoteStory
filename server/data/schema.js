const { buildSchema } = require("graphql");
const {
  typeDefines: userTypeDefines,
  querys: userQuerys,
  mutations: userMutations,
  root: userRoot
} = require("./user");

exports.schema = buildSchema(`
  ${userTypeDefines}

  type Query {
   hello: String
    ${userQuerys}
  }

  type Mutation {
    ${userMutations}
  }
`);

exports.rootValue = {
  hello: () => "hello world",
  ...userRoot.query,
  ...userRoot.mutation,
}
