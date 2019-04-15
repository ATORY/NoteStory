/* eslint-disable relay/unused-fields */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  // ReactRelayContext,
  // createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay';

import { LoadingMoreDiv } from 'components/utils/Loading';
import { StoryItemInfo } from 'components/Story';

function Publish({ info, relay }) {
  const { publishedStories } = info;
  // console.log(publishedStories);
  const [loading, setLoading] = useState(false);
  function loadMore() {
    // console.log('loadmore', relay.hasMore(), relay.isLoading());
    if (!relay.hasMore() || relay.isLoading()) {
      return;
    }
    setLoading(true);
    relay.loadMore(
      10, // Fetch the next 10 feed items
      error => {
        console.log({ error });
        setLoading(false);
        // this.setState({ loading: false });
      }
    );
  }
  const hasMore = relay.hasMore();
  return (
    <div>
      {publishedStories.edges.map(({ node }) => (
        <StoryItemInfo key={node.id} storyPart={node} userCenter={true} />
      ))}
      <LoadingMoreDiv loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}

Publish.propTypes = {
  relay: PropTypes.any,
  info: PropTypes.shape({
    publishedStories: PropTypes.object
  })
};

export const query = graphql`
  query PublishQuery($token: String!, $first: Int, $after: String) {
    info: userInfo(token: $token) {
      ...Publish_info @arguments(first: $first, after: $after, token: $token)
    }
  }
`;

export default createPaginationContainer(
  Publish,
  {
    info: graphql`
      fragment Publish_info on User
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
          token: { type: "String", defaultValue: "" }
          # orderby: { type: "[FriendsOrdering]", defaultValue: [DATE_ADDED] }
        ) {
        publishedStories(after: $after, first: $first)
          @connection(key: "user_publishedStories") {
          edges {
            node {
              id
              title
              intro
              recommend
              valid
              publishTime
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      // console.log('getConnectionFromProps');
      return props.info && props.info.publishedStories;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    // getFragmentVariables(prevVars, totalCount) {
    //   console.log('getFragmentVariables', prevVars, totalCount);
    //   return {
    //     ...prevVars,
    //     count: totalCount
    //   };
    // },
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log('getVariables', props, cursor, count);
      return {
        token: localStorage.getItem('token'),
        first: count,
        after: cursor,
        // orderBy: fragmentVariables.orderBy,
        // userID isn't specified as an @argument for the fragment, but it should be a variable available for the fragment under the query root.
        userID: fragmentVariables.userID
      };
    },
    query
  }
);
