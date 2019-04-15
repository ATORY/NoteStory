const { Pagination } = require('./pagination');

class CommentPagination extends Pagination {
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
}

exports.CommentPagination = CommentPagination;
