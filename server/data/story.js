// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:data:story');
const Story = require('./classes/Story');
const User = require('./classes/User');
const { tokenDec } = require('../models/user');

exports.root = {
  // query
  query: {
    storyInfo: async ({ id }, ctx) => {
      let observer = '';
      if (ctx.token) {
        const { openId, _id } = tokenDec(ctx.token);
        observer = new User({ openId, _id });
      }
      const story = new Story({ id }, observer);
      await story.info();
      return story;
    }
  },

  mutation: {
    createStory: async (
      {
        input: { clientId, title, content, wordCount, intro, key, label, md5 }
      },
      ctx
    ) => {
      if (!ctx.token) {
        return new Error('login has expires');
      }
      const { _id } = tokenDec(ctx.token);
      const story = new Story({
        clientId,
        title,
        content,
        wordCount,
        intro,
        md5,
        key,
        label,
        publisher: _id
      });
      const { id } = await story.save();
      story.id = id;
      return story;
    },
    updateStory: async (
      {
        id,
        input: { clientId, title, content, wordCount, intro, key, label, md5 }
      },
      ctx
    ) => {
      if (!ctx.token) {
        return new Error('login has expires');
      }
      const { _id } = tokenDec(ctx.token);
      const story = new Story({
        id,
        clientId,
        title,
        intro,
        content,
        wordCount,
        md5,
        key,
        label,
        publisher: _id
      });
      await story.update();
      return story;
    }
  }
};
