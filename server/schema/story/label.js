const { Schema } = require('mongoose');

const StoryLabelSchema = new Schema({
  name: { type: String, required: true }
  // intro: { type: String, default: '', required: false }
});

StoryLabelSchema.index({ name: 1 });

module.exports = StoryLabelSchema;
