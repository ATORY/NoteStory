const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:mongo');
const StoryLabelSchema = require('../../schema/story/label');
const {
  StoryLabelModelName,
  StoryLabelCollectionName
} = require('../constants');

const StoryTagModel = mongoose.model(
  StoryLabelModelName,
  StoryLabelSchema,
  StoryLabelCollectionName
);

exports.model = StoryTagModel;
