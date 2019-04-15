/* eslint-disable relay/unused-fields */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import {
  // ReactRelayContext,
  // createFragmentContainer,
  commitMutation,
  createPaginationContainer,
  graphql
} from 'react-relay';

import { LoadingMoreDiv } from 'components/utils/Loading';

import MainContainer, {
  Banner,
  Info,
  Avator,
  Intro,
  Lists
} from 'components/Common/Other';
import { environment } from 'web/App';
import { StoryItemInfo } from 'components/Story';
import { Button } from '@material-ui/core';

const followUserMutation = graphql`
  mutation Other_addFlow_Mutation(
    $token: Token!
    $openId: String!
    $follow: Boolean!
  ) {
    followed: userAddFollow(token: $token, openId: $openId, follow: $follow) {
      id
      hasFollow
    }
  }
`;

function Other(props) {
  // console.log(props);
  const { info, relay } = props;
  const { stories } = info;
  const [loading, setLoading] = useState(false);
  const [followed, setFollowd] = useState(info.hasFollow);

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

  const followTA = follow => e => {
    const taId = info.id;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('请先登录');
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const variables = {
      token,
      openId: taId,
      follow
    };
    commitMutation(environment, {
      mutation: followUserMutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors) console.error(errors);
        else {
          if (response.followed) setFollowd(follow);
          else console.log('error hanped');
        }
        // console.log('Response received from server.', response, errors);
      },
      onError: err => console.error(err, '---')
    });
  };
  const hasMore = relay.hasMore();
  // const classes = useStyles();
  return (
    <MainContainer>
      <Banner
        style={{
          backgroundImage: `url("${info.banner}")`
        }}
      >
        <Info>
          <Avator style={{ backgroundImage: `url("${info.avator}")` }} />
          <Intro>
            <div>
              <span style={{ display: 'block', fontSize: '20px' }}>
                {info.nickname}
              </span>
              <span style={{ color: 'gray' }}>{info.intro}</span>
            </div>
            <Button
              style={{
                margin: '0 20px 0 auto',
                padding: '5px 10px',
                lineHeight: 'initial',
                height: '40px'
              }}
              variant="outlined"
              color="primary"
              className="publisher-follow"
              onClick={followTA(!followed)}
            >
              {followed ? (
                '已关注'
              ) : (
                <>
                  <AddIcon fontSize="small" />
                  关注
                </>
              )}
            </Button>
          </Intro>
        </Info>
      </Banner>
      <Lists>
        {stories.edges.map(({ node }) => (
          <StoryItemInfo key={node.id} storyPart={node} />
        ))}
      </Lists>
      <LoadingMoreDiv loading={loading} hasMore={hasMore} loadMore={loadMore} />
      {/* <button onClick={loadMore}>more</button> */}
    </MainContainer>
  );
}

Other.propTypes = {
  relay: PropTypes.any,
  info: PropTypes.shape({
    id: PropTypes.string,
    nickname: PropTypes.string,
    intro: PropTypes.string,
    avator: PropTypes.string
  })
};

export const query = graphql`
  query OtherQuery($openId: String!, $first: Int, $after: String) {
    info: userProfile(openId: $openId) {
      ...Other_info @arguments(first: $first, after: $after)
    }
  }
`;

export default createPaginationContainer(
  Other,
  {
    info: graphql`
      fragment Other_info on User
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
          openId: { type: "String", defaultValue: "" }
          # orderby: { type: "[FriendsOrdering]", defaultValue: [DATE_ADDED] }
        ) {
        id
        nickname
        banner
        intro
        avator
        hasFollow
        stories: publishedStories(after: $after, first: $first)
          @connection(key: "other_stories") {
          edges {
            node {
              id
              title
              intro
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
      return props.info && props.info.stories;
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
      const {
        params: { openId }
      } = props.match;
      return {
        openId,
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
