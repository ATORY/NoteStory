/* eslint-disable relay/unused-fields */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  // ReactRelayContext,
  // createFragmentContainer,
  commitMutation,
  createPaginationContainer,
  graphql
} from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'found';
import { makeStyles } from '@material-ui/styles';

import { LoadingMoreDiv } from 'components/utils/Loading';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    color: '#000',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottom: '1px solid #e1e3e9',
    '&:hover': {
      background: `linear-gradient(
        to right,
        rgba(243, 245, 249, 0),
        rgba(243, 245, 249, 100) 15%,
        rgba(243, 245, 249, 100) 85%,
        rgba(243, 245, 249, 0)
      )`
    }
  }
}));

const followUserMutation = graphql`
  mutation Followed_Mutation(
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

function Followed({ info, relay, environment }) {
  // console.log(info);
  const { followeds } = info;
  // console.log(publishedStories);
  const [loading, setLoading] = useState(false);
  function loadMore() {
    // console.log('loadmore', relay.hasMore(), relay.isLoading());
    if (!relay.hasMore() || relay.isLoading()) {
      return;
    }
    setLoading(true);
    relay.loadMore(
      1, // Fetch the next 10 feed items
      error => {
        console.log({ error });
        setLoading(false);
        // this.setState({ loading: false });
      }
    );
  }
  const followTA = (follow, taId) => e => {
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
      // updater: (store) => {
      // const payload = store.getRootField('removeTodo');
      // sharedUpdater(store, user, payload.getValue('deletedId'));
      // },
      optimisticResponse: {
        followed: {
          id: taId,
          hasFollow: follow
        }
      },
      aoptimisticUpdater: store => {
        const infoProxy = store.get(info.id);
        const conn = ConnectionHandler.getConnection(
          infoProxy,
          'user_followeds' // This is the connection identifier, defined here
          // https://github.com/relayjs/relay-examples/blob/master/todo/js/components/TodoList.js#L76
        );

        console.log(conn);
        // Create a Todo record in our store with a temporary ID
        // const id = 'client:newTodo:' + tempID++;
        // const node = store.create(id, 'Todo');
        // node.setValue(text, 'text');
        // node.setValue(id, 'id');
        // // Create a new edge that contains the newly created Todo record
        // const newEdge = store.create(
        //   'client:newEdge:' + tempID++,
        //   'TodoEdge',
        // );
        // newEdge.setLinkedRecord(node, 'node');
        // // Add it to the user's todo list
        // sharedUpdater(store, user, newEdge);
        // Given that we don't have a server response here,
        // we also need to update the todo item count on the user
        // const userRecord = store.get(user.id);
        // userRecord.setValue(
        //   userRecord.getValue('totalCount') + 1,
        //   'totalCount',
        // );
      },
      // eslint-disable-next-line no-unused-vars
      onCompleted: (response, errors) => {
        // if (errors) console.error(errors);
        // else {
        //   if (response.followed) setFollowd(follow);
        //   else console.log('error hanped');
        // }
        // console.log('Response received from server.', response, errors);
      },
      onError: err => console.error(err, '---')
    });
  };
  const hasMore = relay.hasMore();
  // console.log(followeds.edges);
  const classes = useStyles();
  return (
    <div>
      {followeds.edges.map(({ node }) => (
        <Link
          className={classes.root}
          to={
            !window.isElectron
              ? `/user/${node.id}`
              : `${process.env.NOTESTORY_APP_SERVER_URI}/user/${node.id}`
          }
          target={!window.isElectron ? '' : '_blank'}
          key={node.id}
        >
          <span
            style={{
              display: 'inline-block',
              height: '80px',
              width: '80px',
              margin: '10px',
              borderRadius: '50%',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url("${node.avator}")`
            }}
          />
          <div>
            <h5 style={{ margin: 0, fontSize: '18px' }}>{node.nickname}</h5>
            <p style={{ margin: 0, marginTop: '6px', color: 'darkgray' }}>
              {node.intro}
            </p>
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
            onClick={followTA(!node.hasFollow, node.id)}
          >
            {node.hasFollow ? (
              '已关注'
            ) : (
              <>
                <AddIcon fontSize="small" />
                关注
              </>
            )}
          </Button>
        </Link>
      ))}
      <LoadingMoreDiv loading={loading} hasMore={hasMore} loadMore={loadMore} />
    </div>
  );
}

Followed.propTypes = {
  environment: PropTypes.any,
  relay: PropTypes.any,
  info: PropTypes.shape({
    followeds: PropTypes.object
  })
};

export const query = graphql`
  query FollowedQuery($token: String!, $first: Int, $after: String) {
    info: userInfo(token: $token) {
      ...Followed_info @arguments(first: $first, after: $after, token: $token)
    }
  }
`;

export default createPaginationContainer(
  Followed,
  {
    info: graphql`
      fragment Followed_info on User
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String", defaultValue: "" }
          token: { type: "String", defaultValue: "" }
          # orderby: { type: "[FriendsOrdering]", defaultValue: [DATE_ADDED] }
        ) {
        id
        followeds(after: $after, first: $first)
          @connection(key: "user_followeds") {
          edges {
            node {
              id
              nickname
              intro
              avator
              hasFollow
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
