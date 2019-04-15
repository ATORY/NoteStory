const mongoose = require('mongoose');
const debug = require('debug')('app:models');
const FollowSchema = require('../schema/follow');
const { FollowModelName, FollowCollectionName } = require('./constants');

const FollowModel = mongoose.model(
  FollowModelName,
  FollowSchema,
  FollowCollectionName
);

FollowModel.on('index', function(error) {
  // "_id index cannot be sparse"
  if (error) debug('follow index', error.message);
});

const followedSort = { _id: -1 };

exports.model = FollowModel;

exports.addFollow = async ({ followed, follower }) => {
  const result = await FollowModel.create({
    followed,
    follower
  });
  return result;
};

exports.removeFollow = async ({ followed, follower }) => {
  const result = await FollowModel.deleteOne({
    followed,
    follower
  }).exec();
  return result;
};

exports.hasFollow = async ({ followed, follower }) => {
  const result = await FollowModel.findOne({
    followed,
    follower
  }).exec();
  return result;
};

exports.lists = async ({ after, first, follower }) => {
  const query = after ? { _id: { $lt: mongoose.mongo.ObjectID(after) } } : {};
  if (!follower) throw new Error('follower is null in list');
  query.follower = follower;

  const result = await FollowModel.find(query, {
    followed: 1
  })
    .sort(followedSort)
    .limit(first)
    .populate({
      path: 'followed',
      select: 'nickname intro avator openId -_id'
    })
    .exec();
  debug({ result });
  return result;
};

exports.listsEndInfo = async ({ after, first, follower }) => {
  const query = after ? { _id: { $lt: mongoose.mongo.ObjectID(after) } } : {};
  if (!follower) throw new Error('follower is null in listsEndInfo');
  query.follower = follower;
  const cursor = FollowModel.db.collection(FollowCollectionName).find(query);

  cursor.project({ _id: 1 });
  cursor.sort(followedSort);
  const num = await cursor.count();

  if (num < 1) {
    return {
      endCursor: '',
      hasNextPage: false
    };
  }
  if (num > first) {
    const end = await cursor.skip(first - 1).next();
    // console.log(end);
    return {
      endCursor: end._id.toString(),
      hasNextPage: true
    };
  }
  const end = await cursor.skip(num - 1).next();

  return {
    endCursor: end._id.toString(),
    hasNextPage: false
  };
};
