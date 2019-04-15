// eslint-disable-next-line no-unused-vars
const debug = require('debug')('app:data:homeViewer');
const validator = require('validator');

const ValidationError = require('./ValidationError');
const { StoryPagination, TopicPagination } = require('./classes/Pagination');

class HomeViewer {
  async info() {
    this.info = 'homeViewer';
  }

  async stories({ after, first, page }) {
    const errors = [];
    if (after && !validator.isMongoId(after)) {
      errors.push({ key: 'after', message: 'not valid after, should be ID' });
    }
    // debug({ errors });
    if (errors.length) throw new ValidationError(errors);
    const pagination = new StoryPagination({
      after,
      first,
      page,
      recommend: true,
      valid: true
    });
    return pagination;
  }
}

class AllViewer {
  async info() {
    this.info = 'allViewer';
  }
  async stories({ after, first, page }) {
    const errors = [];
    if (after && !validator.isMongoId(after)) {
      errors.push({ key: 'after', message: 'not valid after, should be ID' });
    }
    // debug({ errors });
    if (errors.length) throw new ValidationError(errors);
    const pagination = new StoryPagination({
      after,
      first,
      page,
      valid: true
    });
    return pagination;
  }
}

class TopicViewer {
  async info() {
    this.info = 'TopicViewer';
  }
  async topics({ after, first, page }) {
    const errors = [];
    if (after && !validator.isMongoId(after)) {
      errors.push({ key: 'after', message: 'not valid after, should be ID' });
    }
    // debug({ errors });
    if (errors.length) throw new ValidationError(errors);
    const pagination = new TopicPagination({
      after,
      first,
      page
    });
    return pagination;
  }
}

exports.root = {
  // query
  query: {
    homeViewer: async () => {
      return new HomeViewer();
    },
    allViewer: async () => {
      return new AllViewer();
    },
    topicViewer: async () => {
      return new TopicViewer();
    }
  },

  mutation: {}
};
