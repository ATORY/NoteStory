// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:data:classes:story');

const User = require('./User');
const StoryModel = require('../../models/story');

class Story {
  constructor(
    {
      id = '',
      title,
      snapImg,
      content,
      wordCount,
      intro,
      md5,
      key,
      label,
      clientId,
      publisher
    },
    observer
  ) {
    this.id = id;
    this.title = title;
    this.snapImg = snapImg;
    this.content = content;
    this.wordCount = wordCount;
    this.intro = intro;
    this.md5 = md5;
    this.key = key;
    this.label = label;
    this.clientId = clientId;
    this.clientURL =
      process.env.NODE_ENV === 'production'
        ? `https://wesy.club/story/client/${id}`
        : `http://localhost:5000/story/client/${id}`;
    if (publisher) this.publisher = publisher;
    if (observer) this.observer = observer;
  }

  async save() {
    const story = await StoryModel.create({
      title: this.title,
      intro: this.intro,
      content: this.content,
      wordCount: this.wordCount,
      md5: this.md5,
      key: this.key,
      publisher: this.publisher,
      label: this.label,
      clientId: this.clientId,
      publish: true,
      publishTime: new Date(),
      lastUpdateTime: new Date()
    });
    return story;
  }

  async update() {
    const story = await StoryModel.model.findById(this.id).exec();
    if (story.publisher.toString() !== this.publisher.toString()) {
      throw new Error('not the story author');
    }
    story.title = this.title;
    story.intro = this.intro;
    story.content = this.content;
    story.wordCount = this.wordCount;
    story.md5 = this.md5;
    story.key = this.key;
    story.publisher = this.publisher;
    story.label = this.label;
    story.clientId = this.clientId;
    story.key = this.key;
    story.lastUpdateTime = new Date();
    // await story.save();
    await StoryModel.update(story);
    return story;
  }

  async info() {
    const story = await StoryModel.model
      .findById(this.id)
      .populate({
        path: 'tags',
        select: 'name -_id'
      })
      .exec();
    if (story && story.valid) {
      this.title = story.title;
      this.intro = story.intro;
      this.content = story.content;
      this.clientURL = story.clientURL;
      this.tags = story.tags.map(item => item.name);
      this.wordCount = story.wordCount;
      this.key = story.key;
      this.publishTime = story.publishTime;
    } else {
      this.title = '不存在或在已被删除';
      this.intro = '';
      this.content = '';
      this.tags = [];
      this.wordCount = 0;
      this.key = '';
      this.publishTime = '';
    }
  }
  /*
  async comments(args) {
    // console.log(args);
    const pagination = new CommentPagination(args, this);
    // pagination.totalCount()
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    return pagination;
  }
  */

  async publisher() {
    const story = await StoryModel.model
      .findById(this.id, { publisher: 1, valid: 1 })
      // .populate({
      //   path: 'publisher',
      //   select: 'avator nickname openId intro -_id'
      // })
      .exec();
    // console.log(User);
    // console.log({ User });
    if (story && story.valid) {
      const publisher = new User({ _id: story.publisher }, this.observer);
      //  story.publisher.toObject();
      await publisher.profile();
      // debug('publisher', publisher);
      return publisher;
    }
    return {
      id: 'admin'
    };
  }
}

module.exports = Story;
