const debug = require('debug')('app:data');
const validator = require('validator');

const ValidationError = require('./ValidationError');
const User = require('./classes/User');

const UserModel = require('../models/user');
const FollowModel = require('../models/follow');

exports.root = {
  // query
  query: {
    auth: async (args, ctx) => {
      if (!ctx.token) {
        return new User();
      }
      try {
        const { openId, _id } = UserModel.tokenDec(ctx.token);
        const user = new User({ openId, _id });
        await user.profile();
        return user;
      } catch (error) {
        // console.error(error);
        return new User();
      }
    },
    // userView: async () => {
    //   return new UserView();
    // },
    // 简介信息，通过 openId 都可以拿到
    userProfile: async ({ openId }, ctx) => {
      let observer = '';
      if (ctx.token) {
        const { openId, _id } = UserModel.tokenDec(ctx.token);
        observer = new User({ openId, _id });
      }
      const user = new User({ openId }, observer);
      await user.profile();
      return user;
    },

    userInfo: async ({ token }) => {
      const { openId, _id } = UserModel.tokenDec(token);
      const user = new User({ openId, _id });
      await user.info();
      return user;
    },

    userLogin: async ({ input }, ctx) => {
      const { email, password } = input;
      const errors = [];
      if (!validator.isEmail(email)) {
        errors.push({ key: 'email', message: 'not valid email' });
      }
      if (!validator.isLength(password, { min: 6, max: 15 })) {
        errors.push({ key: 'password', message: '6 min atleast' });
      }
      if (errors.length) throw new ValidationError(errors);
      const token = await UserModel.login({ email, password });
      ctx.setTokenCookies(token);
      return token;
    }
  },

  mutation: {
    userLogout: (args, ctx) => {
      // record logout time ？
      ctx.clearTokenCookies();
      return '';
    },

    // eslint-disable-next-line no-unused-vars
    userRegister: async ({ input }, ctx) => {
      debug(input);
      const { email, password, passwordRe } = input;
      const token = await UserModel.register({ email, password, passwordRe });
      // ctx.setTokenCookies(token);
      return token;
    },

    userChangePassword: async ({ token, input }) => {
      // debug(token, input);
      const errors = [];
      const { password, oldPassword } = input;
      let tokenInfo = {};
      try {
        tokenInfo = UserModel.tokenDec(token);
      } catch (error) {
        errors.push({ key: 'token', message: error.message });
      }
      if (!validator.isLength(password, { min: 6, max: 15 })) {
        errors.push({ key: 'password', message: '6 min atleast' });
      }
      if (!validator.isLength(oldPassword, { min: 6, max: 15 })) {
        errors.push({ key: 'oldPassword', message: '6 min atleast' });
      }
      if (errors.length) throw new ValidationError(errors);
      const { _id } = tokenInfo;
      await User.changePwd({
        _id,
        password: oldPassword,
        newPassword: password
      });
      // throw new Error('err');
      return true;
    },

    userInfoUpdate: async ({
      token,
      input: { nickname, intro, banner, avator }
    }) => {
      const { _id } = UserModel.tokenDec(token);
      const user = new User({ _id });
      user.nickname = nickname;
      user.intro = intro;
      user.avator = avator;
      user.banner = banner;
      let success = false;
      try {
        const result = await user.updateInfo();
        debug(result);
        success = !!result.ok;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      return success;
    },

    userAddFollow: async ({ token, openId, follow }) => {
      const { _id } = UserModel.tokenDec(token);
      const follower = _id;
      const followedUser = new User({ openId });
      await followedUser.profile();
      const followed = followedUser._id;
      if (follow) {
        await FollowModel.addFollow({ followed, follower });
        // debug(result);
      } else {
        await FollowModel.removeFollow({ followed, follower });
      }
      // debug(result);
      // return !!result.deletedCount;
      return {
        id: openId,
        hasFollow: follow
      };
      // return true;
    }
  }
};
