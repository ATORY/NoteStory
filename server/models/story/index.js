const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:mongo');
const StorySchema = require('../../schema/story');
const { StoryModelName, StoryCollectionName } = require('../constants');

const { model: StoryTagModel } = require('./tag');
const { model: StoryLabelModel } = require('./label');

const StoryModel = mongoose.model(
  StoryModelName,
  StorySchema,
  StoryCollectionName
);

exports.model = StoryModel;
exports.tagModel = StoryTagModel;

const storySort = { _id: -1 };

exports.loadAllStoryLabel = async () => {
  const _labels = await StoryLabelModel.find().exec();
  const labels = _labels.map(item => item.name);
  return labels;
};

exports.loadAllStoryTags = async () => {
  const tags = await StoryTagModel.find().exec();
  return tags;
};

exports.allNum = async ({ publisher, valid = false, recommend = false }) => {
  const query = {};
  if (valid) query.valid = true;
  if (publisher) query.publisher = publisher;
  if (recommend) query.recommend = recommend;
  const num = await StoryModel.countDocuments(query).exec();
  return num;
};

exports.adminLists = async ({ after, first }) => {
  const query = after ? { _id: { $lt: mongoose.mongo.ObjectID(after) } } : {};
  const result = await StoryModel.find(query, {
    title: 1,
    intro: 1,
    tags: 1,
    label: 1,
    content: 1,
    key: 1,
    valid: 1,
    recommend: 1,
    publishTime: 1
  })
    .sort(storySort)
    .populate([
      {
        path: 'tags',
        select: 'name _id'
      },
      {
        path: 'publisher',
        select: 'nickname openId avator -_id'
      }
    ])
    .limit(first)
    .exec();
  return result;
};

exports.lists = async ({
  after,
  first,
  publisher,
  valid = false,
  recommend = false
}) => {
  const query = {};
  if (valid) query.valid = true;
  if (after) query._id = { $lt: mongoose.mongo.ObjectID(after) };
  if (publisher) query.publisher = publisher;
  if (recommend) query.recommend = recommend;
  let result = [];
  const resultQuery = StoryModel.find(query, {
    title: 1,
    intro: 1,
    tags: 1,
    label: 1,
    valid: 1,
    recommend: 1,
    publishTime: 1
  })
    .sort(storySort)
    .populate({
      path: 'tags',
      select: 'name -_id'
    })
    .limit(first);
  if (publisher) {
    result = await resultQuery.exec();
  } else {
    result = await resultQuery
      .populate({
        path: 'publisher',
        select: 'banner avator nickname openId -_id'
      })
      .exec();
  }
  // debug({ result });
  return result;
};
exports.listsEndInfo = async ({
  after,
  first,
  publisher,
  valid = false,
  recommend = false
}) => {
  const query = {};
  if (after) query._id = { $lt: mongoose.mongo.ObjectID(after) };
  if (publisher) query.publisher = publisher;
  if (recommend) query.recommend = recommend;
  if (valid) query.valid = true;

  const cursor = StoryModel.db.collection(StoryCollectionName).find(query);

  cursor.project({ _id: 1 });
  cursor.sort(storySort);
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

exports.updateStory = async (id, { tags, valid, recommend }) => {
  const result = await StoryModel.updateOne(
    { _id: id },
    { $set: { tags, valid, recommend } }
  ).exec();
  return result;
};

// for label 收集
exports.create = async data => {
  const { label } = data;
  if (label)
    StoryLabelModel.update(
      { name: label },
      { name: label },
      { upsert: true },
      err => console.error(err)
    );
  return await StoryModel.create(data);
};
exports.update = async storyModel => {
  const { label } = storyModel;
  if (label)
    StoryLabelModel.update(
      { name: label },
      { name: label },
      { upsert: true },
      err => console.error(err)
    );
  return await storyModel.save();
};
