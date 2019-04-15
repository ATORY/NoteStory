const debug = require('debug')('app:data:classes:User');

const validator = require('validator');

const UserModel = require('../../models/user');
const FollowModel = require('../../models/follow');

const ValidationError = require('../ValidationError');

const {
  StoryPagination,
  FollowedPagination,
  TopicPagination
} = require('./Pagination');

class User {
  constructor(
    cfg = {
      _id: '',
      openId: '',
      nickname: '',
      avator: ''
    },
    observer
  ) {
    this._id = cfg._id;
    this.id = cfg.openId;
    this.nickname = '';
    this.avator = '';
    if (observer) this.observer = observer;
  }

  async profile(withEmail = false) {
    let query = '';
    if (this.id) query = { openId: this.id };
    if (this._id) query = { _id: this._id };
    if (!query) throw new Error('user profile query is null');
    const {
      openId,
      email,
      nickname,
      avator,
      intro,
      banner,
      _id
    } = await UserModel.model.findOne(query).exec();
    this._id = _id;
    this.id = openId;
    if (withEmail) this.email = email;
    this.nickname = nickname;
    this.intro = intro;
    this.avator = avator;
    this.banner = banner;
  }

  async updateInfo() {
    const propertyNames = Object.getOwnPropertyNames(this);
    // console.log(propertyNames);
    const validUpdates = {};
    propertyNames
      .filter(filed => filed !== '_id' && filed !== 'id' && this[filed])
      .forEach(filed => (validUpdates[filed] = this[filed]));
    // debug(validUpdates);
    const result = await UserModel.model
      .updateOne({ _id: this._id }, { $set: validUpdates })
      .exec();
    return result;
  }

  async info() {
    await this.profile(true);
    const info = await UserModel.model.findOne({ _id: this._id }).exec();
    this.money = (info && info.money) || 100;
  }

  async friends(args) {
    const { nickname, avator } = await UserModel.model
      .findOne({
        openId: this.id
      })
      .exec();
    debug('---', args, nickname, avator, new Date());
    return [{ nickname: 'friends' }];
  }

  async publishedStories({ after, first, page }) {
    const errors = [];
    if (after && !validator.isMongoId(after)) {
      errors.push({ key: 'after', message: 'not valid after, should be ID' });
    }
    // debug({ errors });
    if (errors.length) throw new ValidationError(errors);
    const { _id } = await UserModel.model
      .findOne({
        openId: this.id
      })
      .exec();
    const pagination = new StoryPagination({ after, first, page }, _id);
    return pagination;
  }

  async followeds({ after, first, page }) {
    const errors = [];
    if (after && !validator.isMongoId(after)) {
      errors.push({ key: 'after', message: 'not valid after, should be ID' });
    }
    // debug({ errors });
    if (errors.length) throw new ValidationError(errors);
    const { _id } = await UserModel.model
      .findOne({
        openId: this.id
      })
      .exec();
    const pagination = new FollowedPagination({ after, first, page }, _id);
    return pagination;
  }

  async topics({ after, first, page }) {
    const errors = [];
    if (after && !validator.isMongoId(after)) {
      errors.push({ key: 'after', message: 'not valid after, should be ID' });
    }
    // debug({ errors });
    if (errors.length) throw new ValidationError(errors);
    const { _id } = await UserModel.model
      .findOne({
        openId: this.id
      })
      .exec();
    const pagination = new TopicPagination({ after, first, page }, _id);
    return pagination;
  }

  async hasFollow() {
    if (this.observer) {
      const result = await FollowModel.hasFollow({
        followed: this._id,
        follower: this.observer._id
      });
      // debug(result);
      return !!result;
    }
    return false;
  }
}

module.exports = User;
