const { Schema } = require('mongoose');

const ReleaseSchema = new Schema({
  platform: { type: String }, // linux | mac | windows | android | iOS // linux AppImage
  version: { type: String }, // 安装包 version 1.0.0
  release: { type: String }, // 安装包名
  time: { type: Date, default: Date.now }
  // author: [{ type: Schema.ObjectId, ref: 'User' }],
  // publisher: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = ReleaseSchema;
