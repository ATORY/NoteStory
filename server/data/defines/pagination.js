/**
 * only used by other query
 */
exports.typeDefines = `
  type PageInfo {
    endCursor: String,
    hasNextPage: Boolean,
    hasPreviousPage: Boolean,
    startCursor: String,
  }

  type StoryPagination {
    totalCount: Int
    edges: [StoryEdge]
    pageInfo: PageInfo
  }

  type StoryEdge {
    node: Story
    cursor: String
  }

  type FollowedPagination {
    totalCount: Int
    edges: [FollowedEdge]
    pageInfo: PageInfo
  }

  type FollowedEdge {
    node: User
    cursor: String
  }

  type TopicPagination {
    totalCount: Int
    edges: [TopicEdge]
    pageInfo: PageInfo
  }

  type TopicEdge {
    node: Topic
    cursor: String
  }
`;
