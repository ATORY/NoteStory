exports.typeDefines = `
  enum CommentType {
    TO_STORY
    TO_COMMENT
    TO_STORY_SET
  }
  type Ref {
    id: String
    type: CommentType
  }
  type CommentPagination {
    totalCount: Int
    edges: [Comment]
    pageInfo: PageInfo
  }
  type Comment {
    id: ID!
    ref: Ref
    # from: User!
    # to: User!
    content: String
    time: Date
  }
`;

exports.querys = `
  storyInfo(id: ID!, local: Boolean): User # xiangxin xinxi
`;
