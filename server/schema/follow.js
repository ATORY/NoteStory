const { Schema } = require('mongoose');

const FollowSchema = new Schema({
  followed: { type: Schema.ObjectId, ref: 'User' },
  follower: { type: Schema.ObjectId, ref: 'User' },
  time: { type: Date, default: Date.now }
  // author: [{ type: Schema.ObjectId, ref: 'User' }],
  // publisher: { type: Schema.ObjectId, ref: 'User' }
});

FollowSchema.index({ followed: 1 });
FollowSchema.index({ follower: 1 });
FollowSchema.index({ follower: 1, followed: 1 }, { unique: true });

module.exports = FollowSchema;
