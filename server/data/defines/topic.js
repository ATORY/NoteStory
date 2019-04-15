exports.typeDefines = `
  input TopicInput {
    title: String!
    snapImg: String!
    intro: String!
    stories: [String]
  }

  type Topic {
    id: ID!
    title: String!
    snapImg: String!
    intro: String!
    publisher: User
    stories: [Story]
  }
`;

exports.querys = `
  topicInfo(id: ID!): Topic
`;

exports.mutations = `
  createTopic(input: TopicInput!): Topic
  updateTopic(id: ID!, input: TopicInput!): Topic
`;
