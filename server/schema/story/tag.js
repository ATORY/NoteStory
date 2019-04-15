const { Schema } = require('mongoose');

const StoryTagSchema = new Schema({
  name: { type: String, required: true }
  // intro: { type: String, default: '', required: false }
});

StoryTagSchema.index({ name: 1 });

module.exports = StoryTagSchema;
