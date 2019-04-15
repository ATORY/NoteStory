exports.typeDefines = `

  type Tag {
    id: ID!
    name: String
  }

  type Category {
    id: ID!
    name: String
  }

  interface Works {
    # author: User!
    content: String
  }

  input StoryInput {
    # id: String
    clientId: String!
    title: String!
    content: String!
    wordCount: Int!
    intro: String
    md5: String!
    key: String!
    label: String
    time: String
    lastUpdateTime: String
  }
  
  type Story implements Works & Node {
    id: ID!
    md5: String # title content md5, 作 update 校验
    clientId: String
    title: String!
    # author: User!
    snapImg: String
    intro: String
    label: String
    content: String
    wordCount: Int
    key: String
    tags: [String]
    categorys: [String]
    publish: Boolean
    publishTime: Date
    createTime: Date
    lastEditTime: Date
    publisher: User
    recommend: Boolean
    valid: Boolean
    clientURL: String
    # aside: ArticleAside
    # first 靠前的多三个
    # comments(after: String, first: Int, page: Int): CommentPagination
  }
  
  type StorySet implements Works & Node {
    id: ID!
    title: String
    content: String
    author: User!
    snapImg: String
    intro: String
    tags: [Tag]
    categorys: [String]
    publish: Boolean
    publishTime: Date
    createTime: Date
    lastEditTime: Date
  }
`;

exports.querys = `
  storyInfo(id: ID!, local: Boolean): Story # xiangxin xinxi
`;

exports.mutations = `
  createStory(input: StoryInput!): Story
  updateStory(id: ID!, input: StoryInput!): Story
`;
