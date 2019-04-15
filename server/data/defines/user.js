exports.typeDefines = `
  scalar Token # String

  type UserView {
    userInfo(token: String!): User
    # userProfile(openId: String!): User
  }

  type User implements Node {
    id: ID! # openId
    email: String
    nickname: String
    intro: String
    avator: String
    banner: String
    publishedStories(after: String, first: Int, page: Int): StoryPagination
    followeds(after: String, first: Int, page: Int): FollowedPagination
    topics(after: String, first: Int, page: Int): TopicPagination
    hasFollow: Boolean
    # comments: Comment
    # ...
    money: Int
    friends: [User]
  }

  input UserInfoInput {
    nickname: String
    intro: String
    banner: String
    avator: String
  }

  input UserInput {
    email: String
    password: String
    passwordRe: String
    oldPassword: String
  }
`;

exports.querys = `
  auth: User
  # userView: UserView
  userInfo(token: String!): User # xiangxin xinxi
  userProfile(openId: String!): User # lunkuo xinxi
  userLogin(input: UserInput): Token
`;

exports.mutations = `
  userRegister(input: UserInput!): Token
  userChangePassword(token: Token!, input: UserInput!): Boolean
  userInfoUpdate(token: Token!, input: UserInfoInput): Boolean
  userAddFollow(token: Token!, openId: String!, follow: Boolean!): User
  userLogout: Token
`;
