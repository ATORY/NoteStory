const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:mongo');
const StoryTagSchema = require('../../schema/story/tag');
const { StoryTagModelName, StoryTagCollectionName } = require('../constants');

const StoryTagModel = mongoose.model(
  StoryTagModelName,
  StoryTagSchema,
  StoryTagCollectionName
);

exports.model = StoryTagModel;
