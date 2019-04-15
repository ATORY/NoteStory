const { Schema } = require('mongoose');
const { UserModelName, StoryModelName } = require('../models/constants');

const TopicSchema = new Schema(
  {
    title: { type: String, default: '' },
    snapImg: { type: String, default: '' },
    intro: { type: String, default: '' },
    stories: [{ type: Schema.ObjectId, ref: StoryModelName }],
    publisher: { type: Schema.ObjectId, ref: UserModelName },
    valid: { type: Boolean, default: true }
  },
  { timestamps: { createdAt: 'publishTime', updatedAt: 'lastUpdateTime' } }
);

module.exports = TopicSchema;
