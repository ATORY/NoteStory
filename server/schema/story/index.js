const { Schema } = require('mongoose');
const { UserModelName, StoryTagModelName } = require('../../models/constants');
const StorySchema = new Schema(
  {
    title: { type: String, required: true },
    intro: { type: String, default: '', required: false },
    label: { type: String, default: '' },
    tags: [{ type: Schema.ObjectId, ref: StoryTagModelName }],
    content: { type: String, required: true },
    wordCount: { type: Number },
    key: { type: String, required: true },
    clientId: { type: String },
    snapImg: { type: String, default: '' },
    publish: { type: Boolean, default: true },
    author: { type: [String], default: [] },
    publisher: { type: Schema.ObjectId, ref: UserModelName },
    valid: { type: Boolean, default: true },
    recommend: { type: Boolean, default: false } // 上首页
  },
  { timestamps: { createdAt: 'publishTime', updatedAt: 'lastUpdateTime' } }
);

StorySchema.index({ tags: 1 });
StorySchema.index({ valid: 1 });
StorySchema.index({ valid: 1, recommend: 1 });

module.exports = StorySchema;
