exports.typeDefines = `
  type HomeViewer {
    # 第几页（page）在哪个（after）后面多少个（first）
    stories(after: String, first: Int, page: Int): StoryPagination
  }
  type AllViewer {
    stories(after: String, first: Int, page: Int): StoryPagination
  }
  type TopicViewer {
    topics(after: String, first: Int, page: Int): TopicPagination
  }
`;

exports.querys = `
  homeViewer: HomeViewer
  allViewer: AllViewer
  topicViewer: TopicViewer
`;
