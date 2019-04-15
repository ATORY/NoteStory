/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:data:story');
const User = require('./classes/User');
const Topic = require('./classes/Topic');
const { tokenDec } = require('../models/user');

exports.root = {
  query: {
    topicInfo: async ({ id }, ctx) => {
      let observer = '';
      if (ctx.token) {
        const { openId, _id } = tokenDec(ctx.token);
        observer = new User({ openId, _id });
      }
      const topic = new Topic({ id }, observer);
      await topic.info();
      return topic;
    }
  },

  mutation: {
    createTopic: async ({ input: { title, snapImg, intro, stories } }, ctx) => {
      if (!ctx.token) {
        return new Error('login has expires');
      }
      const { _id } = tokenDec(ctx.token);
      const topic = new Topic({
        title,
        intro,
        snapImg,
        stories,
        publisher: _id
      });
      const { id } = await topic.save();
      topic.id = id;
      return topic;
    },
    updateTopic: async (
      { id, input: { title, snapImg, intro, stories } },
      ctx
    ) => {
      if (!ctx.token) {
        return new Error('login has expires');
      }
      const { _id } = tokenDec(ctx.token);
      const topic = new Topic({
        id,
        title,
        intro,
        snapImg,
        stories,
        publisher: _id
      });
      await topic.update();
      return topic;
    }
  }
};
