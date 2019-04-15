// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:data:classes:topic');

// const User = require('./User');
const TopicModel = require('../../models/topic');

class Topic {
  constructor(
    { id = '', title, intro, snapImg, stories, publisher },
    observer
  ) {
    this.id = id;
    this.title = title;
    this.snapImg = snapImg;
    this.stories = stories;
    this.intro = intro;
    if (publisher) this.publisher = publisher;
    if (observer) this.observer = observer;
  }

  async save() {
    const story = await TopicModel.create({
      title: this.title,
      intro: this.intro,
      snapImg: this.snapImg,
      stories: this.stories,
      publisher: this.publisher,
      publishTime: new Date(),
      lastUpdateTime: new Date()
    });
    return story;
  }

  async update() {
    const topic = await TopicModel.model.findById(this.id).exec();
    if (topic.publisher.toString() !== this.publisher.toString()) {
      throw new Error('not the story author');
    }
    topic.title = this.title;
    topic.intro = this.intro;
    topic.snapImg = this.snapImg;
    topic.stories = this.stories;
    debug(topic);
    await topic.save();
    return topic;
  }

  async info() {
    const topic = (await TopicModel.model
      .findById(this.id)
      .populate({
        path: 'stories',
        select: '_id title intro'
      })
      .exec()).toObject();
    topic.stories.map(item => {
      item.id = item._id;
      return item;
    });
    this.id = topic._id;
    this.title = topic.title;
    this.intro = topic.intro;
    this.snapImg = topic.snapImg;
    this.stories = topic.stories;
  }
}

module.exports = Topic;
