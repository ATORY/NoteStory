import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'found/lib/Link';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import {
  ReactRelayContext,
  // createFragmentContainer,
  createPaginationContainer,
  graphql
} from 'react-relay';

// import { StoryItem } from 'components/Story';

import MainContainer, {
  ArticleCell,
  AsideContainer,
  AsideFixedItem
} from 'components/Common/Main';
import { LoadingMoreDiv } from 'components/utils/Loading';
import AppDownload from 'components/utils/AppDownload';

export const countLoad = 5;

class Topic extends Component {
  static contextType = ReactRelayContext;
  static propTypes = {
    classes: PropTypes.object,
    viewer: PropTypes.object,
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
    const { loading } = this.state;
    const {
      viewer: { topics },
      relay
    } = this.props;
    const hasMore = relay.hasMore();
    // const isLoading = relay.isLoading();
    // console.log({ hasMore });
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{'专题'}</title>
        </Helmet>
        <MainContainer>
          <ArticleCell>
            {topics.edges.map(({ node }) => (
              <TopicItem key={node.id} item={node} />
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
  query TopicQuery($first: Int, $after: String) {
    viewer: topicViewer {
      ...Topic_viewer @arguments(first: $first, after: $after)
    }
  }
`;

export default createPaginationContainer(
  Topic,
  {
    viewer: graphql`
      fragment Topic_viewer on TopicViewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
          # orderby: { type: "[FriendsOrdering]", defaultValue: [DATE_ADDED] }
        ) {
        topics(after: $after, first: $first) @connection(key: "All_topics") {
          edges {
            node {
              id
              title
              snapImg
              intro
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
      return props.viewer && props.viewer.topics;
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

const _useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    marginTop: '15px',
    padding: '10px 0',
    height: '90px',
    textDecoration: 'none',
    color: 'black',
    '& .bg-center': {
      minWidth: '120px',
      borderRadius: 0
    },
    '& .right': {
      // display: 'grid',
      overflow: 'hidden',
      marginLeft: 10,
      '& h1': {
        margin: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      '& p': {
        margin: 0,
        marginTop: '10px',
        wordWrap: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': 2,
        maxHeight: '48px',
        display: '-webkit-box',
        fontSize: '14px',
        lineHeight: '24px',
        '-webkit-box-orient': 'vertical'
      }
    }
  }
}));
// eslint-disable-next-line react/prop-types
function TopicItem({ item }) {
  const classes = _useStyles();
  return (
    <Link className={classes.root} to={`/topic/${item.id}`}>
      <div
        className="bg-center"
        style={{
          backgroundImage: item.snapImg ? `url("${item.snapImg}")` : ''
        }}
      />
      <div className="right">
        <h1>{item.title}</h1>
        <p>{item.intro}</p>
      </div>
    </Link>
  );
}
