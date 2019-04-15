const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:mongo:topic');

const TopicSchema = require('../schema/topic');
const { TopicModelName, TopicCollectionName } = require('./constants');

const TopicModel = mongoose.model(
  TopicModelName,
  TopicSchema,
  TopicCollectionName
);

exports.model = TopicModel;

exports.lists = async ({ after, first, publisher }) => {
  const query = {};
  if (after) query._id = { $lt: mongoose.mongo.ObjectID(after) };
  if (publisher) query.publisher = publisher;
  const result = await TopicModel.find(query)
    .populate({
      path: 'stories',
      select: '_id title'
    })
    .limit(first);
  return result;
};

exports.listsEndInfo = async ({ after, first }) => {
  const query = {};
  if (after) query._id = { $lt: mongoose.mongo.ObjectID(after) };
  const cursor = TopicModel.db.collection(TopicCollectionName).find(query);
  cursor.project({ _id: 1 });
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

exports.create = async data => {
  const result = await TopicModel.create(data);
  return result;
};

exports.update = async topicModel => {
  const result = topicModel.save();
  return result;
};
