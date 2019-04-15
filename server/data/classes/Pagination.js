const debug = require('debug')('app:data:classes:Pagination');

const StoryModel = require('../../models/story');
const FollowModel = require('../../models/follow');
const TopicModel = require('../../models/topic');

const PAGE_OFFSET = 10;

class Pagination {
  constructor({ after, first, page }) {
    this.first = first || PAGE_OFFSET;
    this.after = after || '';
    this.page = page || 1;
  }
  totalCount(args) {
    debug('totalCount', args, this.parent);
    throw new Error('totalCount must be implements');
  }
  edges() {
    debug('pagination，commits');
    throw new Error('must be implements');
  }

  pageInfo() {
    return {
      endCursor: 'this.end.id',
      hasNextPage: false
    };
  }
}

exports.StoryPagination = class StoryPagination extends Pagination {
  constructor(
    { after, first, page, recommend = false, valid = false },
    publisher /* ObjectID */
  ) {
    super({ after, first, page });
    this.recommend = recommend;
    this.valid = valid;
    this.publisher = publisher;
    // if (parent) this.parent = parent;
    // if (type) this.type = type;
  }

  async totalCount() {
    const query = {};
    if (this.publisher) query.publisher = this.publisher;
    if (this.recommend) query.recommend = this.recommend;
    if (this.valid) query.valid = this.valid;

    const num = await StoryModel.allNum(query);
    debug({ num });
    return num;
  }
  async edges() {
    const query = {
      after: this.after,
      first: this.first
    };
    if (this.publisher) query.publisher = this.publisher;
    if (this.recommend) query.recommend = this.recommend;
    if (this.valid) query.valid = this.valid;
    const stories = await StoryModel.lists(query);
    return stories.map(_item => {
      // item.id = item._id.toString();
      const item = _item.toObject();
      item.id = item._id;
      item.clientURL =
        process.env.NODE_ENV === 'production'
          ? `https://wesy.club/story/client/${item._id}`
          : `http://localhost:5000/story/client/${item._id}`;
      if (item.publisher) item.publisher.id = item.publisher.openId;
      if (item.tags.length > 0) {
        item.tags = item.tags.map(item => item.name);
        // debug(item.tags);
      }
      // debug(item);
      return { node: item };
    });
  }
  async pageInfo() {
    const query = {
      after: this.after,
      first: this.first
    };
    if (this.publisher) query.publisher = this.publisher;
    if (this.recommend) query.recommend = this.recommend;
    if (this.valid) query.valid = this.valid;

    const endInfo = await StoryModel.listsEndInfo(query);
    return endInfo;
  }
};

exports.FollowedPagination = class FollowedPagination extends Pagination {
  constructor({ after, first, page }, follower /* ObjectID */) {
    super({ after, first, page });
    this.follower = follower;
  }

  async totalCount() {
    const query = {};
    if (!this.follower) throw new Error('no follower');
    query.follower = this.follower;
    const num = await FollowModel.model.countDocuments(query).exec();
    debug({ num });
    return num;
  }
  async edges() {
    const followeds = await FollowModel.lists({
      after: this.after,
      first: this.first,
      follower: this.follower
    });
    // debug({ followeds });
    return followeds.map(_item => {
      // item.id = item._id.toString();
      const { followed } = _item.toObject();
      followed.id = followed.openId;
      followed.hasFollow = true;
      // item.id = item.openId;
      // if (item.publisher) item.publisher.id = item.publisher.openId;
      // debug(followed);
      return { node: followed };
    });
  }
  async pageInfo() {
    const endInfo = await FollowModel.listsEndInfo({
      after: this.after,
      first: this.first,
      follower: this.follower
    });
    return endInfo;
  }
};

exports.CommentPagination = class CommentPagination extends Pagination {
  constructor(paginationInfo, parent) {
    super(paginationInfo, parent, 'comment');
  }
  totalCount() {
    return 10;
  }
  edges() {
    return [
      {
        // __typename: 'Comment',
        id: 'comments-1',
        content: 'comment content'
      }
    ];
  }
};

exports.TopicPagination = class TopicPagination extends Pagination {
  constructor({ after, first, page }, publisher) {
    super({ after, first, page });
    this.publisher = publisher;
  }

  async totalCount() {
    const query = {};
    if (this.publisher) query.publisher = this.publisher;
    const num = await TopicModel.model.countDocuments(query).exec();
    debug({ num });
    return num;
  }

  async edges() {
    const query = {
      after: this.after,
      first: this.first
    };
    if (this.publisher) query.publisher = this.publisher;
    const topics = await TopicModel.lists(query);
    return topics.map(_item => {
      const item = _item.toObject();
      item.id = item._id;
      item.stories = item.stories.map(item => {
        item.id = item._id;
        return item;
      });
      return { node: item };
    });
  }
  async pageInfo() {
    const query = {
      after: this.after,
      first: this.first
    };
    if (this.publisher) query.publisher = this.publisher;
    const endInfo = await TopicModel.listsEndInfo(query);
    return endInfo;
  }
};
