const debug = require('debug')('app:data')
// const UserCenter = {};

// const userCenter = UserCenter;

exports.typeDefines = `
  scalar Token # String

  type User {
    id: ID # openId
    email: String
    username: String
    avator: String
    money: Int
    friends: User
    # articles: Article
    # comments: Comment
    # ...
  }

  type UserProfile {
    id: ID
    username: String
    avator: String
  }

  input RegisterInput {
    email: String!
    password: String!
    passwordRe: String
  }

  input ChangePwdInput {
    token: String!
    oldPwd: String!
    password: String!
    passwordRe: String!
  }

  input UserInfoInput {
    token: String!
    # ...
  }
`;

exports.querys = `
  userInfo(token: String!): User # xiangxin xinxi
  userProfile(id: String!): UserProfile # lunkuo xinxi
  login(email: String!, password: String!): Token
`;

exports.mutations = `
  register(input: RegisterInput): Token
  changePassword(input: ChangePwdInput!): Boolean
  updateUserInfo(input: UserInfoInput!): Boolean
  logout: Boolean
`;

class User {
  constructor(cfg = {
    id: '', email: '', password: '',
  }) {
    this.id = cfg.id;
    this.email = cfg.email;
    this.password = cfg.password;
  }

  async info() {
    this.money = 100;
    return this;
  }

  async profile() {
    this.username = 'username';
    this.avator = 'avator';
    return this;
  }

  friends() {
    // console.log(args)
    this.friends = [{
      username: 'friends',
    }];
    return this;
  }
}

exports.User = User;

exports.root = {
  // query
  query: {
    userInfo: async ({ token }) => {
      debug('token', token)
      const user = new User({ token });
      await user.info();
      return user;
    },
    userProfile: async ({ id }) => {
      const user = new User({ id });
      await user.profile();
      debug('user', user);
      return user;
    },
    login: async ({ email, password }, ctx) => {
      const token = `${email}, ${password}await userCenter.login({ email, password })`;
      ctx.setTokenCookies(token);
      return token;
    },
  },

  mutation: {
    logout: (args, ctx) => {
      ctx.clearTokenCookies();
      return true;
    },

    register: async ({ input }, ctx) => {
      debug(input);
      try {
        const token = 'await userCenter.register';
        ctx.setTokenCookies(token);
        return token;
      } catch (error) {
        // console.error(error, error.code);
        throw error;
      }
    },

    changePassword: async ({ input }) => {
      debug(input);
      throw new Error('err');
      // return true;
    },

    updateUserInfo: async () => {
      debug('updateUserInfo');
      return true;
    },
  },
};
