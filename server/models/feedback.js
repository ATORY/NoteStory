/**
 * electron app 统计
 */
const mongoose = require('mongoose');
const debug = require('debug')('app:models:electronApp');
const FeedbackSchema = mongoose.Schema(require('../schema/feedback'));

FeedbackSchema.index({ openId: 1 });
FeedbackSchema.index({ machineId: 1 });

const FeedbackModel = mongoose.model('feedback', FeedbackSchema, 'feedback');

exports.model = FeedbackModel;

exports.record = async data => {
  if (!data.content) return;
  let result = {};
  try {
    result = await FeedbackModel.create(data);
  } catch (error) {
    debug(error);
  }
  return result;
};

exports.loadFeedback = async ({ openId, machineId }) => {
  if (!openId || !machineId) return [];
  const query = {};
  if (openId) query.openId = openId;
  else query.machineId = machineId;
  const results = await FeedbackModel.find(query, {
    content: 1,
    reply: 1,
    createAt: 1
  })
    .sort({ _id: -1 })
    .exec();
  return results;
};
