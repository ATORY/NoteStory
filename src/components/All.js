import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import {
  ReactRelayContext,
  // createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay';

import { StoryItem } from 'components/Story';

import MainContainer, {
  ArticleCell,
  AsideContainer,
  AsideFixedItem
} from 'components/Common/Main';
import { LoadingMoreDiv } from 'components/utils/Loading';
import AppDownload from 'components/utils/AppDownload';

export const countLoad = 5;

class All extends Component {
  static contextType = ReactRelayContext;
  static propTypes = {
    classes: PropTypes.object,
    viewer: PropTypes.object,
    // match: matchShape,
    // router: routerShape
    relay: PropTypes.object.isRequired
  };

  _loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }

    this.setState({
      loading: true
    });

    this.props.relay.loadMore(
      countLoad, // Fetch the next 10 feed items
      error => {
        console.log({ error });
        this.setState({ loading: false });
      }
    );
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    // console.log('------>>>>>', this.props);
    const { loading } = this.state;
    const {
      viewer: { stories },
      relay
    } = this.props;
    const hasMore = relay.hasMore();
    // const isLoading = relay.isLoading();
    // console.log({ hasMore });
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{'全部'}</title>
        </Helmet>
        <MainContainer>
          <ArticleCell>
            {stories.edges.map(({ node }) => (
              <StoryItem key={node.id} storyPart={node} />
            ))}
            <LoadingMoreDiv
              loading={loading}
              hasMore={hasMore}
              loadMore={this._loadMore}
            />
          </ArticleCell>
          <AsideContainer>
            <AsideFixedItem>
              <AppDownload />
            </AsideFixedItem>
          </AsideContainer>
        </MainContainer>
      </>
    );
  }
}

export const query = graphql`
  query AllQuery($first: Int, $after: String) {
    viewer: allViewer {
      ...All_viewer @arguments(first: $first, after: $after)
    }
  }
`;

export default createPaginationContainer(
  All,
  {
    viewer: graphql`
      fragment All_viewer on AllViewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
          # orderby: { type: "[FriendsOrdering]", defaultValue: [DATE_ADDED] }
        ) {
        stories(after: $after, first: $first) @connection(key: "All_stories") {
          edges {
            node {
              id
              ...Story_storyPart
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
      return props.viewer && props.viewer.stories;
    },
    // This is also the default implementation of `getFragmentVariables` if it isn't provided.
    getFragmentVariables(prevVars, totalCount) {
      console.log('getFragmentVariables', prevVars, totalCount);
      return {
        ...prevVars,
        count: totalCount
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      console.log('getVariables', props, cursor, count);
      return {
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

// query={graphql`
// query RoutersStoriesQuery($after: String, $first: Int, $page: Int) {
//   viewer: homeViewer {
//     ...Home_viewer
//   }
// }
// `}
// prepareVariables={() => ({ after: 'String', first: 20, page: 0 })}
